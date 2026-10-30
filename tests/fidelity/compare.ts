import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

export interface Comparison {
  width: number;
  height: number;
  /** Pixels that differ beyond the color threshold. */
  mismatched: number;
  /** Mismatched pixels as a fraction of the compared area (0–1). */
  ratio: number;
  /** Size of the area outside the overlap, when the two images differ in size. */
  sizeDelta: { width: number; height: number };
  diff: Buffer;
}

/** Per-pixel color tolerance (0–1); absorbs anti-aliasing differences between renderers. */
export const COLOR_THRESHOLD = 0.1;

/** Share of differing pixels a comparison may have and still pass. */
export const MISMATCH_BUDGET = 0.005;

/**
 * Compares a rendered capture with a design export. Images of different sizes are
 * compared over their overlap; any size difference is reported and fails the check.
 */
export function compareImages(actual: Buffer, expected: Buffer): Comparison {
  const a = PNG.sync.read(actual);
  const b = PNG.sync.read(expected);
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);

  const crop = (image: PNG) => {
    const out = new PNG({ width, height });
    PNG.bitblt(image, out, 0, 0, width, height, 0, 0);
    return out;
  };

  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(crop(a).data, crop(b).data, diff.data, width, height, {
    threshold: COLOR_THRESHOLD,
    includeAA: false,
  });

  return {
    width,
    height,
    mismatched,
    ratio: mismatched / (width * height),
    sizeDelta: { width: a.width - b.width, height: a.height - b.height },
    diff: PNG.sync.write(diff),
  };
}

export function passes(comparison: Comparison): boolean {
  const sameSize = comparison.sizeDelta.width === 0 && comparison.sizeDelta.height === 0;
  return sameSize && comparison.ratio <= MISMATCH_BUDGET;
}
