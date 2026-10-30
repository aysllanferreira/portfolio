import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { catalog } from "./catalog";

try {
  process.loadEnvFile(".env.local");
} catch {
  // Source checks only run where the design assets are available.
}

describe("asset catalog", () => {
  it("has unique keys", () => {
    const keys = catalog.map((entry) => entry.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("declares positive display widths for every raster image", () => {
    for (const entry of catalog) {
      if (entry.kind !== "raster") continue;
      expect(
        Math.min(entry.display.mobile, entry.display.tablet, entry.display.desktop),
      ).toBeGreaterThan(0);
    }
  });

  it("covers every technology logo used by the design", () => {
    expect(catalog.filter((entry) => entry.key.startsWith("logos/"))).toHaveLength(27);
  });

  it.runIf(Boolean(process.env.ASSETS_SOURCE_DIR))("points at existing source files", () => {
    const root = process.env.ASSETS_SOURCE_DIR ?? "";
    const missing = catalog
      .filter((entry) => entry.kind !== "document")
      .filter((entry) => !existsSync(resolve(root, entry.source)));
    expect(missing).toEqual([]);
  });
});
