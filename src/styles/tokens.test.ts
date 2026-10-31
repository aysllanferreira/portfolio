import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import pencil from "../../tests/fixtures/pencil-variables.json";

const tokens = readFileSync(resolve(process.cwd(), "src/styles/tokens.css"), "utf8");

function declared(name: string): string | undefined {
  return new RegExp(`--${name}:\\s*([^;]+);`).exec(tokens)?.[1]?.trim();
}

/** Pencil variable name -> CSS custom property in tokens.css. */
function cssNameFor(variable: string): string {
  if (variable.startsWith("radius-")) return variable;
  if (variable.startsWith("text-") && !/primary|muted|faint/.test(variable)) return variable;
  if (variable.startsWith("font-")) return variable;
  return `color-${variable}`;
}

/**
 * Deliberate, reviewed departures from the design file. Each must say why; any other
 * difference from Pencil fails the test.
 */
const deviations: Record<string, { value: string; reason: string }> = {
  "text-faint": {
    value: "#8e8e9c",
    reason: "#7c7c8a fell below 4.5:1 for small labels on tinted panels and shader glow",
  },
};

describe("design tokens", () => {
  const entries = Object.entries(pencil);

  it.each(entries.filter(([, v]) => v.type === "color"))("color %s matches Pencil", (name, v) => {
    const expected = deviations[name]?.value ?? String(v.value);
    expect(declared(cssNameFor(name))?.toLowerCase()).toBe(expected.toLowerCase());
  });

  it.each(entries.filter(([n, v]) => v.type === "number" && !n.startsWith("space-")))(
    "size %s matches Pencil",
    (name, v) => {
      expect(declared(cssNameFor(name))).toBe(`${String(v.value)}px`);
    },
  );

  it.each(entries.filter(([n]) => n.startsWith("space-")))(
    "spacing %s maps onto the 4px utility scale",
    (_name, v) => {
      expect(Number(v.value) % 4).toBe(0);
    },
  );

  it.each(entries.filter(([, v]) => v.type === "string"))("font %s is wired", (name, v) => {
    const familyVar = {
      "font-sans": "--font-geist,",
      "font-mono": "--font-geist-mono,",
      "font-serif": "--font-instrument-serif,",
    }[name];
    expect(declared(name)).toContain(familyVar?.slice(0, -1));
    expect(String(v.value)).toMatch(/Geist|Instrument Serif/);
  });
});
