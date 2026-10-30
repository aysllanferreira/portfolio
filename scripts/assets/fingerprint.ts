import { createHash } from "node:crypto";

/**
 * Bump when processing changes in a way that alters output for the same source
 * (quality, formats, recoloring), so every derived object gets a fresh URL.
 */
export const PIPELINE_VERSION = 1;

/**
 * Content fingerprint for a source and the options used to process it. Hashing the
 * input (not encoder output) keeps keys stable even if an encoder is non-deterministic.
 */
export function fingerprint(source: Uint8Array, options: unknown = {}): string {
  return createHash("sha256")
    .update(source)
    .update(JSON.stringify({ options, version: PIPELINE_VERSION }))
    .digest("hex")
    .slice(0, 8);
}
