import { describe, expect, it } from "vitest";

import { assetManifest } from "@/content/assets.generated";

import { documentFilename } from "./asset-paths";
import { documentUrl, favicon, rasterAsset, rasterSrcSet, rasterUrl, svgAsset } from "./assets";
import { pickStoredWidth } from "./image-loader";

describe("pickStoredWidth", () => {
  it("serves the smallest stored width that is wide enough", () => {
    expect(pickStoredWidth([640, 1280], 700)).toBe(1280);
    expect(pickStoredWidth([367, 528, 734, 1056], 528)).toBe(528);
  });

  it("falls back to the largest stored width for oversized requests", () => {
    expect(pickStoredWidth([640, 1280], 3840)).toBe(1280);
  });

  it("requires at least one stored width", () => {
    expect(() => pickStoredWidth([], 100)).toThrow();
  });
});

describe("asset URLs", () => {
  it("builds CDN URLs from the manifest", () => {
    const { hash } = rasterAsset("people/aysllan");
    expect(rasterUrl("people/aysllan", 400, "avif")).toBe(
      `https://cdn.aysllan.com/img/people/aysllan.${hash}.480.avif`,
    );
  });

  it("lists every stored width once in srcset", () => {
    const { widths } = rasterAsset("screenshots/investable");
    const candidates = rasterSrcSet("screenshots/investable", "webp").split(", ");
    expect(candidates).toHaveLength(widths.length);
    expect(candidates.at(-1)).toMatch(
      new RegExp(`\\.${String(widths.at(-1))}\\.webp ${String(widths.at(-1))}w$`),
    );
  });

  it("serves recolored vectors with their intrinsic size", () => {
    expect(svgAsset("logos/react")).toMatchObject({
      url: expect.stringMatching(
        /^https:\/\/cdn\.aysllan\.com\/svg\/logos\/react\.[0-9a-f]{8}\.svg$/,
      ),
      width: 24,
      height: 24,
    });
  });

  it("exposes favicon renders and stable document URLs", () => {
    expect(favicon.png(180)).toMatch(/\/icons\/favicon\.[0-9a-f]{8}\.180\.png$/);
    expect(documentUrl("resume", "pt")).toBe(
      "https://cdn.aysllan.com/docs/aysllan-ferreira-resume-pt.pdf",
    );
    expect(documentFilename("cover-letter", "es")).toBe("Aysllan-Ferreira-Cover-Letter-ES.pdf");
  });

  it("rejects unknown keys at compile time", () => {
    // @ts-expect-error -- "people/unknown" is not in the asset manifest.
    expect(() => rasterAsset("people/unknown").widths).toThrow();
    expect(Object.keys(assetManifest)).not.toContain("people/unknown");
  });
});
