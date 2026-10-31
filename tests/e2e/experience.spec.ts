import { expect, test } from "../support/playwright";

/** Experience: the timeline drawing is decorative, its facts are readable. */
test.describe("experience", () => {
  test("screen readers get the timeline as a list of roles with dates", async ({ page }) => {
    await page.goto("/es");
    const list = page.getByRole("list", { name: "Roles a lo largo del tiempo" });
    await expect(list.getByRole("listitem")).toHaveCount(5);
    await expect(list.getByRole("listitem").first()).toHaveText(
      "Ingeniero de Software Sénior en Pinely International, Tiempo completo: ago 2024 — Actual",
    );
  });

  test("the recommendation stays in English on every page", async ({ page }) => {
    await page.goto("/pt");
    const quote = page.locator("#experience blockquote");
    await expect(quote).toHaveAttribute("lang", "en");
    await expect(quote).toContainText("interpersonal care");
  });

  test("the current role ends at now on the axis", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    const geometry = await page.locator("#experience").evaluate((section) => {
      const pulse = section.querySelector('.rounded-full.bg-accent[class~="size-3.5"]');
      const nowLabel = [...section.querySelectorAll("span")].find((el) => el.textContent === "Now");
      if (!pulse || !nowLabel) return null;
      const a = pulse.getBoundingClientRect();
      const b = nowLabel.getBoundingClientRect();
      return Math.abs(a.left + a.width / 2 - (b.left + b.width / 2));
    });
    expect(geometry).not.toBeNull();
    expect(geometry).toBeLessThan(2);
  });
});
