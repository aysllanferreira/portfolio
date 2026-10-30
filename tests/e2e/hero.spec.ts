import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const hero = (page: Page) => page.locator("#top");

test.describe("hero", () => {
  for (const [locale, name] of [
    ["en", "Download résumé"],
    ["pt", "Baixar currículo"],
    ["es", "Descargar currículum"],
  ] as const) {
    test(`/${locale} offers the résumé in its own language`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const link = hero(page).getByRole("link", { name: new RegExp(name) });
      await expect(link).toHaveAttribute(
        "href",
        `https://cdn.aysllan.com/docs/aysllan-ferreira-resume-${locale}.pdf`,
      );
      await expect(link).toHaveAccessibleName(/PDF/);
    });
  }

  test("schedules an interview by email with a localized subject", async ({ page }) => {
    await page.goto("/pt");
    await expect(hero(page).getByRole("link", { name: /Agendar uma entrevista/ })).toHaveAttribute(
      "href",
      "mailto:aysllan.ferreiraks@gmail.com?subject=Entrevista%20com%20Aysllan%20Ferreira",
    );
  });

  test("has the page's only h1, read as one sentence", async ({ page }) => {
    await page.goto("/en");
    const headings = page.getByRole("heading", { level: 1 });
    await expect(headings).toHaveCount(1);
    await expect(headings).toHaveText("I build softwarepeople pay for.");
  });

  test("the scroll hint leads to the selected work", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    await page.getByRole("link", { name: "Scroll to explore" }).click();
    await expect(page).toHaveURL(/#work$/);
  });

  test("the largest contentful paint is server-rendered hero text", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== "chromium", "LCP entries are exposed by Chromium");
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/en");
      const element = await page.evaluate(
        () =>
          new Promise<string>((resolve) => {
            new PerformanceObserver((list) => {
              const entries = list.getEntries() as (PerformanceEntry & { element?: Element })[];
              const last = entries.at(-1)?.element;
              const inHero = last?.closest("#top") && !last.closest("canvas, picture, img");
              resolve(inHero ? (last?.tagName.toLowerCase() ?? "none") : (last?.tagName ?? "none"));
            }).observe({ type: "largest-contentful-paint", buffered: true });
          }),
      );
      // The headline on desktop; on mobile the six-line subhead covers more area.
      expect(["h1", "em", "p"], `${String(width)}px: ${element}`).toContain(element);
    }
  });

  for (const width of [390, 1440]) {
    test(`has no serious accessibility violations at ${String(width)}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/en");
      const { violations } = await new AxeBuilder({ page }).include("#top").analyze();
      expect(violations.filter((v) => ["serious", "critical"].includes(v.impact ?? ""))).toEqual(
        [],
      );
    });
  }
});
