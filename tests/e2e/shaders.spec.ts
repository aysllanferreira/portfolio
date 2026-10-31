import { type Page } from "@playwright/test";

import { expect, test } from "../support/playwright";

const state = (page: Page, selector: string) => page.locator(`${selector} [data-shader-state]`);

/** Lifecycle tests need WebGL; environments without it are covered by the fallback test. */
async function requireWebGL(page: Page) {
  await page.goto("/en/qa/shader-hero");
  const supported = await page.evaluate(() =>
    Boolean(document.createElement("canvas").getContext("webgl")),
  );
  test.skip(!supported, "this browser environment provides no WebGL");
}

test.describe("shader backgrounds", () => {
  test("animate when visible and release far-away sections", async ({ page }) => {
    await requireWebGL(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/qa/shader-stack");

    await expect(state(page, '[data-testid="section-0"]')).toHaveAttribute(
      "data-shader-state",
      "animating",
    );
    await expect(state(page, '[data-testid="section-4"]')).toHaveAttribute(
      "data-shader-state",
      "idle",
    );

    await page.locator('[data-testid="section-4"]').scrollIntoViewIfNeeded();
    await expect(state(page, '[data-testid="section-4"]')).toHaveAttribute(
      "data-shader-state",
      "animating",
    );
    await expect(state(page, '[data-testid="section-0"]')).toHaveAttribute(
      "data-shader-state",
      "idle",
    );
  });

  test("render a single static frame when motion is reduced", async ({ page }) => {
    await requireWebGL(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/qa/shader-hero");
    await expect(page.locator("[data-shader-state]")).toHaveAttribute(
      "data-shader-state",
      "static",
    );
  });

  test("pause while the tab is hidden", async ({ page }) => {
    await requireWebGL(page);
    await page.goto("/en/qa/shader-hero");
    const background = page.locator("[data-shader-state]");
    await expect(background).toHaveAttribute("data-shader-state", "animating");

    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { configurable: true, get: () => true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await expect(background).toHaveAttribute("data-shader-state", "idle");
  });

  test("fall back to a static gradient without WebGL, with no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (
        this: HTMLCanvasElement,
        type: string,
        ...rest: unknown[]
      ) {
        if (type.startsWith("webgl")) return null;
        return (original as (...args: unknown[]) => unknown).call(this, type, ...rest);
      } as typeof original;
    });

    await page.goto("/en/qa/shader-hero");
    await expect(page.locator("[data-shader-state]")).toHaveAttribute(
      "data-shader-state",
      "fallback",
    );
    expect(errors).toEqual([]);
  });

  test("never block content: the base color shows before the first frame", async ({ page }) => {
    await page.goto("/en/qa/shader-hero");
    const background = await page
      .locator("[data-shader-state]")
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(background).toBe("rgb(10, 10, 15)");
  });
});
