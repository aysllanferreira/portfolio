import { expect, test } from "@playwright/test";

/** All Projects: one keyboard stop per public project, safe links, CDN images, no shifts. */
test.describe("all projects", () => {
  test("the keyboard reaches each public project exactly once, in order", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName === "webkit", "WebKit only tabs to links when the user enables it");
    await page.goto("/en");
    const links = page.locator("#projects a");
    const hrefs = await links.evaluateAll((all) => all.map((a) => a.getAttribute("href")));
    expect(new Set(hrefs).size).toBe(hrefs.length);
    // 3 spotlights and 10 public products; the 2 private products are not links.
    expect(hrefs).toHaveLength(13);

    await links.first().focus();
    const visited = [await page.evaluate(() => document.activeElement?.getAttribute("href"))];
    for (let i = 1; i < hrefs.length; i++) {
      await page.keyboard.press("Tab");
      visited.push(await page.evaluate(() => document.activeElement?.getAttribute("href")));
    }
    expect(visited).toEqual(hrefs);
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => document.activeElement?.closest("#projects"))).toBeNull();
  });

  test("every project link opens safely in a new tab and says so", async ({ page }) => {
    await page.goto("/en");
    for (const link of await page.locator("#projects a").all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toHaveAccessibleName(/\(opens in a new tab\)$/);
    }
  });

  test("screenshots load lazily from the CDN as AVIF", async ({ page, browserName }) => {
    test.slow();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    const screenshots = page.locator('#projects article img:not([alt=""])');
    await expect(screenshots).toHaveCount(3);
    for (const img of await screenshots.all()) {
      await expect(img).toHaveAttribute("loading", "lazy");
      await img.scrollIntoViewIfNeeded();
      // Full-size screenshots come over the network from the CDN, so allow for a slow link.
      await expect
        .poll(() => img.evaluate((el: HTMLImageElement) => el.complete), { timeout: 20_000 })
        .toBe(true);
      // Playwright's WebKit build for Windows has no AVIF decoder, so it takes the WebP source.
      const format = browserName === "webkit" ? /\.(avif|webp)$/ : /\.avif$/;
      const source = await img.evaluate((el: HTMLImageElement) => el.currentSrc);
      expect(source).toMatch(/^https:\/\/cdn\.aysllan\.com\/img\/screenshots\//);
      expect(source).toMatch(format);
    }
  });

  test("scrolling through the section causes no layout shift", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Layout-shift entries are exposed by Chromium");
    test.slow();
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/en");
      await page.evaluate(() => {
        const shifts: number[] = [];
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as (PerformanceEntry & {
            value: number;
            hadRecentInput: boolean;
          })[]) {
            if (!entry.hadRecentInput) shifts.push(entry.value);
          }
        }).observe({ type: "layout-shift", buffered: true });
        (window as unknown as { shifts: number[] }).shifts = shifts;
      });
      const section = page.locator("#projects");
      const height = await section.evaluate((el) => el.getBoundingClientRect().height);
      await section.evaluate((el) => el.scrollIntoView({ block: "start" }));
      for (let y = 0; y < height; y += 600) {
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(50);
      }
      await page.waitForTimeout(300);
      const cls = await page.evaluate(() =>
        (window as unknown as { shifts: number[] }).shifts.reduce((sum, value) => sum + value, 0),
      );
      expect(cls, `${String(width)}px`).toBeLessThan(0.05);
    }
  });

  test("private products are named without a link", async ({ page }) => {
    await page.goto("/en");
    const card = page.locator("#projects article", { hasText: "HomeParty" });
    await expect(card).toContainText("private product");
    await expect(card.locator("a")).toHaveCount(0);
  });

  test("country names follow the page language", async ({ page }) => {
    await page.goto("/es");
    const countries = page.getByRole("list", { name: "Proyectos por país" });
    await expect(countries.getByRole("listitem")).toHaveCount(6);
    await expect(countries).toContainText("Chequia");
  });
});
