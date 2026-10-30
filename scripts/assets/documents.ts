import { DOCUMENT_CACHE, type DocumentEntry } from "./types";
import { documentFilename, documentObjectKey } from "../../src/lib/asset-paths";

import type { ProcessedAsset } from "./raster";

/** PDFs keep stable, shareable URLs; updates are pushed out by a CDN invalidation. */
export function processDocument(entry: DocumentEntry, source: Uint8Array): ProcessedAsset {
  if (!startsWithPdfSignature(source)) throw new Error(`${entry.source} is not a PDF file`);

  return {
    manifest: { kind: "document", document: entry.document, locale: entry.locale },
    objects: [
      {
        objectKey: documentObjectKey(entry.document, entry.locale),
        body: source,
        contentType: "application/pdf",
        cacheControl: DOCUMENT_CACHE,
        contentDisposition: `attachment; filename="${documentFilename(entry.document, entry.locale)}"`,
        immutable: false,
      },
    ],
  };
}

function startsWithPdfSignature(bytes: Uint8Array): boolean {
  return new TextDecoder().decode(bytes.subarray(0, 5)) === "%PDF-";
}
