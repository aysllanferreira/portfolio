/**
 * Object keys on the CDN. Shared by the asset sync (which uploads to these keys)
 * and the app (which builds URLs from them), so the two can never drift apart.
 *
 * Hashed keys change whenever content changes and are cached forever; document
 * keys are stable, human-readable URLs that are invalidated on update.
 */
export type RasterFormat = "avif" | "webp";

export type DocumentKind = "resume" | "cover-letter";

export const rasterObjectKey = (key: string, hash: string, width: number, format: RasterFormat) =>
  `img/${key}.${hash}.${width}.${format}`;

export const svgObjectKey = (key: string, hash: string) => `svg/${key}.${hash}.svg`;

export const iconObjectKey = (key: string, hash: string, size: number) =>
  `icons/${key}.${hash}.${size}.png`;

export const documentObjectKey = (kind: DocumentKind, locale: string) =>
  `docs/aysllan-ferreira-${kind}-${locale}.pdf`;

/** Filename offered when a document is downloaded, e.g. `Aysllan-Ferreira-Resume-EN.pdf`. */
export function documentFilename(kind: DocumentKind, locale: string): string {
  const title = kind === "resume" ? "Resume" : "Cover-Letter";
  return `Aysllan-Ferreira-${title}-${locale.toUpperCase()}.pdf`;
}
