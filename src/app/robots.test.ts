import { afterEach, describe, expect, it, vi } from "vitest";

async function robotsFor(siteEnv: "production" | "preview") {
  vi.resetModules();
  vi.doMock("@/lib/env", async (actual) => ({
    ...(await actual<object>()),
    isProductionSite: siteEnv === "production",
  }));
  const { default: robots } = await import("./robots");
  return robots();
}

afterEach(() => {
  vi.doUnmock("@/lib/env");
});

describe("robots.txt", () => {
  it("lets crawlers in and lists the sitemap in production", async () => {
    const rules = await robotsFor("production");
    expect(rules.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(rules.sitemap).toMatch(/\/sitemap\.xml$/);
  });

  it("keeps crawlers out while the site is under construction", async () => {
    const rules = await robotsFor("preview");
    expect(rules.rules).toEqual({ userAgent: "*", disallow: "/" });
    expect(rules.sitemap).toBeUndefined();
  });
});
