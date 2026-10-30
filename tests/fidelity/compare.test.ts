import { PNG } from "pngjs";
import { describe, expect, it } from "vitest";

import { compareImages, passes } from "./compare";

function image(width: number, height: number, paint: (x: number, y: number) => number[]): Buffer {
  const png = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [r = 0, g = 0, b = 0] = paint(x, y);
      const i = (y * width + x) * 4;
      png.data[i] = r;
      png.data[i + 1] = g;
      png.data[i + 2] = b;
      png.data[i + 3] = 255;
    }
  }
  return PNG.sync.write(png);
}

const flat = (w: number, h: number) => image(w, h, () => [10, 10, 15]);

describe("compareImages", () => {
  it("passes identical renders", () => {
    const result = compareImages(flat(40, 20), flat(40, 20));
    expect(result.mismatched).toBe(0);
    expect(passes(result)).toBe(true);
  });

  it("measures the share of differing pixels", () => {
    const shifted = image(40, 20, (x) => (x < 4 ? [255, 255, 255] : [10, 10, 15]));
    const result = compareImages(shifted, flat(40, 20));
    expect(result.ratio).toBeCloseTo(0.1, 5);
    expect(passes(result)).toBe(false);
  });

  it("tolerates sub-threshold color noise", () => {
    const noisy = image(40, 20, () => [11, 10, 16]);
    expect(passes(compareImages(noisy, flat(40, 20)))).toBe(true);
  });

  it("fails and reports different sizes", () => {
    const result = compareImages(flat(40, 22), flat(40, 20));
    expect(result.sizeDelta).toEqual({ width: 0, height: 2 });
    expect(passes(result)).toBe(false);
  });
});
