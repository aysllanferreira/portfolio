import { describe, expect, it } from "vitest";

import {
  formatMonthRange,
  formatMonthYear,
  formatNumber,
  formatRegion,
  monthsBetween,
} from "./format";

describe("formatMonthYear", () => {
  it("uses each locale's month names without trailing abbreviation dots", () => {
    expect(formatMonthYear("2025-09", "en")).toBe("Sep 2025");
    expect(formatMonthYear("2025-09", "pt")).toBe("set 2025");
    expect(formatMonthYear("2025-09", "es")).toMatch(/^sept? 2025$/);
  });

  it("rejects malformed months", () => {
    expect(() => formatMonthYear("2025-13", "en")).toThrow(/Invalid month/);
  });
});

describe("formatMonthRange", () => {
  it("joins two months with an em dash", () => {
    expect(formatMonthRange("2025-09", "2026-06", "en", "Present")).toBe("Sep 2025 — Jun 2026");
  });

  it("ends ongoing periods with the localized present label", () => {
    expect(formatMonthRange("2024-01", undefined, "pt", "Atual")).toBe("jan 2024 — Atual");
  });
});

describe("formatNumber", () => {
  it("groups digits per locale", () => {
    expect(formatNumber(3000, "en")).toBe("3,000");
    expect(formatNumber(3000, "pt")).toBe("3.000");
  });
});

describe("formatRegion", () => {
  it("names countries in each language", () => {
    expect(formatRegion("us", "en")).toBe("United States");
    expect(formatRegion("cz", "en")).toBe("Czechia");
    expect(formatRegion("gb", "pt")).toBe("Reino Unido");
    expect(formatRegion("br", "es")).toBe("Brasil");
  });
});

describe("monthsBetween", () => {
  it("counts whole months across years", () => {
    expect(monthsBetween("2021-03", "2026-06")).toBe(63);
    expect(monthsBetween("2025-09", "2025-09")).toBe(0);
  });
});
