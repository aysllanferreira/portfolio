import { describe, expect, it } from "vitest";

import { localeAlternates } from "./alternates";

describe("localeAlternates", () => {
  it("points the canonical at the locale and lists every translation", () => {
    expect(localeAlternates("https://aysllan.com", "pt")).toEqual({
      canonical: "https://aysllan.com/pt",
      languages: {
        en: "https://aysllan.com/en",
        "pt-BR": "https://aysllan.com/pt",
        es: "https://aysllan.com/es",
        "x-default": "https://aysllan.com/en",
      },
    });
  });

  it("supports nested paths", () => {
    expect(localeAlternates("https://aysllan.com", "es", "/privacy").canonical).toBe(
      "https://aysllan.com/es/privacy",
    );
  });
});
