import { processDocument } from "./documents";
import { processRaster, type ProcessedAsset } from "./raster";
import { processIcon, processSvg } from "./svg";

import type { Invalidator } from "./invalidate";
import type { ObjectStore } from "./s3-store";
import type { CatalogEntry, ManifestEntry, UploadObject } from "./types";

export interface SyncOptions {
  catalog: readonly CatalogEntry[];
  /** Resolves a catalog source path to its bytes, or undefined when the file does not exist. */
  readSource: (source: string) => Promise<Uint8Array | undefined>;
  /** Omitted in dry runs: nothing is uploaded or invalidated. */
  store?: ObjectStore;
  invalidator?: Invalidator;
  /** Restricts uploads to matching keys; the manifest always covers the whole catalog. */
  only?: (key: string) => boolean;
  concurrency?: number;
}

export interface SyncReport {
  manifest: Map<string, ManifestEntry>;
  planned: UploadObject[];
  uploaded: string[];
  skipped: string[];
  failed: { objectKey: string; error: string }[];
  /** Optional sources (documents) that are not available yet. */
  missing: string[];
  invalidated: string[];
}

export async function runSync(options: SyncOptions): Promise<SyncReport> {
  const report: SyncReport = {
    manifest: new Map(),
    planned: [],
    uploaded: [],
    skipped: [],
    failed: [],
    missing: [],
    invalidated: [],
  };

  for (const entry of options.catalog) {
    const source = await options.readSource(entry.source);
    if (!source) {
      if (entry.kind === "document") {
        report.missing.push(entry.source);
        continue;
      }
      throw new Error(`Missing source for "${entry.key}": ${entry.source}`);
    }

    const processed = await processEntry(entry, source);
    report.manifest.set(entry.key, processed.manifest);
    if (options.only?.(entry.key) ?? true) report.planned.push(...processed.objects);
  }

  const { store } = options;
  if (!store) return report;

  const changedDocuments: string[] = [];
  await forEachConcurrently(report.planned, options.concurrency ?? 6, async (object) => {
    try {
      const outcome = await store.put(object);
      (outcome === "uploaded" ? report.uploaded : report.skipped).push(object.objectKey);
      if (outcome === "uploaded" && !object.immutable) changedDocuments.push(object.objectKey);
    } catch (error) {
      report.failed.push({ objectKey: object.objectKey, error: String(error) });
    }
  });

  if (changedDocuments.length > 0 && options.invalidator) {
    await options.invalidator.invalidate(changedDocuments);
    report.invalidated.push(...changedDocuments.sort());
  }

  report.uploaded.sort();
  report.skipped.sort();
  return report;
}

function processEntry(
  entry: CatalogEntry,
  source: Uint8Array,
): Promise<ProcessedAsset> | ProcessedAsset {
  switch (entry.kind) {
    case "raster":
      return processRaster(entry, source);
    case "svg":
      return processSvg(entry, source);
    case "icon":
      return processIcon(entry, source);
    case "document":
      return processDocument(entry, source);
  }
}

async function forEachConcurrently<T>(
  items: readonly T[],
  concurrency: number,
  task: (item: T) => Promise<void>,
): Promise<void> {
  let next = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (next < items.length) {
      const item = items[next++];
      if (item !== undefined) await task(item);
    }
  });
  await Promise.all(workers);
}
