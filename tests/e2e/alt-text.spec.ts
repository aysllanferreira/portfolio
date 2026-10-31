import { expect, test, type Page } from "@playwright/test";

/**
 * Every image either describes itself in the page's language or is explicitly
 * decorative (alt=""). Proper names, such as the owner's name on the monogram, read
 * the same in every language and are the only alt texts allowed to repeat.
 */
const sameInEveryLanguage = new Set(["Aysllan Ferreira"]);

async function altTexts(page: Page, locale: string): Promise<(string | null)[]> {
  await page.goto(`/${locale}`);
  return page
    .locator("img")
    .evaluateAll((images) => images.map((image) => image.getAttribute("alt")));
}

test("every image has localized or intentionally empty alt text", async ({ page }) => {
  const english = await altTexts(page, "en");
  expect(english.length).toBeGreaterThan(0);
  expect(english.filter((alt) => alt === null)).toEqual([]);

  const describedInEnglish = new Set(english.filter((alt) => alt && !sameInEveryLanguage.has(alt)));
  for (const locale of ["pt", "es"]) {
    const alts = await altTexts(page, locale);
    expect(alts, `/${locale}: every image has an alt attribute`).not.toContain(null);
    const untranslated = alts.filter((alt) => alt && describedInEnglish.has(alt));
    expect(untranslated, `/${locale}: alt texts left in English`).toEqual([]);
  }
});
