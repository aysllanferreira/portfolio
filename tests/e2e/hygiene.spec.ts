import { expect, test, type Page } from "@playwright/test";

/*
 * Reflow and runtime hygiene: the page reads at 200% zoom and at 320px without
 * sideways scrolling (WCAG 1.4.10), and loading and scrolling it produce no console
 * errors or warnings and no failed requests.
 */

const horizontalOverflow = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

for (const locale of ["en", "pt", "es"]) {
  test(`/${locale} reflows at 200% zoom and at 320px`, async ({ page }) => {
    // 1280×720 at 200% zoom is a 640×360 CSS viewport. Resizing one loaded page is
    // enough: layout reflows on resize, as it does when a reader zooms.
    await page.setViewportSize({ width: 640, height: 360 });
    await page.goto(`/${locale}`);
    for (const viewport of [
      { width: 640, height: 360 },
      { width: 320, height: 640 },
    ]) {
      await page.setViewportSize(viewport);
      await expect
        .poll(() => horizontalOverflow(page), { message: `${String(viewport.width)}px` })
        .toBeLessThanOrEqual(0);
      await expect(page.locator("h1")).toBeVisible();
    }
  });
}

test("loading and scrolling the page is free of console noise and failed requests", async ({
  page,
}) => {
  const problems: string[] = [];
  page.on("console", (message) => {
    // Headless Chromium's software GL logs its own driver diagnostics when it reads
    // canvases back to composite them; they come from the test renderer, not the page.
    if (message.text().includes("GL Driver Message")) return;
    // CI runners have no GPU: Firefox reports the failed WebGL context, and the page
    // shows its static fallback background, which is the designed behavior.
    if (message.text().includes("Failed to create WebGL context")) return;
    if (["error", "warning"].includes(message.type())) {
      problems.push(`console ${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => problems.push(`page error: ${error.message}`));
  page.on("requestfailed", (request) => {
    // Navigating away aborts requests still in flight; those are not failures.
    if (request.failure()?.errorText.includes("ERR_ABORTED")) return;
    problems.push(`request failed: ${request.url()} (${request.failure()?.errorText ?? ""})`);
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      problems.push(`HTTP ${String(response.status())}: ${response.url()}`);
  });

  await page.goto("/en");
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 700) {
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(80);
  }
  await page.waitForLoadState("networkidle");
  expect(problems).toEqual([]);
});
