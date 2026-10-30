import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { rasterAsset } from "@/lib/assets";

import { AssetImage } from "./AssetImage";
import { AssetSvg } from "./AssetSvg";

describe("AssetImage", () => {
  it("renders an AVIF source and a WebP image built from stored widths", () => {
    const { container } = render(
      <AssetImage name="screenshots/investable" alt="Investable dashboard" sizes="528px" />,
    );
    const { widths, width, height } = rasterAsset("screenshots/investable");

    const source = container.querySelector("source");
    expect(source).toHaveAttribute("type", "image/avif");
    expect(source?.getAttribute("srcset")?.split(", ")).toHaveLength(widths.length);

    const img = screen.getByRole("img", { name: "Investable dashboard" });
    expect(img).toHaveAttribute("width", String(width));
    expect(img).toHaveAttribute("height", String(height));
    expect(img).toHaveAttribute("loading", "lazy");
    for (const w of widths)
      expect(img.getAttribute("srcset")).toContain(`.${String(w)}.webp ${String(w)}w`);
  });

  it("loads above-the-fold images eagerly with high priority", () => {
    render(<AssetImage name="people/aysllan" alt="Portrait" sizes="480px" priority />);
    const img = screen.getByRole("img", { name: "Portrait" });
    expect(img).toHaveAttribute("loading", "eager");
    expect(img).toHaveAttribute("fetchpriority", "high");
  });

  it("paints a blurred placeholder behind large images", () => {
    render(<AssetImage name="people/aysllan" alt="Portrait" sizes="480px" />);
    expect(screen.getByRole("img").getAttribute("style")).toContain("data:image/webp;base64");
  });
});

describe("AssetSvg", () => {
  it("sizes a vector from one dimension, keeping its aspect ratio", () => {
    render(<AssetSvg name="brand/af-mark-soft" alt="Aysllan Ferreira" height={18} />);
    const img = screen.getByRole("img", { name: "Aysllan Ferreira" });
    expect(img).toHaveAttribute("height", "18");
    expect(Number(img.getAttribute("width"))).toBeCloseTo(23.08, 1);
  });

  it("hides decorative vectors from assistive technology", () => {
    const { container } = render(<AssetSvg name="logos/react" alt="" width={15} />);
    expect(container.querySelector("img")).toHaveAttribute("aria-hidden", "true");
  });
});
