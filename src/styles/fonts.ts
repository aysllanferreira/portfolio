import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

/*
 * Self-hosted at build time by next/font: no runtime requests to Google, and
 * size-adjusted fallbacks keep layout shift near zero while fonts load. The Latin
 * subset covers every character in all three languages (accents, dashes, the minus
 * sign), so no Latin Extended files compete with the first render.
 */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  // Only small labels use the mono face; it loads with the stylesheet, not ahead of it.
  preload: false,
});

/** Only the italic accent word of each headline uses the serif. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const fontVariables = [geist.variable, geistMono.variable, instrumentSerif.variable].join(
  " ",
);
