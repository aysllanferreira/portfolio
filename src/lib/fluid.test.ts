import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { designPxToCss, fluidRanges, rangeFor } from "./fluid";

describe("anchored fluid scaling", () => {
  it.each([
    [390, 44],
    [834, 72],
    [1440, 84],
  ])("matches the design exactly at %ipx", (width, designPx) => {
    expect(designPxToCss(designPx, width)).toBeCloseTo(designPx, 6);
  });

  it("picks the layout range by viewport width", () => {
    expect(rangeFor(767).name).toBe("mobile");
    expect(rangeFor(768).name).toBe("tablet");
    expect(rangeFor(1199).name).toBe("tablet");
    expect(rangeFor(1200).name).toBe("desktop");
  });

  it("scales down at the start of a range and holds past its cap", () => {
    expect(designPxToCss(84, 1280)).toBeCloseTo(84 * (1280 / 1440), 6);
    expect(designPxToCss(84, 1200)).toBeCloseTo(70, 2);
    expect(designPxToCss(84, 1920)).toBe(84);
    expect(designPxToCss(44, 320)).toBeCloseTo(44 * (320 / 390), 6);
    expect(designPxToCss(44, 300)).toBeCloseTo(44 * 0.8205, 6);
    expect(designPxToCss(44, 767)).toBeCloseTo(44 * 1.15, 6);
  });

  it("is mirrored exactly by the --dpx declarations in fluid.css", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/fluid.css"), "utf8");
    const declarations = [
      ...css.matchAll(/--dpx: clamp\(([\d.]+)px, calc\(100vw \/ (\d+)\), ([\d.]+)px\)/g),
    ];

    expect(
      declarations.map(([, min, anchor, max]) => [Number(anchor), Number(min), Number(max)]),
    ).toEqual(fluidRanges.map((range) => [range.anchor, range.minScale, range.maxScale]));
  });
});
