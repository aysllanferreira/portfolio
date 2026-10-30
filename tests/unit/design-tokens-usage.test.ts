import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { describe, expect, it } from "vitest";

/*
 * tokens.css removes Tailwind's default type scale, palette and shadows so only the
 * design's tokens exist. A default utility such as `text-sm` would then silently
 * fall back to inherited styles, so this test keeps them out of the source.
 */
const removedUtilities = [
  /\btext-(?:xs|sm|base|lg|xl|[2-9]xl)\b/,
  /\b(?:bg|text|border|from|via|to|fill|stroke|ring|outline)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/,
  /\bshadow-(?:2xs|xs|sm|md|lg|xl|2xl)\b/,
  /\brounded-(?:xs|2xl|3xl|4xl)\b/,
];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry.name) && !entry.name.endsWith(".test.tsx") ? [path] : [];
  });
}

describe("design token usage", () => {
  it("never uses Tailwind defaults that the token reset removed", () => {
    const offenders = sourceFiles(resolve(process.cwd(), "src")).flatMap((file) =>
      readFileSync(file, "utf8")
        .split("\n")
        .flatMap((line, index) =>
          removedUtilities.some((pattern) => pattern.test(line))
            ? [`${file}:${String(index + 1)}: ${line.trim()}`]
            : [],
        ),
    );
    expect(offenders).toEqual([]);
  });
});
