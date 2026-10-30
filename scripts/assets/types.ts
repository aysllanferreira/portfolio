import type { DocumentKind } from "../../src/lib/asset-paths";

/** Largest CSS width an image is rendered at in each designed view (from the design file). */
export interface DisplayWidths {
  mobile: number;
  tablet: number;
  desktop: number;
}

export interface RasterEntry {
  kind: "raster";
  key: string;
  /** Path relative to ASSETS_SOURCE_DIR. */
  source: string;
  display: DisplayWidths;
}

export interface SvgEntry {
  kind: "svg";
  key: string;
  source: string;
  /** Single fill color applied to the glyph, exactly as in the design (#RRGGBB or #RRGGBBAA). */
  color?: string;
}

export interface IconEntry {
  kind: "icon";
  key: string;
  source: string;
  /** Square PNG renders produced from the SVG source. */
  sizes: readonly number[];
}

export interface DocumentEntry {
  kind: "document";
  key: string;
  source: string;
  document: DocumentKind;
  locale: string;
}

export type CatalogEntry = RasterEntry | SvgEntry | IconEntry | DocumentEntry;

/** One object to put on the CDN origin. */
export interface UploadObject {
  objectKey: string;
  body: Uint8Array;
  contentType: string;
  cacheControl: string;
  contentDisposition?: string;
  /** Content-addressed objects never change once uploaded. */
  immutable: boolean;
}

export type ManifestEntry =
  | {
      kind: "raster";
      width: number;
      height: number;
      hash: string;
      widths: number[];
      blurDataURL?: string;
    }
  | { kind: "svg"; width: number; height: number; hash: string }
  | { kind: "icon"; hash: string; sizes: number[] }
  | { kind: "document"; document: DocumentKind; locale: string };

export const IMMUTABLE_CACHE = "public, max-age=31536000, immutable";
export const DOCUMENT_CACHE = "public, max-age=300, must-revalidate";
