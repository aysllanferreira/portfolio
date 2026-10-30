import { assetManifest, type AssetKey } from "@/content/assets.generated";

import {
  documentObjectKey,
  iconObjectKey,
  rasterObjectKey,
  svgObjectKey,
  type DocumentKind,
  type RasterFormat,
} from "./asset-paths";
import { env } from "./env";
import { pickStoredWidth } from "./image-loader";

type Manifest = typeof assetManifest;
type KeysOfKind<Kind extends string> = {
  [Key in AssetKey]: Manifest[Key] extends { kind: Kind } ? Key : never;
}[AssetKey];

export type RasterKey = KeysOfKind<"raster">;
export type SvgKey = KeysOfKind<"svg">;

export interface RasterAsset {
  width: number;
  height: number;
  hash: string;
  widths: readonly number[];
  blurDataURL?: string;
}

const cdn = (objectKey: string) => `${env.NEXT_PUBLIC_ASSETS_URL}/${objectKey}`;

export function rasterAsset(key: RasterKey): RasterAsset {
  return assetManifest[key];
}

/** URL of the stored variant that best serves `width` CSS pixels. */
export function rasterUrl(key: RasterKey, width: number, format: RasterFormat): string {
  const { hash, widths } = rasterAsset(key);
  return cdn(rasterObjectKey(key, hash, pickStoredWidth(widths, width), format));
}

/** A srcset listing every stored width with its true width descriptor. */
export function rasterSrcSet(key: RasterKey, format: RasterFormat): string {
  const { hash, widths } = rasterAsset(key);
  return widths
    .map((width) => `${cdn(rasterObjectKey(key, hash, width, format))} ${width}w`)
    .join(", ");
}

export function svgAsset(key: SvgKey): { url: string; width: number; height: number } {
  const { hash, width, height } = assetManifest[key] as {
    hash: string;
    width: number;
    height: number;
  };
  return { url: cdn(svgObjectKey(key, hash)), width, height };
}

export const favicon = {
  svg: cdn(svgObjectKey("favicon", assetManifest.favicon.hash)),
  png: (size: (typeof assetManifest.favicon.sizes)[number]) =>
    cdn(iconObjectKey("favicon", assetManifest.favicon.hash, size)),
};

/** Stable, shareable URL of a localized document (résumé, cover letter). */
export function documentUrl(kind: DocumentKind, locale: string): string {
  return cdn(documentObjectKey(kind, locale));
}
