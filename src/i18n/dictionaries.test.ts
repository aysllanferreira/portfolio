import { describe, expect, it } from "vitest";

import { locales } from "./config";
import { dictionaries } from "./dictionaries";
import { interpolate } from "./interpolate";

type Tree = Record<string, unknown>;

function leaves(tree: Tree, prefix = ""): Map<string, unknown> {
  const result = new Map<string, unknown>();
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      for (const [leaf, leafValue] of leaves(value as Tree, path)) result.set(leaf, leafValue);
    } else {
      result.set(path, value);
    }
  }
  return result;
}

const placeholders = (text: unknown) =>
  typeof text === "string" ? [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort() : [];

describe("dictionaries", () => {
  const english = leaves(dictionaries.en);

  it.each(locales)("%s has exactly the English keys", (locale) => {
    expect([...leaves(dictionaries[locale]).keys()].sort()).toEqual([...english.keys()].sort());
  });

  it.each(locales)("%s keeps every placeholder and never leaves a string empty", (locale) => {
    for (const [path, value] of leaves(dictionaries[locale])) {
      // An accent headline may start or end on its accent word, leaving before/after empty.
      const optional = /\.(before|after)$/.test(path);
      if (typeof value === "string" && !optional) expect(value.trim(), path).not.toBe("");
      expect(placeholders(value), path).toEqual(placeholders(english.get(path)));
    }
  });

  it.each(locales)("%s meta description fits search snippets", (locale) => {
    expect(dictionaries[locale].meta.description.length).toBeLessThanOrEqual(160);
  });
});

describe("interpolate", () => {
  it("fills placeholders", () => {
    expect(interpolate("© {year} Aysllan", { year: 2026 })).toBe("© 2026 Aysllan");
  });

  it("throws on a missing value", () => {
    expect(() => interpolate("{missing}", {})).toThrow(/missing/);
  });
});
