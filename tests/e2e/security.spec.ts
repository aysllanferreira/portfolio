import { expect, test } from "@playwright/test";

test("pages are served with the security headers", async ({ request }) => {
  const response = await request.get("/en");
  const headers = response.headers();

  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["content-security-policy"]).toContain(
    "img-src 'self' data: https://cdn.aysllan.com",
  );
  expect(headers["strict-transport-security"]).toContain("max-age=63072000");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
});

test("non-production sites are kept out of search indexes", async ({ request }) => {
  const response = await request.get("/en");
  expect(response.headers()["x-robots-tag"]).toBe("noindex, nofollow");
});

test("the page runs without Content Security Policy violations", async ({ page }) => {
  const violations: string[] = [];
  page.on("console", (message) => {
    if (/Content Security Policy|Content-Security-Policy|CSP/i.test(message.text())) {
      violations.push(message.text());
    }
  });
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      console.error(`CSP violation: ${event.violatedDirective} ${event.blockedURI}`);
    });
  });

  await page.goto("/en");
  await page.waitForLoadState("networkidle");

  expect(violations).toEqual([]);
});
