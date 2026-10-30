import { techBrandColors } from "../../src/content/tech-logos";

import type { CatalogEntry, DisplayWidths, DocumentEntry, SvgEntry } from "./types";

/*
 * Every asset the site renders, with the information needed to optimize it.
 * Display widths are the largest CSS widths each image is drawn at in the design's
 * mobile (390), tablet (834) and desktop (1440) views. Colors are the exact fills
 * the design gives each glyph. Source paths are relative to ASSETS_SOURCE_DIR.
 */

const same = (width: number): DisplayWidths => ({ mobile: width, tablet: width, desktop: width });

const flags = ["us", "br", "es", "ca", "gb", "no", "cz"] as const;

/** The AF monogram in every fill the design uses it with. */
const afMarkColors = {
  violet: "#A493FF",
  soft: "#C3B8FF",
  ink: "#0A0A0F",
  deep: "#5B3FE0",
  ghost: "#A493FF14",
} as const;

export const documentLocales = ["en", "pt", "es"] as const;

export const catalog: readonly CatalogEntry[] = [
  ...flags.map((code): CatalogEntry => ({
    kind: "raster",
    key: `flags/${code}`,
    source: `images/flags/${code}.png`,
    display: same(24),
  })),
  {
    kind: "raster",
    key: "screenshots/centrum-ai",
    source: "images/screenshot-centrum-ai.com-1.png",
    display: { mobile: 350, tablet: 754, desktop: 760 },
  },
  {
    kind: "raster",
    key: "screenshots/investable",
    source: "images/screenshot-myinvestable.com-1.png",
    display: { mobile: 350, tablet: 367, desktop: 528 },
  },
  {
    kind: "raster",
    key: "screenshots/privacy-lock",
    source: "images/screenshot-myprivacylock.io-1.png",
    display: { mobile: 350, tablet: 367, desktop: 528 },
  },
  {
    kind: "raster",
    key: "people/aysllan",
    source: "images/people/aysllan-cutout.webp",
    display: { mobile: 300, tablet: 480, desktop: 480 },
  },
  {
    kind: "raster",
    key: "people/konstantin",
    source: "images/people/konstantin.jpg",
    display: same(56),
  },
  ...Object.entries(techBrandColors).map(([name, color]): SvgEntry => ({
    kind: "svg",
    key: `logos/${name}`,
    source: `images/stack/${name}.svg`,
    color,
  })),
  ...Object.entries(afMarkColors).map(([variant, color]): SvgEntry => ({
    kind: "svg",
    key: `brand/af-mark-${variant}`,
    source: "brand/af-mark-violet.svg",
    color,
  })),
  { kind: "icon", key: "favicon", source: "brand/favicon.svg", sizes: [32, 180, 192, 512] },
  ...documentLocales.flatMap((locale) =>
    (["resume", "cover-letter"] as const).map((document): DocumentEntry => ({
      kind: "document",
      key: `docs/${document}-${locale}`,
      source: `docs/aysllan-ferreira-${document}-${locale}.pdf`,
      document,
      locale,
    })),
  ),
];
