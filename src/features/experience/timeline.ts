import { addMonths, monthsBetween, type YearMonth } from "@/lib/format";

/*
 * Geometry for the experience timeline. Positions are percentages of the track, so
 * the same numbers lay out the desktop, tablet and phone tracks.
 */

export interface Axis {
  start: YearMonth;
  end: YearMonth;
  now: YearMonth;
}

/** From December before the first role's year to two months past now, as designed. */
export function createAxis(starts: readonly YearMonth[], now: YearMonth): Axis {
  const firstYear = Math.min(...starts.map((month) => Number(month.slice(0, 4))));
  return { start: addMonths(`${firstYear}-01`, -1), end: addMonths(now, 2), now };
}

/** Where a month falls on the track, from 0 to 100. */
export function axisPercent(axis: Axis, month: YearMonth): number {
  return (monthsBetween(axis.start, month) / monthsBetween(axis.start, axis.end)) * 100;
}

/** A role's bar: from its first month to its last, or to now while it is ongoing. */
export function barGeometry(
  axis: Axis,
  start: YearMonth,
  end: YearMonth | undefined,
): { left: number; width: number } {
  const left = axisPercent(axis, start);
  return { left, width: axisPercent(axis, end ?? axis.now) - left };
}

/** A tick at each January on the track. */
export function yearTicks(axis: Axis): { year: number; left: number }[] {
  const ticks: { year: number; left: number }[] = [];
  const first = Number(axis.start.slice(0, 4)) + 1;
  const last = Number(axis.end.slice(0, 4));
  for (let year = first; year <= last; year++) {
    const month: YearMonth = `${year}-01`;
    if (month <= axis.end) ticks.push({ year, left: axisPercent(axis, month) });
  }
  return ticks;
}
