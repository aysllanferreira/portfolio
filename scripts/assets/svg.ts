import sharp from "sharp";
import { optimize } from "svgo";

import { fingerprint } from "./fingerprint";
import { IMMUTABLE_CACHE, type IconEntry, type SvgEntry } from "./types";
import { iconObjectKey, svgObjectKey } from "../../src/lib/asset-paths";

import type { ProcessedAsset } from "./raster";

const decoder = new TextDecoder();
const encoder = new TextEncoder();

/**
 * Applies one fill color to a single-color glyph (brand marks, technology logos).
 * An 8-digit hex is split into fill + fill-opacity for the widest renderer support.
 */
export function recolorSvg(svg: string, color: string): string {
  const match = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(color);
  if (!match) throw new Error(`Unsupported color "${color}", expected #RRGGBB or #RRGGBBAA`);

  const fill = `#${match[1]?.toUpperCase() ?? ""}`;
  const opacity = match[2] ? Number((parseInt(match[2], 16) / 255).toFixed(3)) : undefined;
  const paint =
    opacity === undefined ? `fill="${fill}"` : `fill="${fill}" fill-opacity="${opacity}"`;

  const withoutFills = svg.replace(/\s(fill|fill-opacity)="[^"]*"/g, "");
  return withoutFills.replace(/<svg\b/, `<svg ${paint}`);
}

export function optimizeSvg(svg: string): string {
  return optimize(svg, {
    multipass: true,
    plugins: [
      // svgo 4 keeps the viewBox by default, which responsive scaling relies on.
      "preset-default",
      { name: "prefixIds" },
    ],
  }).data;
}

export function svgDimensions(svg: string): { width: number; height: number } {
  const viewBox = /viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/.exec(svg);
  if (!viewBox?.[1] || !viewBox[2]) throw new Error("SVG has no usable viewBox");
  return { width: Number(viewBox[1]), height: Number(viewBox[2]) };
}

export function processSvg(entry: SvgEntry, source: Uint8Array): ProcessedAsset {
  const original = decoder.decode(source);
  const colored = entry.color ? recolorSvg(original, entry.color) : original;
  const output = optimizeSvg(colored);
  const hash = fingerprint(source, { color: entry.color ?? null });

  return {
    manifest: { kind: "svg", ...svgDimensions(original), hash },
    objects: [
      {
        objectKey: svgObjectKey(entry.key, hash),
        body: encoder.encode(output),
        contentType: "image/svg+xml",
        cacheControl: IMMUTABLE_CACHE,
        immutable: true,
      },
    ],
  };
}

/** Square PNG renders of an SVG icon (favicon fallbacks, touch icons). */
export async function processIcon(entry: IconEntry, source: Uint8Array): Promise<ProcessedAsset> {
  const sizes = [...entry.sizes].sort((a, b) => a - b);
  const hash = fingerprint(source, { sizes });

  const pngs = await Promise.all(
    sizes.map(async (size) => ({
      size,
      body: await sharp(source, { density: 1024 })
        .resize(size, size)
        .png({ compressionLevel: 9 })
        .toBuffer(),
    })),
  );

  return {
    manifest: { kind: "icon", hash, sizes },
    objects: [
      {
        objectKey: svgObjectKey(entry.key, hash),
        body: encoder.encode(optimizeSvg(decoder.decode(source))),
        contentType: "image/svg+xml",
        cacheControl: IMMUTABLE_CACHE,
        immutable: true,
      },
      ...pngs.map(({ size, body }) => ({
        objectKey: iconObjectKey(entry.key, hash, size),
        body,
        contentType: "image/png",
        cacheControl: IMMUTABLE_CACHE,
        immutable: true,
      })),
    ],
  };
}
