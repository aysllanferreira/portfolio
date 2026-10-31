import type { CountryCode } from "@/components/ui/Flag";
import type { ScreenshotFrames } from "@/components/ui/SpotlightCard";
import type { Dictionary } from "@/i18n/types";
import type { RasterKey } from "@/lib/assets";

/*
 * Facts about every project, shared by all locales: order, links, country and tags.
 * Descriptive copy (market, product, role, screenshot description) lives in the
 * `projects` dictionary namespace, keyed by these slugs.
 */

export type ProjectTagKey = keyof Dictionary["projects"]["tags"];

export interface ProjectFacts {
  name: string;
  country: CountryCode;
  /** Public site; omitted for private products, which render without a link. */
  domain?: string;
  tags: readonly ProjectTagKey[];
  /** Tags drawn in the accent tone, e.g. a compliance standard worth noticing. */
  accentTags?: readonly ProjectTagKey[];
}

interface SpotlightFacts extends ProjectFacts {
  domain: string;
  screenshot: RasterKey;
  /** Which part of the screenshot each layout shows, from the design's image transforms. */
  frames: ScreenshotFrames;
}

export const spotlights = {
  "centrum-ai": {
    name: "Centrum-AI",
    country: "us",
    domain: "centrum-ai.com",
    tags: ["frontend", "backend", "ai", "supplyChain"],
    screenshot: "screenshots/centrum-ai",
    frames: {
      mobile: { zoom: 1, x: 0, y: 0 },
      tablet: { zoom: 1, x: 0, y: 0 },
      desktop: { zoom: 1, x: 0, y: 0 },
    },
  },
  investable: {
    name: "Investable",
    country: "us",
    domain: "myinvestable.com",
    tags: ["frontend", "backend", "fintech"],
    screenshot: "screenshots/investable",
    frames: {
      mobile: { zoom: 1.6129, x: 0, y: 0 },
      tablet: { zoom: 1.6667, x: 0, y: 0 },
      desktop: { zoom: 1.3514, x: 0, y: 0 },
    },
  },
  "privacy-lock": {
    name: "Privacy Lock",
    country: "us",
    domain: "myprivacylock.io",
    tags: ["aws", "singleTenant", "multiTenant"],
    screenshot: "screenshots/privacy-lock",
    frames: {
      mobile: { zoom: 1.9231, x: 0, y: 3.5376 / 8.0401 },
      tablet: { zoom: 2, x: 0, y: 3.5071 / 7.9707 },
      desktop: { zoom: 1.4286, x: 0, y: 3.686 / 8.191 },
    },
  },
} as const satisfies Record<string, SpotlightFacts>;

export const projects = {
  "orchard-mental-health": {
    name: "Orchard Mental Health",
    country: "us",
    domain: "orchardmentalhealth.com",
    tags: ["endToEnd", "aws", "hipaa"],
    accentTags: ["hipaa"],
  },
  "real-info-box": {
    name: "Real Info Box",
    country: "ca",
    domain: "realinfobox.com",
    tags: ["vue", "lambda", "ses"],
  },
  cloudexpat: {
    name: "CloudExpat",
    country: "us",
    domain: "cloudexpat.com",
    tags: ["frontend"],
  },
  chronly: {
    name: "Chronly",
    country: "us",
    domain: "chronly.ai",
    tags: ["frontend", "backend", "desktopApp"],
  },
  "reflections-recorder": {
    name: "Reflections Recorder",
    country: "us",
    tags: ["endToEnd"],
  },
  homeparty: {
    name: "HomeParty",
    country: "no",
    tags: ["mobileApp", "backend", "qrCheckIn"],
  },
  pinely: {
    name: "Pinely",
    country: "cz",
    domain: "pinely.eu",
    tags: ["frontend", "backend", "aws"],
  },
  octafin: {
    name: "Octafin",
    country: "br",
    domain: "octafin.com.br",
    tags: ["endToEnd", "aws"],
  },
  virtoo: {
    name: "Virtoo",
    country: "br",
    domain: "virtoo.com.br",
    tags: ["endToEnd", "mobileApp"],
  },
  intellux: {
    name: "Intellux",
    country: "br",
    domain: "intellux.com",
    tags: ["backend", "generativeAi"],
  },
  "upix-networks": {
    name: "UPIX Networks",
    country: "br",
    domain: "upixnetworks.com",
    tags: ["techLead"],
  },
  techtee: {
    name: "Techtee",
    country: "gb",
    domain: "techtee.co",
    tags: ["frontend"],
  },
} as const satisfies Record<string, ProjectFacts>;

export type SpotlightSlug = keyof typeof spotlights;
export type ProjectSlug = keyof typeof projects;

/** Countries served, in the design's order, with how many projects each one has. */
export const countries = [
  { code: "us", count: "+30" },
  { code: "br", count: "04" },
  { code: "ca", count: "01" },
  { code: "gb", count: "01" },
  { code: "no", count: "01" },
  { code: "cz", count: "01" },
] as const satisfies readonly { code: CountryCode; count: string }[];

/** Resolves tag keys to the localized labels and tones the cards render. */
export function localizeTags(
  facts: ProjectFacts,
  labels: Dictionary["projects"]["tags"],
): { label: string; tone: "neutral" | "accent" }[] {
  const accent = new Set<ProjectTagKey>(facts.accentTags ?? []);
  return facts.tags.map((key) => ({
    label: labels[key],
    tone: accent.has(key) ? "accent" : "neutral",
  }));
}
