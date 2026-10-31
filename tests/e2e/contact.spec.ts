import { expect, test } from "@playwright/test";

/** Contact: every channel works, documents follow the page language. */
test.describe("contact", () => {
  test("email opens the mail app and LinkedIn opens safely in a new tab", async ({ page }) => {
    await page.goto("/en");
    const channels = page.getByRole("navigation", { name: "Ways to reach me" });
    await expect(channels.getByRole("link", { name: /Email/ })).toHaveAttribute(
      "href",
      "mailto:aysllan.ferreiraks@gmail.com",
    );
    const linkedin = page.locator("#contact").getByRole("link", { name: /Message me on LinkedIn/ });
    await expect(linkedin).toHaveAttribute("target", "_blank");
    await expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });

  for (const locale of ["en", "pt", "es"]) {
    test(`/${locale} links the cover letter in its own language`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const coverLetter = page
        .locator("#contact nav a")
        .filter({ has: page.locator("svg") })
        .last();
      await expect(coverLetter).toHaveAttribute(
        "href",
        `https://cdn.aysllan.com/docs/aysllan-ferreira-cover-letter-${locale}.pdf`,
      );
    });
  }

  test("the wordmark never overflows the page", async ({ page }) => {
    // Four page loads at different widths; slower browsers on CI need the extra time.
    test.slow();
    for (const width of [320, 390, 834, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/en");
      const overflow = await page.locator("#contact").evaluate((section) => {
        const wordmark = section.querySelector('[aria-hidden="true"] p');
        if (!wordmark) return null;
        return wordmark.getBoundingClientRect().right - document.documentElement.clientWidth;
      });
      expect(overflow, `${String(width)}px`).not.toBeNull();
      expect(overflow, `${String(width)}px`).toBeLessThanOrEqual(0);
    }
  });
});
