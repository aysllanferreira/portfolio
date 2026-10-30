import sharp from "sharp";
import { describe, expect, it } from "vitest";

import { processDocument } from "./documents";
import { processRaster } from "./raster";
import { optimizeSvg, processIcon, processSvg, recolorSvg, svgDimensions } from "./svg";

const glyph =
  '<svg fill="#0D0D0B" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M0 0h24v24H0z"/></svg>';

function png(width: number, height: number, alpha = 1): Promise<Buffer> {
  return sharp({
    create: { width, height, channels: 4, background: { r: 164, g: 147, b: 255, alpha } },
  })
    .png()
    .toBuffer();
}

describe("processRaster", () => {
  it("stores AVIF and WebP at every derived width with immutable caching", async () => {
    const source = await png(1200, 600);
    const { manifest, objects } = await processRaster(
      {
        kind: "raster",
        key: "screenshots/demo",
        source: "demo.png",
        display: { mobile: 350, tablet: 367, desktop: 528 },
      },
      source,
    );

    expect(manifest).toMatchObject({
      kind: "raster",
      width: 1200,
      height: 600,
      widths: [367, 528, 734, 1056],
    });
    expect(objects).toHaveLength(8);
    expect(objects.every((o) => o.immutable && o.cacheControl.includes("immutable"))).toBe(true);

    const avif = objects.find((o) => o.objectKey.endsWith(".734.avif"));
    expect(avif?.contentType).toBe("image/avif");
    const meta = await sharp(avif?.body).metadata();
    expect(meta.width).toBe(734);
  });

  it("keeps transparency and adds a blur placeholder for large images", async () => {
    const { manifest, objects } = await processRaster(
      {
        kind: "raster",
        key: "people/demo",
        source: "demo.png",
        display: { mobile: 300, tablet: 480, desktop: 480 },
      },
      await png(600, 1000, 0.5),
    );

    const webp = objects.find((o) => o.contentType === "image/webp");
    expect((await sharp(webp?.body).metadata()).hasAlpha).toBe(true);
    expect(manifest.kind === "raster" && manifest.blurDataURL).toMatch(/^data:image\/webp;base64,/);
  });

  it("skips the placeholder for tiny images such as flags", async () => {
    const { manifest } = await processRaster(
      {
        kind: "raster",
        key: "flags/us",
        source: "us.png",
        display: { mobile: 24, tablet: 24, desktop: 24 },
      },
      await png(48, 32),
    );
    expect(manifest).not.toHaveProperty("blurDataURL");
  });

  it("is deterministic for the same input", async () => {
    const entry = {
      kind: "raster",
      key: "flags/br",
      source: "br.png",
      display: { mobile: 24, tablet: 24, desktop: 24 },
    } as const;
    const source = await png(48, 32);
    const [first, second] = await Promise.all([
      processRaster(entry, source),
      processRaster(entry, source),
    ]);
    expect(first.manifest).toEqual(second.manifest);
    expect(first.objects.map((o) => o.objectKey)).toEqual(second.objects.map((o) => o.objectKey));
  });
});

describe("svg processing", () => {
  it("recolors a single-color glyph", () => {
    expect(recolorSvg(glyph, "#ffffff")).toContain('<svg fill="#FFFFFF"');
    expect(recolorSvg(glyph, "#ffffff")).not.toContain("#0D0D0B");
  });

  it("splits an 8-digit hex into fill and fill-opacity", () => {
    expect(recolorSvg(glyph, "#A493FF14")).toContain('fill="#A493FF" fill-opacity="0.078"');
  });

  it("rejects unsupported colors", () => {
    expect(() => recolorSvg(glyph, "violet")).toThrow(/Unsupported color/);
  });

  it("keeps the viewBox when optimizing", () => {
    expect(optimizeSvg(glyph)).toContain('viewBox="0 0 24 24"');
  });

  it("reads dimensions from the viewBox", () => {
    expect(svgDimensions('<svg viewBox="0 0 232.6 181.4"></svg>')).toEqual({
      width: 232.6,
      height: 181.4,
    });
    expect(() => svgDimensions("<svg></svg>")).toThrow(/viewBox/);
  });

  it("produces one hashed, immutable object per logo color", () => {
    const source = new TextEncoder().encode(glyph);
    const white = processSvg(
      { kind: "svg", key: "logos/x", source: "x.svg", color: "#FFFFFF" },
      source,
    );
    const black = processSvg(
      { kind: "svg", key: "logos/x", source: "x.svg", color: "#000000" },
      source,
    );

    expect(white.objects[0]?.objectKey).toMatch(/^svg\/logos\/x\.[0-9a-f]{8}\.svg$/);
    expect(white.objects[0]?.objectKey).not.toBe(black.objects[0]?.objectKey);
    expect(white.manifest).toMatchObject({ kind: "svg", width: 24, height: 24 });
  });

  it("renders square PNG icons alongside the SVG", async () => {
    const { manifest, objects } = await processIcon(
      { kind: "icon", key: "icons/favicon", source: "favicon.svg", sizes: [180, 32] },
      new TextEncoder().encode(glyph),
    );
    expect(manifest).toMatchObject({ kind: "icon", sizes: [32, 180] });
    expect(objects.map((o) => o.contentType)).toEqual(["image/svg+xml", "image/png", "image/png"]);
    expect((await sharp(objects[2]?.body).metadata()).width).toBe(180);
  });
});

describe("processDocument", () => {
  const entry = {
    kind: "document",
    key: "docs/resume-pt",
    source: "docs/aysllan-ferreira-resume-pt.pdf",
    document: "resume",
    locale: "pt",
  } as const;

  it("publishes PDFs at a stable URL as a named download", () => {
    const { objects } = processDocument(entry, new TextEncoder().encode("%PDF-1.7 ..."));
    expect(objects[0]).toMatchObject({
      objectKey: "docs/aysllan-ferreira-resume-pt.pdf",
      contentType: "application/pdf",
      immutable: false,
      contentDisposition: 'attachment; filename="Aysllan-Ferreira-Resume-PT.pdf"',
    });
  });

  it("rejects files that are not PDFs", () => {
    expect(() => processDocument(entry, new TextEncoder().encode("hello"))).toThrow(/not a PDF/);
  });
});
