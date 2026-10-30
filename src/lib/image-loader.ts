/**
 * Picks the stored variant to serve for a requested width: the smallest stored
 * width that is at least as wide, or the largest one when nothing is wide enough.
 * Images are never processed at request time, so only stored widths exist.
 */
export function pickStoredWidth(stored: readonly number[], requested: number): number {
  if (stored.length === 0) throw new Error("An image needs at least one stored width");

  let best: number | undefined;
  let largest = -Infinity;
  for (const width of stored) {
    if (width >= requested && (best === undefined || width < best)) best = width;
    if (width > largest) largest = width;
  }
  return best ?? largest;
}
