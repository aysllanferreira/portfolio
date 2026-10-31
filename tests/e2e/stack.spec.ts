import { expect, test } from "@playwright/test";

/** Stack: the practices ticker respects reduced motion and hides its looping copy. */
test.describe("stack", () => {
  test("the ticker's duplicate run is hidden from assistive technology", async ({ page }) => {
    await page.goto("/en");
    const ticker = page.getByRole("region", { name: "Practices" });
    await expect(ticker.getByRole("listitem")).toHaveCount(8);
    await expect(ticker.locator('ul[aria-hidden="true"]')).toHaveCount(1);
  });

  test("the ticker does not move when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    const track = page.getByRole("region", { name: "Practices" }).locator("> div").first();
    expect(await track.evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
  });

  test("layers read as headed sections in every language", async ({ page }) => {
    await page.goto("/pt");
    const layers = page.getByRole("list", { name: "A stack por camada" });
    await expect(layers.getByRole("heading", { level: 3 })).toHaveCount(6);
    await expect(layers.getByRole("heading", { level: 3 }).nth(3)).toHaveText("L4Nuvem e DevOps");
  });
});
