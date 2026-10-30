import { describe, expect, it } from "vitest";

import { deriveWidths } from "./widths";

describe("deriveWidths", () => {
  it("stores every display width at 1x and 2x, merging near duplicates upward", () => {
    // Centrum-AI spotlight: 350 mobile, 754 tablet, 760 desktop.
    expect(deriveWidths({ mobile: 350, tablet: 754, desktop: 760 }, 2880)).toEqual([
      350, 760, 1520,
    ]);
    // Investable spotlight: 350 / 367 / 528.
    expect(deriveWidths({ mobile: 350, tablet: 367, desktop: 528 }, 2880)).toEqual([
      367, 528, 734, 1056,
    ]);
  });

  it("never upscales past the source width", () => {
    expect(deriveWidths({ mobile: 24, tablet: 24, desktop: 24 }, 40)).toEqual([24, 40]);
    expect(deriveWidths({ mobile: 480, tablet: 480, desktop: 480 }, 600)).toEqual([480, 600]);
  });

  it("returns a single width when everything collapses", () => {
    expect(deriveWidths({ mobile: 56, tablet: 56, desktop: 56 }, 56)).toEqual([56]);
  });
});
