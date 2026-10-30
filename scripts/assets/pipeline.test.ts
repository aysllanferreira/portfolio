import { describe, expect, it, vi } from "vitest";

import { renderManifest } from "./manifest";
import { runSync } from "./pipeline";

import type { Invalidator } from "./invalidate";
import type { ObjectStore, UploadOutcome } from "./s3-store";
import type { CatalogEntry } from "./types";

const glyph =
  '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z"/></svg>';

const catalog: CatalogEntry[] = [
  { kind: "svg", key: "logos/react", source: "react.svg", color: "#61DAFB" },
  { kind: "svg", key: "brand/af-mark-ink", source: "react.svg", color: "#0A0A0F" },
  {
    kind: "document",
    key: "docs/resume-en",
    source: "resume-en.pdf",
    document: "resume",
    locale: "en",
  },
  {
    kind: "document",
    key: "docs/resume-pt",
    source: "resume-pt.pdf",
    document: "resume",
    locale: "pt",
  },
];

const files: Record<string, string> = { "react.svg": glyph, "resume-en.pdf": "%PDF-1.7 en" };
const readSource = (path: string) =>
  Promise.resolve(files[path] === undefined ? undefined : new TextEncoder().encode(files[path]));

function fakeStore(outcome: (key: string) => UploadOutcome | Error): ObjectStore {
  return {
    put: vi.fn((object: { objectKey: string }) => {
      const result = outcome(object.objectKey);
      return result instanceof Error ? Promise.reject(result) : Promise.resolve(result);
    }),
  };
}

describe("runSync", () => {
  it("plans every object without touching AWS in a dry run", async () => {
    const report = await runSync({ catalog, readSource });

    expect([...report.manifest.keys()]).toEqual([
      "logos/react",
      "brand/af-mark-ink",
      "docs/resume-en",
    ]);
    expect(report.planned.map((o) => o.objectKey)).toContain("docs/aysllan-ferreira-resume-en.pdf");
    expect(report.missing).toEqual(["resume-pt.pdf"]);
    expect(report.uploaded).toEqual([]);
  });

  it("uploads, skips, reports failures and invalidates only changed documents", async () => {
    const invalidator: Invalidator = { invalidate: vi.fn(() => Promise.resolve()) };
    const store = fakeStore((key) => {
      if (key.startsWith("svg/logos")) return "skipped";
      if (key.startsWith("svg/brand")) return new Error("AccessDenied");
      return "uploaded";
    });

    const report = await runSync({ catalog, readSource, store, invalidator });

    expect(report.skipped).toHaveLength(1);
    expect(report.failed).toEqual([
      { objectKey: expect.stringMatching(/^svg\/brand/), error: "Error: AccessDenied" },
    ]);
    expect(report.uploaded).toEqual(["docs/aysllan-ferreira-resume-en.pdf"]);
    expect(invalidator.invalidate).toHaveBeenCalledWith(["docs/aysllan-ferreira-resume-en.pdf"]);
    expect(report.invalidated).toEqual(["docs/aysllan-ferreira-resume-en.pdf"]);
  });

  it("does not invalidate when nothing mutable changed", async () => {
    const invalidator: Invalidator = { invalidate: vi.fn(() => Promise.resolve()) };
    await runSync({ catalog, readSource, store: fakeStore(() => "skipped"), invalidator });
    expect(invalidator.invalidate).not.toHaveBeenCalled();
  });

  it("restricts uploads with --only but keeps the manifest complete", async () => {
    const report = await runSync({ catalog, readSource, only: (key) => key.startsWith("logos/") });
    expect(report.planned.every((o) => o.objectKey.startsWith("svg/logos/"))).toBe(true);
    expect(report.manifest.size).toBe(3);
  });

  it("fails loudly when a required source is missing", async () => {
    await expect(
      runSync({ catalog: [{ kind: "svg", key: "logos/x", source: "nope.svg" }], readSource }),
    ).rejects.toThrow(/Missing source for "logos\/x"/);
  });

  it("produces a byte-identical manifest on repeated runs", async () => {
    const first = renderManifest((await runSync({ catalog, readSource })).manifest);
    const second = renderManifest((await runSync({ catalog, readSource })).manifest);
    expect(first).toBe(second);
    expect(first).toContain('"logos/react": {');
    expect(first).toContain("export type AssetKey = keyof typeof assetManifest;");
  });
});
