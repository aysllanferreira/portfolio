import type { DisplayWidths } from "./types";

/** Two candidate widths closer than this ratio are merged into the larger one. */
const MERGE_RATIO = 1.1;

/**
 * Widths to store for a raster image: each designed display width at 1x and 2x
 * density, near-duplicates merged, never upscaled past the source's own width.
 */
export function deriveWidths(display: DisplayWidths, intrinsicWidth: number): number[] {
  const candidates = [display.mobile, display.tablet, display.desktop]
    .flatMap((width) => [width, width * 2])
    .map((width) => Math.min(Math.round(width), intrinsicWidth))
    .sort((a, b) => a - b);

  const widths: number[] = [];
  for (const width of candidates) {
    const last = widths.at(-1);
    if (last !== undefined && width <= last * MERGE_RATIO) widths[widths.length - 1] = width;
    else widths.push(width);
  }
  return widths;
}
