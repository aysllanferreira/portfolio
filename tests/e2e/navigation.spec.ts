import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const visibleNavbarVariant = async (page: Page) =>
  page.evaluate(() =>
    ["desktop", "tablet", "mobile"].map((variant) => {
      const row = document.querySelector(`[data-navbar="${variant}"]`);
      return row !== null && getComputedStyle(row).display !== "none";
    }),
  );

test.describe("navigation shell", () => {
  test("the first Tab reaches a skip link that moves focus to the content", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName === "webkit", "WebKit only tabs to links when the user enables it");
    await page.goto("/en");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#content")).toBeFocused();
  });

  for (const [width, expected] of [
    [767, [false, false, true]],
    [768, [false, true, false]],
    [1199, [false, true, false]],
    [1200, [true, false, false]],
  ] as const) {
    test(`exactly one navbar variant is visible at ${String(width)}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/en");
      expect(await visibleNavbarVariant(page)).toEqual(expected);
    });
  }

  test("section links land below the sticky navbar", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Stack" })
      .click();
    await expect(page).toHaveURL(/#stack$/);
    await expect
      .poll(async () => {
        const headerBottom = await page
          .getByRole("banner")
          .evaluate((el) => el.getBoundingClientRect().bottom);
        const sectionTop = await page
          .locator("#stack")
          .evaluate((el) => el.getBoundingClientRect().top);
        return sectionTop >= headerBottom - 1 && sectionTop < headerBottom + 80;
      })
      .toBe(true);
  });

  test("the section being read is marked in the links pill", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    await page.locator("#experience").evaluate((el) => el.scrollIntoView({ block: "start" }));
    const pill = page.getByRole("navigation", { name: "Main" });
    await expect(pill.getByRole("link", { name: "Experience" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    await expect(pill.locator('[aria-current="location"]')).toHaveCount(1);
  });

  test("switching language keeps the reader on the same section", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en#stack");
    await page.locator("#stack").evaluate((el) => el.scrollIntoView({ block: "start" }));
    const switcher = page.getByRole("navigation", { name: /Current language: English/ });
    await expect(switcher.getByRole("link", { name: "English" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    await expect(switcher.getByRole("link", { name: "Português" })).toHaveAttribute(
      "href",
      "/pt#stack",
    );
    await switcher.getByRole("link", { name: "Português" }).click();
    await expect(page).toHaveURL(/\/pt#stack$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  });
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens as a modal, traps focus, closes on Escape and restores focus", async ({
    page,
    browserName,
  }) => {
    await page.goto("/en");
    const openButton = page.getByRole("button", { name: "Open menu" });
    await openButton.focus();
    if (browserName === "webkit") await openButton.click();
    else await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe(
      "hidden",
    );

    for (let i = 0; i < 15; i++) {
      await page.keyboard.press("Tab");
      expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    // Safari does not focus buttons on click, so there is no focus to restore there.
    if (browserName !== "webkit") await expect(openButton).toBeFocused();
  });

  test("a link closes the menu and goes to its section", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: /Contact/ })
      .click();
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page).toHaveURL(/#contact$/);
  });

  test("the open menu has no serious accessibility violations", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Open menu" }).click();
    const { violations } = await new AxeBuilder({ page }).include("dialog").analyze();
    expect(violations.filter((v) => ["serious", "critical"].includes(v.impact ?? ""))).toEqual([]);
  });

  test("the language menu lists every language and marks the current one", async ({ page }) => {
    await page.goto("/pt");
    await page.getByRole("button", { name: /Idioma: Português/ }).click();
    const current = page.getByRole("link", { name: /Português/ }).last();
    await expect(current).toBeVisible();
    await expect(current).toHaveAttribute("aria-current", "true");
    await page.keyboard.press("Escape");
    await expect(current).toBeHidden();
  });
});

test.describe("footer", () => {
  test("back to top returns to the start and focuses the content", async ({ page }) => {
    await page.goto("/en");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.getByRole("link", { name: "Back to top" }).click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page.locator("main#content")).toBeFocused();
  });

  test("profile links open safely in a new tab", async ({ page }) => {
    await page.goto("/en");
    for (const name of [/LinkedIn/, /GitHub/]) {
      const link = page.getByRole("contentinfo").getByRole("link", { name });
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toHaveAccessibleName(/opens in a new tab/);
    }
  });

  test("the copyright shows the current year", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("contentinfo")).toContainText(
      `© ${String(new Date().getFullYear())}`,
    );
  });
});

test("dictionaries stay on the server", async ({ request }) => {
  const html = await (await request.get("/en")).text();
  // If the dictionaries module reached a client component, every locale would be
  // serialized into the page; the English page must contain no Portuguese copy.
  expect(html).not.toContain("Pular para o conteúdo");
  expect(html).not.toContain("Saltar al contenido");
});
