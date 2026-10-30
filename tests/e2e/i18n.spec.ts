import { expect, test } from "@playwright/test";

const cases = [
  { header: "pt-BR,pt;q=0.9,en;q=0.8", expected: "/pt" },
  { header: "es-MX,es;q=0.9", expected: "/es" },
  { header: "de-DE,de;q=0.9", expected: "/en" },
  { header: "de-DE,pt;q=0.8,en;q=0.5", expected: "/pt" },
  { header: undefined, expected: "/en" },
];

for (const { header, expected } of cases) {
  test(`/ redirects ${header ?? "a request without Accept-Language"} to ${expected}`, async ({
    request,
  }) => {
    const response = await request.get("/", {
      maxRedirects: 0,
      headers: header ? { "accept-language": header } : {},
    });

    expect(response.status()).toBe(307);
    expect(new URL(response.headers().location ?? "", "http://x").pathname).toBe(expected);
    expect(response.headers()["cache-control"]).toContain("no-store");
    expect(response.headers().vary).toMatch(/accept-language/i);
  });
}

for (const [path, lang] of [
  ["/en", "en"],
  ["/pt", "pt-BR"],
  ["/es", "es"],
] as const) {
  test(`${path} is served with <html lang="${lang}">`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
  });
}

test("an unsupported locale returns the 404 page", async ({ page }) => {
  const response = await page.goto("/fr");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
});
