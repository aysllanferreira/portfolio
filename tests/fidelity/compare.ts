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

/*
 * Calibration: the design tool (Skia) and Chromium rasterize text with different gamma
 * and hinting, so glyph edges never match pixel for pixel even when layout, color and
 * spacing are identical. A 0.3 color threshold ignores that anti-aliasing noise while
 * still flagging wrong colors, offsets and sizes; layout itself is held to ±2px.
 */

/** Per-pixel color tolerance (0–1). */
export const COLOR_THRESHOLD = 0.3;

/** Share of differing pixels a comparison may have and still pass. */
export const MISMATCH_BUDGET = 0.05;

/** Allowed difference between rendered and designed box size, in CSS pixels. */
export const SIZE_TOLERANCE = 2;

/**
 * Compares a rendered capture with a design export. Images of different sizes are
 * compared over their overlap; any size difference is reported and fails the check.
 */
export function compareImages(actual: Buffer, expected: Buffer, designBox?: DesignBox): Comparison {
  const a = PNG.sync.read(actual);
  const b = designBox
    ? alignReference(PNG.sync.read(expected), designBox, a)
    : PNG.sync.read(expected);
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);

  // Design exports leave unfilled areas transparent; the page paints them with the
  // background color, so both images are flattened onto it before comparing.
  const crop = (image: PNG) => {
    const out = new PNG({ width, height });
    PNG.bitblt(image, out, 0, 0, width, height, 0, 0);
    return flatten(out);
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

export interface DesignBox {
  width: number;
  height: number;
  /** Offset of the node's outer shadow; the export pads by the blur but shifts by this offset. */
  shadowOffset?: { x: number; y: number };
}

/** Exports padded by at most this much are aligned by search instead of by formula. */
const MAX_ALIGNMENT_SEARCH = 64;

/**
 * Finds the node's own box inside an export padded for its effects. Padding is uneven
 * when effects differ per side (a glow on the left only), so small paddings are searched
 * for the offset that best matches the capture; large ones fall back to the formula.
 */
export function alignReference(image: PNG, box: DesignBox, capture: PNG): PNG {
  const padX = image.width - Math.round(box.width);
  const padY = image.height - Math.round(box.height);
  if (padX <= 0 && padY <= 0) return cropCenter(image, box);
  if (padX > MAX_ALIGNMENT_SEARCH || padY > MAX_ALIGNMENT_SEARCH) return cropCenter(image, box);

  const target = flatten(cropAt(capture, 0, 0, Math.round(box.width), Math.round(box.height)));
  let best = { x: 0, y: 0, score: Infinity };
  for (let y = 0; y <= Math.max(0, padY); y++) {
    for (let x = 0; x <= Math.max(0, padX); x++) {
      const candidate = flatten(cropAt(image, x, y, target.width, target.height));
      const score = pixelmatch(candidate.data, target.data, null, target.width, target.height, {
        threshold: COLOR_THRESHOLD,
      });
      if (score < best.score) best = { x, y, score };
    }
  }
  return cropAt(image, best.x, best.y, Math.round(box.width), Math.round(box.height));
}

function cropAt(image: PNG, x: number, y: number, width: number, height: number): PNG {
  const w = Math.min(width, image.width - x);
  const h = Math.min(height, image.height - y);
  const out = new PNG({ width: w, height: h });
  PNG.bitblt(image, out, x, y, w, h, 0, 0);
  return out;
}

/** Cuts the node's own box out of an export padded for its effects. */
export function cropCenter(image: PNG, box: DesignBox): PNG {
  const width = Math.min(Math.round(box.width), image.width);
  const height = Math.min(Math.round(box.height), image.height);
  const out = new PNG({ width, height });
  const x = Math.max(0, Math.floor((image.width - width) / 2) - (box.shadowOffset?.x ?? 0));
  const y = Math.max(0, Math.floor((image.height - height) / 2) - (box.shadowOffset?.y ?? 0));
  PNG.bitblt(image, out, x, y, width, height, 0, 0);
  return out;
}

/** The page background (`--color-bg`). */
const BACKGROUND = [10, 10, 15] as const;

function flatten(image: PNG): PNG {
  const { data } = image;
  for (let i = 0; i < data.length; i += 4) {
    const alpha = (data[i + 3] ?? 255) / 255;
    for (let channel = 0; channel < 3; channel++) {
      const value = data[i + channel] ?? 0;
      data[i + channel] = Math.round(value * alpha + (BACKGROUND[channel] ?? 0) * (1 - alpha));
    }
    data[i + 3] = 255;
  }
  return image;
}

export function passes(comparison: Comparison): boolean {
  const sameSize =
    Math.abs(comparison.sizeDelta.width) <= SIZE_TOLERANCE &&
    Math.abs(comparison.sizeDelta.height) <= SIZE_TOLERANCE;
  return sameSize && comparison.ratio <= MISMATCH_BUDGET;
}
