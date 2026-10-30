import { createHash } from "node:crypto";

import {
  CloudFrontClient,
  CreateInvalidationCommand,
  GetInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import { HeadObjectCommand, NotFound, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { mockClient } from "aws-sdk-client-mock";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CloudFrontInvalidator } from "./invalidate";
import { S3Store, withRetry } from "./s3-store";

import type { UploadObject } from "./types";

const s3 = mockClient(S3Client);
const cloudFront = mockClient(CloudFrontClient);

const body = new TextEncoder().encode("content");
const md5 = createHash("md5").update(body).digest("hex");
const notFound = new NotFound({ message: "Not Found", $metadata: {} });

function object(overrides: Partial<UploadObject> = {}): UploadObject {
  return {
    objectKey: "svg/logos/react.abcd1234.svg",
    body,
    contentType: "image/svg+xml",
    cacheControl: "public, max-age=31536000, immutable",
    immutable: true,
    ...overrides,
  };
}

beforeEach(() => {
  s3.reset();
  cloudFront.reset();
});

describe("S3Store", () => {
  it("skips content-addressed objects that already exist", async () => {
    s3.on(HeadObjectCommand).resolves({ ETag: '"other"' });
    await expect(new S3Store(new S3Client({}), "bucket").put(object())).resolves.toBe("skipped");
    expect(s3.commandCalls(PutObjectCommand)).toHaveLength(0);
  });

  it("uploads new objects with their headers and verifies them", async () => {
    s3.on(HeadObjectCommand)
      .rejectsOnce(notFound)
      .resolves({ ETag: `"${md5}"` });
    s3.on(PutObjectCommand).resolves({});

    await expect(new S3Store(new S3Client({}), "bucket").put(object())).resolves.toBe("uploaded");
    expect(s3.commandCalls(PutObjectCommand)[0]?.args[0].input).toMatchObject({
      Bucket: "bucket",
      Key: "svg/logos/react.abcd1234.svg",
      ContentType: "image/svg+xml",
      CacheControl: "public, max-age=31536000, immutable",
    });
  });

  it("re-uploads a changed document and skips an unchanged one", async () => {
    const store = new S3Store(new S3Client({}), "bucket");
    const doc = object({
      objectKey: "docs/a.pdf",
      immutable: false,
      contentDisposition: "attachment",
    });

    s3.on(HeadObjectCommand).resolves({ ETag: `"${md5}"` });
    await expect(store.put(doc)).resolves.toBe("skipped");

    s3.reset();
    s3.on(HeadObjectCommand)
      .resolvesOnce({ ETag: '"stale"' })
      .resolves({ ETag: `"${md5}"` });
    s3.on(PutObjectCommand).resolves({});
    await expect(store.put(doc)).resolves.toBe("uploaded");
    expect(s3.commandCalls(PutObjectCommand)[0]?.args[0].input.ContentDisposition).toBe(
      "attachment",
    );
  });

  it("fails when the stored object does not match after upload", async () => {
    s3.on(HeadObjectCommand).rejectsOnce(notFound).resolves({ ETag: '"corrupted"' });
    s3.on(PutObjectCommand).resolves({});
    await expect(new S3Store(new S3Client({}), "bucket").put(object())).rejects.toThrow(
      /verification failed/,
    );
  });

  it("propagates unexpected errors from HEAD", async () => {
    s3.on(HeadObjectCommand).rejects(new Error("AccessDenied"));
    await expect(new S3Store(new S3Client({}), "bucket").put(object())).rejects.toThrow(
      "AccessDenied",
    );
  });
});

describe("withRetry", () => {
  it("retries transient failures before giving up", async () => {
    vi.useFakeTimers();
    const operation = vi.fn().mockRejectedValueOnce(new Error("throttled")).mockResolvedValue("ok");
    const result = withRetry(operation);
    await vi.runAllTimersAsync();
    await expect(result).resolves.toBe("ok");
    expect(operation).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it("rethrows the last error after the final attempt", async () => {
    await expect(withRetry(() => Promise.reject(new Error("down")), 1)).rejects.toThrow("down");
  });
});

describe("CloudFrontInvalidator", () => {
  it("does nothing when no documents changed", async () => {
    await new CloudFrontInvalidator(new CloudFrontClient({}), "E123").invalidate([]);
    expect(cloudFront.commandCalls(CreateInvalidationCommand)).toHaveLength(0);
  });

  it("invalidates exactly the changed paths and waits for completion", async () => {
    cloudFront.on(CreateInvalidationCommand).resolves({
      Invalidation: {
        Id: "I1",
        Status: "InProgress",
        CreateTime: new Date(),
        InvalidationBatch: undefined,
      },
    });
    cloudFront.on(GetInvalidationCommand).resolves({
      Invalidation: {
        Id: "I1",
        Status: "Completed",
        CreateTime: new Date(),
        InvalidationBatch: undefined,
      },
    });

    await new CloudFrontInvalidator(new CloudFrontClient({}), "E123").invalidate([
      "docs/b.pdf",
      "docs/a.pdf",
      "docs/a.pdf",
    ]);

    const input = cloudFront.commandCalls(CreateInvalidationCommand)[0]?.args[0].input;
    expect(input?.DistributionId).toBe("E123");
    expect(input?.InvalidationBatch?.Paths).toEqual({
      Quantity: 2,
      Items: ["/docs/a.pdf", "/docs/b.pdf"],
    });
  });
});
