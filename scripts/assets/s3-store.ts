import { createHash } from "node:crypto";

import { HeadObjectCommand, NotFound, PutObjectCommand, type S3Client } from "@aws-sdk/client-s3";

import type { UploadObject } from "./types";

export type UploadOutcome = "uploaded" | "skipped";

export interface ObjectStore {
  /** Uploads the object unless an identical copy is already stored. */
  put(object: UploadObject): Promise<UploadOutcome>;
}

const MAX_ATTEMPTS = 3;

/**
 * S3-backed store. Content-addressed objects are skipped when the key exists;
 * mutable objects (documents) are compared by MD5 against the stored ETag.
 * Every upload is verified with a HEAD request afterwards.
 */
export class S3Store implements ObjectStore {
  constructor(
    private readonly client: S3Client,
    private readonly bucket: string,
  ) {}

  async put(object: UploadObject): Promise<UploadOutcome> {
    const stored = await this.head(object.objectKey);
    const md5 = createHash("md5").update(object.body).digest("hex");

    if (stored && (object.immutable || stored.etag === md5)) return "skipped";

    await withRetry(() =>
      this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: object.objectKey,
          Body: object.body,
          ContentType: object.contentType,
          CacheControl: object.cacheControl,
          ...(object.contentDisposition ? { ContentDisposition: object.contentDisposition } : {}),
        }),
      ),
    );

    const verified = await this.head(object.objectKey);
    if (verified?.etag !== md5)
      throw new Error(`Upload verification failed for ${object.objectKey}`);
    return "uploaded";
  }

  private async head(key: string): Promise<{ etag: string } | undefined> {
    try {
      const result = await this.client.send(
        new HeadObjectCommand({ Bucket: this.bucket, Key: key }),
      );
      return { etag: (result.ETag ?? "").replaceAll('"', "") };
    } catch (error) {
      if (error instanceof NotFound || (error as { name?: string }).name === "NotFound")
        return undefined;
      throw error;
    }
  }
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  attempts = MAX_ATTEMPTS,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt < attempts)
        await new Promise((resolve) => setTimeout(resolve, 200 * 2 ** attempt));
    }
  }
  throw lastError;
}
