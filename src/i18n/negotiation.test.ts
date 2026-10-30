import { describe, expect, it } from "vitest";

import { hasLocale, languageTags, locales } from "./config";
import { negotiateLocale, parseAcceptLanguage } from "./negotiation";

describe("locale config", () => {
  it("knows its locales", () => {
    expect(hasLocale("pt")).toBe(true);
    expect(hasLocale("fr")).toBe(false);
    for (const locale of locales) expect(languageTags[locale]).toBeTruthy();
  });
});

describe("negotiateLocale", () => {
  it.each([
    ["pt-BR,pt;q=0.9,en;q=0.8", "pt"],
    ["pt", "pt"],
    ["PT-pt", "pt"],
    ["es-MX,es;q=0.9", "es"],
    ["en-US,pt;q=0.9", "en"],
    ["de-DE,pt;q=0.8,en;q=0.5", "pt"],
    ["de-DE,de;q=0.9", "en"],
    ["fr;q=1, es;q=0.4, pt;q=0.7", "pt"],
    ["*", "en"],
    ["", "en"],
    [null, "en"],
    [undefined, "en"],
  ])("negotiates %s -> %s", (header, expected) => {
    expect(negotiateLocale(header)).toBe(expected);
  });

  it("does not mistake longer language codes for a locale", () => {
    expect(negotiateLocale("pth")).toBe("en");
    expect(negotiateLocale("est-EE")).toBe("en");
  });

  it("ignores languages the visitor explicitly refuses", () => {
    expect(negotiateLocale("pt;q=0, es;q=0.5")).toBe("es");
  });
});

describe("parseAcceptLanguage", () => {
  it("orders by quality, keeping header order for ties", () => {
    expect(parseAcceptLanguage("en;q=0.5, pt-BR, es;q=0.5").map((p) => p.language)).toEqual([
      "pt",
      "en",
      "es",
    ]);
  });

  it("drops wildcards and malformed qualities", () => {
    expect(parseAcceptLanguage("*, pt;q=abc, es")).toEqual([
      { language: "es", quality: 1, order: 2 },
    ]);
  });
});
