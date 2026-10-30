import { expect, test } from "@playwright/test";

/** No layout range may scroll sideways, in any language, from small phones to wide screens. */
const widths = [320, 390, 834, 1280, 1440, 1920];
const locales = ["en", "pt", "es"];

for (const locale of locales) {
  test(`/${locale} never overflows horizontally`, async ({ page }) => {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}`);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${String(width)}px wide`).toBeLessThanOrEqual(0);
    }
  });
}
