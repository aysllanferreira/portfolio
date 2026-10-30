import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

/*
 * Self-hosted at build time by next/font: no runtime requests to Google, and
 * size-adjusted fallbacks keep layout shift near zero while fonts load.
 */
const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
});

/** Only the italic accent word of each headline uses the serif. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const fontVariables = [geist.variable, geistMono.variable, instrumentSerif.variable].join(
  " ",
);
