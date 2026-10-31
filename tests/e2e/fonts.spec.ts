import { expect, test } from "../support/playwright";

test("fonts are self-hosted and preloaded from the site origin", async ({ page, baseURL }) => {
  const thirdPartyFontRequests: string[] = [];
  page.on("request", (request) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url())) {
      thirdPartyFontRequests.push(request.url());
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const preloads = await page
    .locator('link[rel="preload"][as="font"]')
    .evaluateAll((links) => links.map((link) => (link as HTMLLinkElement).href));

  expect(preloads.length).toBeGreaterThan(0);
  for (const href of preloads) expect(new URL(href).origin).toBe(new URL(baseURL ?? "").origin);
  expect(thirdPartyFontRequests).toEqual([]);
});
