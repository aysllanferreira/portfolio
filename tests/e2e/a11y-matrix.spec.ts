import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { PNG } from "pngjs";

/*
 * The accessibility matrix: every language at every layout, with the menu closed and,
 * where there is one, open. Text drawn over the animated background is invisible to
 * axe's contrast rule, so a second check samples the rendered pixels around each text
 * element (with the shader frozen) and computes the contrast itself.
 */

const locales = ["en", "pt", "es"] as const;
const widths = [390, 834, 1440] as const;

const serious = (
  violations: { id: string; impact?: string | null; nodes: { target: unknown[] }[] }[],
) =>
  violations
    .filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))
    .map(
      (violation) =>
        `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`,
    );

async function open(page: Page, locale: string, width: number) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`/${locale}`);
}

for (const locale of locales) {
  for (const width of widths) {
    test(`/${locale} at ${String(width)}px has no serious violations`, async ({ page }) => {
      await open(page, locale, width);
      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(serious(violations)).toEqual([]);
    });

    if (width < 1200) {
      test(`/${locale} at ${String(width)}px with the menu open has no serious violations`, async ({
        page,
      }) => {
        await open(page, locale, width);
        await page.locator('[data-navbar]:visible button[aria-haspopup="dialog"]').click();
        await expect(page.getByRole("dialog")).toBeVisible();
        const { violations } = await new AxeBuilder({ page }).include("dialog").analyze();
        expect(serious(violations)).toEqual([]);
      });
    }
  }
}

/** WCAG relative luminance and contrast ratio. */
const luminance = ([r, g, b]: number[]) => {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r ?? 0) + 0.7152 * channel(g ?? 0) + 0.0722 * channel(b ?? 0);
};
const contrast = (a: number[], b: number[]) => {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((light ?? 0) + 0.05) / ((dark ?? 0) + 0.05);
};

test("text over the animated backgrounds keeps WCAG AA contrast", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "pixel sampling runs once, in Chromium");
  test.slow();
  for (const width of [390, 1440]) {
    await open(page, "en", width);
    await page.addStyleTag({ content: "header:not(section header) { visibility: hidden; }" });
    // Every lazy image in place, so text over screenshots and photos is sampled correctly.
    await page.evaluate(async () => {
      for (const image of document.images) image.loading = "eager";
      await Promise.all([...document.images].map((image) => image.decode().catch(() => undefined)));
    });

    const texts = await page.evaluate(() => {
      const parse = (color: string) => (color.match(/[\d.]+/g) ?? []).map(Number);
      return [
        ...document.querySelectorAll("main :is(p, span, a, li, dt, dd, h2, h3, strong, cite)"),
      ]
        .filter((element) => {
          const style = getComputedStyle(element);
          const box = element.getBoundingClientRect();
          const ownText = [...element.childNodes].some(
            (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
          );
          return (
            ownText &&
            box.width > 4 &&
            box.height > 4 &&
            style.visibility === "visible" &&
            Number(style.opacity) > 0.5 &&
            !element.closest('[aria-hidden="true"]') &&
            // Text that is part of an illustration (a described image) is exempt, and
            // marquee items pass under its edge fades by design.
            !element.closest('[role="img"], section[aria-label]') &&
            // Gradient-filled text has no single color to compare.
            style.webkitTextFillColor !== "rgba(0, 0, 0, 0)"
          );
        })
        .map((element) => {
          const box = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          const size = parseFloat(style.fontSize);
          return {
            label: element.textContent.trim().slice(0, 40),
            color: parse(style.color),
            large: size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700),
            x: box.left,
            y: box.top + window.scrollY,
            width: box.width,
            height: box.height,
          };
        });
    });

    const png = PNG.sync.read(await page.screenshot({ fullPage: true }));
    const pixel = (x: number, y: number) => {
      const index = (Math.round(y) * png.width + Math.round(x)) * 4;
      return [png.data[index] ?? 0, png.data[index + 1] ?? 0, png.data[index + 2] ?? 0];
    };

    const failures: string[] = [];
    for (const text of texts) {
      const [r = 0, g = 0, b = 0, alpha = 1] = text.color;
      // Sample a grid inside the text box: glyphs cover a minority of it, so the pixels
      // that contrast most with the text color are the background behind it.
      const samples: number[][] = [];
      for (let ix = 0; ix <= 16; ix++) {
        for (let iy = 0; iy <= 8; iy++) {
          const x = text.x + (text.width * ix) / 16;
          const y = text.y + (text.height * iy) / 8;
          if (x >= 0 && y >= 0 && x < png.width && y < png.height) samples.push(pixel(x, y));
        }
      }
      const ratios = samples
        .map((background) => {
          const blended = [r, g, b].map(
            (channel, i) => channel * alpha + (background[i] ?? 0) * (1 - alpha),
          );
          return contrast(blended, background);
        })
        .sort((x, y) => x - y);
      // The 60th percentile skips glyph pixels yet still catches a light patch of glow.
      const worst = ratios[Math.floor(ratios.length * 0.6)] ?? 21;
      const minimum = text.large ? 3 : 4.5;
      if (worst < minimum)
        failures.push(
          `${String(width)}px "${text.label}": ${worst.toFixed(2)} < ${String(minimum)}`,
        );
    }
    expect(failures).toEqual([]);
  }
});
