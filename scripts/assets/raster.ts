import sharp from "sharp";

import { fingerprint } from "./fingerprint";
import { IMMUTABLE_CACHE, type ManifestEntry, type RasterEntry, type UploadObject } from "./types";
import { deriveWidths } from "./widths";
import { rasterObjectKey, type RasterFormat } from "../../src/lib/asset-paths";

export const RASTER_QUALITY: Record<RasterFormat, number> = { avif: 55, webp: 72 };

/** Images smaller than this render too quickly to need a blurred placeholder. */
const PLACEHOLDER_MIN_WIDTH = 120;

export interface ProcessedAsset {
  manifest: ManifestEntry;
  objects: UploadObject[];
}

export async function processRaster(
  entry: RasterEntry,
  source: Uint8Array,
): Promise<ProcessedAsset> {
  const image = sharp(source, { failOn: "error" });
  const { width, height } = await image.metadata();
  if (!width || !height) throw new Error(`${entry.key}: cannot read image dimensions`);

  const widths = deriveWidths(entry.display, width);
  const hash = fingerprint(source, { widths, quality: RASTER_QUALITY });

  const objects: UploadObject[] = [];
  for (const targetWidth of widths) {
    const resized = sharp(source).resize({ width: targetWidth, withoutEnlargement: true });
    const [avif, webp] = await Promise.all([
      resized.clone().avif({ quality: RASTER_QUALITY.avif, effort: 6 }).toBuffer(),
      resized
        .clone()
        .webp({ quality: RASTER_QUALITY.webp, effort: 6, alphaQuality: 90 })
        .toBuffer(),
    ]);
    objects.push(
      rasterObject(rasterObjectKey(entry.key, hash, targetWidth, "avif"), avif, "image/avif"),
      rasterObject(rasterObjectKey(entry.key, hash, targetWidth, "webp"), webp, "image/webp"),
    );
  }

  const placeholder =
    width >= PLACEHOLDER_MIN_WIDTH && Math.max(...widths) >= PLACEHOLDER_MIN_WIDTH
      ? await blurPlaceholder(source)
      : undefined;

  return {
    manifest: {
      kind: "raster",
      width,
      height,
      hash,
      widths,
      ...(placeholder ? { blurDataURL: placeholder } : {}),
    },
    objects,
  };
}

/** A tiny WebP inlined as a data URL and shown blurred while the real image loads. */
export async function blurPlaceholder(source: Uint8Array): Promise<string> {
  const tiny = await sharp(source).resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${tiny.toString("base64")}`;
}

function rasterObject(objectKey: string, body: Buffer, contentType: string): UploadObject {
  return { objectKey, body, contentType, cacheControl: IMMUTABLE_CACHE, immutable: true };
}
