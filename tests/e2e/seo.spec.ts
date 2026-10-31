import { expect, test } from "../support/playwright";

const locales = [
  { code: "en", og: "en_US" },
  { code: "pt", og: "pt_BR" },
  { code: "es", og: "es_ES" },
] as const;

test.describe("search and social metadata", () => {
  for (const { code, og } of locales) {
    test(`/${code} has a canonical, hreflang alternates and its own social card`, async ({
      page,
      request,
    }) => {
      await page.goto(`/${code}`);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://aysllan.com/${code}`,
      );
      await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(4);
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", og);
      await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#0a0a0f");

      const image = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(image).toContain(`/${code}/opengraph-image/`);
      const response = await request.get(new URL(image ?? "").pathname);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toBe("image/png");
    });

    test(`/${code} describes the person in structured data`, async ({ page }) => {
      await page.goto(`/${code}`);
      const data = JSON.parse(
        (await page.locator('script[type="application/ld+json"]').textContent()) ?? "[]",
      ) as { "@type": string; url?: string }[];
      expect(data.map((entry) => entry["@type"])).toEqual(["Person", "WebSite"]);
      expect(data[1]?.url).toBe(`https://aysllan.com/${code}`);
    });
  }

  test("the sitemap lists every language with its alternates", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const { code } of locales) expect(xml).toContain(`<loc>https://aysllan.com/${code}</loc>`);
    expect(xml).toContain('hreflang="x-default"');
  });

  test("robots.txt keeps crawlers out of non-production builds", async ({ request }) => {
    // The e2e build runs as a preview environment; production is covered by unit tests.
    const text = await (await request.get("/robots.txt")).text();
    expect(text).toContain("Disallow: /");
    expect(text).not.toContain("Sitemap:");
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("every section and the single h1 are in the server-rendered page", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1")).toHaveCount(1);
    for (const id of ["top", "work", "projects", "experience", "stack", "about", "contact"]) {
      await expect(page.locator(`#${id} h1, #${id} h2`).first()).not.toBeEmpty();
    }
    await expect(page.locator("#projects")).toContainText("Centrum-AI");
    await expect(page.locator("#contact")).toContainText("aysllan.ferreiraks@gmail.com");
  });
});
