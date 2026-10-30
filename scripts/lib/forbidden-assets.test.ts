import { describe, expect, it } from "vitest";

import { findForbiddenAssets } from "./forbidden-assets";

describe("findForbiddenAssets", () => {
  it("flags images, vectors, documents and fonts in any case", () => {
    expect(
      findForbiddenAssets([
        "src/app/page.tsx",
        "public/logo.SVG",
        "docs/resume.pdf",
        "src/fonts/geist.woff2",
        "README.md",
        "photo.jpeg",
      ]),
    ).toEqual(["public/logo.SVG", "docs/resume.pdf", "src/fonts/geist.woff2", "photo.jpeg"]);
  });

  it("does not flag names that merely contain an extension", () => {
    expect(findForbiddenAssets(["src/lib/svg-path.ts", "scripts/png-utils.ts"])).toEqual([]);
  });
});
