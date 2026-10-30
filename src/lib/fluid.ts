/**
 * Layout ranges and their design anchors. One design pixel (`--dpx` in
 * src/styles/fluid.css) equals 1px at each anchor width and scales with the
 * viewport inside the range, clamped to [minScale, maxScale].
 */
export const fluidRanges = [
  { name: "mobile", from: 0, anchor: 390, minScale: 0.8205, maxScale: 1.15 },
  { name: "tablet", from: 768, anchor: 834, minScale: 0.9209, maxScale: 1.12 },
  { name: "desktop", from: 1200, anchor: 1440, minScale: 0.8333, maxScale: 1 },
] as const;

export type FluidRange = (typeof fluidRanges)[number];

export function rangeFor(viewportWidth: number): FluidRange {
  let match: FluidRange = fluidRanges[0];
  for (const range of fluidRanges) if (viewportWidth >= range.from) match = range;
  return match;
}

/** CSS pixels for a value given in design pixels, at a viewport width. */
export function designPxToCss(designPx: number, viewportWidth: number): number {
  const range = rangeFor(viewportWidth);
  const scale = Math.min(Math.max(viewportWidth / range.anchor, range.minScale), range.maxScale);
  return designPx * scale;
}
