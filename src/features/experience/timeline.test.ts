import { describe, expect, it } from "vitest";

import { designedNow, roles, type RoleFacts } from "./content";
import { axisPercent, barGeometry, createAxis, yearTicks } from "./timeline";

const axis = createAxis(
  Object.values(roles).map((role) => role.start),
  designedNow,
);
/** The design's desktop track is 904px wide; positions must land within 1px. */
const px = (percent: number) => (percent * 904) / 100;

describe("timeline geometry", () => {
  it("spans December before the first year to two months past now", () => {
    expect(axis).toEqual({ start: "2022-12", end: "2026-12", now: "2026-10" });
  });

  it("puts the year ticks and now where the design draws them", () => {
    expect(yearTicks(axis).map((tick) => Math.round(px(tick.left)))).toEqual([19, 245, 471, 697]);
    expect(Math.abs(px(axisPercent(axis, axis.now)) - 866)).toBeLessThanOrEqual(1);
  });

  it.each([
    ["pinely-senior", 377, 489],
    ["vituax", 622, 169],
    ["intellux", 546, 94],
    ["pinely-full-stack", 38, 339],
    ["trybe", 94, 19],
  ] as const)("draws the %s bar at x=%i, width %i", (slug, x, width) => {
    const role: RoleFacts = roles[slug];
    const bar = barGeometry(axis, role.start, role.end);
    expect(Math.abs(px(bar.left) - x)).toBeLessThanOrEqual(1);
    expect(Math.abs(px(bar.width) - width)).toBeLessThanOrEqual(1);
  });

  it("keeps an ongoing role running to the current month", () => {
    const later = createAxis(["2023-02"], "2027-03");
    const bar = barGeometry(later, "2024-08", undefined);
    expect(bar.left + bar.width).toBeCloseTo(axisPercent(later, "2027-03"));
    expect(yearTicks(later).at(-1)?.year).toBe(2027);
  });
});
