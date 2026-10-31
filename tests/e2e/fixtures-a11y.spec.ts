import AxeBuilder from "@axe-core/playwright";

import { expect, test } from "../support/playwright";

/** Every component fixture in the QA harness must pass axe with no serious or critical issues. */
const fixtures = [
  "effects",
  "button-primary",
  "button-secondary",
  "button-light",
  "button-icon",
  "eyebrow",
  "tag",
  "tag-accent",
  "flag",
  "status",
  "stat",
  "af-mark",
  "tech-chip",
  "link-row",
  "project-card",
  "spotlight-card",
  "core-tile",
  "role-row",
];

for (const fixture of fixtures) {
  test(`fixture ${fixture} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(`/en/qa/${fixture}`);
    const { violations } = await new AxeBuilder({ page })
      .include('[data-testid="fixture"]')
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();

    const serious = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(
      serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`),
    ).toEqual([]);
  });
}
