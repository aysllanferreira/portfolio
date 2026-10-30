import { expect, test } from "@playwright/test";

test("the site responds and renders without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(page.locator("main")).toBeAttached();
  expect(errors).toEqual([]);
});
