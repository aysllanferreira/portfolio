import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/** Every built section passes axe at mobile and desktop widths. */
const sections = ["#top", "#work", "#projects", "#experience", "#stack"];

for (const width of [390, 1440]) {
  for (const section of sections) {
    test(`${section} has no serious accessibility violations at ${String(width)}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/en");
      const { violations } = await new AxeBuilder({ page }).include(section).analyze();
      expect(
        violations
          .filter((v) => ["serious", "critical"].includes(v.impact ?? ""))
          .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`),
      ).toEqual([]);
    });
  }
}
