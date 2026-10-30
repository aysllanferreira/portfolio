import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { expect, test } from "@playwright/test";

import {
  COLOR_THRESHOLD,
  compareImages,
  MISMATCH_BUDGET,
  passes,
  type Comparison,
} from "./compare";
import { targets } from "./targets";

/*
 * Design-fidelity check: captures each target in deterministic render mode and
 * compares it with the design export. Run with `npm run qa:fidelity`; filter with
 * `-- -g hero`. Results land in .fidelity/report.html (never committed).
 */

const root = resolve(".fidelity");
const results: { name: string; comparison?: Comparison; error?: string }[] = [];

mkdirSync(resolve(root, "actual"), { recursive: true });
mkdirSync(resolve(root, "diff"), { recursive: true });

for (const target of targets) {
  test(target.name, async ({ page }) => {
    const reference = resolve(root, "refs", `${target.name}.png`);
    test.skip(!existsSync(reference), `no design export at .fidelity/refs/${target.name}.png`);

    await page.setViewportSize({ width: target.width, height: target.height ?? 900 });
    await page.goto(target.path);
    await page.waitForLoadState("networkidle");
    // Lazy images in view must finish decoding before the capture.
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        [...document.images].map((image) => {
          image.loading = "eager";
          return image.decode().catch(() => undefined);
        }),
      );
    });

    // Isolated design nodes are exported without the section background behind them;
    // section frames include it, and test render mode freezes the shader to compare it.
    if (target.designBox) {
      await page.addStyleTag({ content: "[data-shader-state] canvas { visibility: hidden; }" });
    }

    // The fixed navbar belongs to the hero frame only; elsewhere it would cover the section.
    if (target.selector !== "#top" && !target.selector.startsWith("[data-navbar")) {
      await page.addStyleTag({ content: "header { visibility: hidden; }" });
    }

    const capture = await page.locator(target.selector).screenshot({
      animations: "disabled",
    });
    writeFileSync(resolve(root, "actual", `${target.name}.png`), capture);

    const comparison = compareImages(capture, readFileSync(reference), target.designBox);
    writeFileSync(resolve(root, "diff", `${target.name}.png`), comparison.diff);
    results.push({ name: target.name, comparison });

    if (target.exception) {
      test.info().annotations.push({ type: "reviewed visually", description: target.exception });
      return;
    }

    expect(
      passes(comparison),
      `${target.name}: ${(comparison.ratio * 100).toFixed(2)}% mismatched (budget ${String(MISMATCH_BUDGET * 100)}% at color threshold ${String(COLOR_THRESHOLD)}), size delta ${JSON.stringify(comparison.sizeDelta)}`,
    ).toBe(true);
  });
}

test.afterAll(() => {
  const rows = results
    .map(({ name, comparison }) => {
      const verdict = comparison && passes(comparison) ? "pass" : "fail";
      const ratio = comparison ? `${(comparison.ratio * 100).toFixed(2)}%` : "n/a";
      const size = comparison ? JSON.stringify(comparison.sizeDelta) : "";
      return `<tr class="${verdict}"><td>${name}</td><td>${verdict}</td><td>${ratio}</td><td>${size}</td>
        <td><img src="actual/${name}.png"></td><td><img src="refs/${name}.png"></td><td><img src="diff/${name}.png"></td></tr>`;
    })
    .join("\n");

  writeFileSync(
    resolve(root, "report.html"),
    `<!doctype html><meta charset="utf-8"><title>Design fidelity</title>
<style>body{font:14px system-ui;background:#0a0a0f;color:#f5f5f7}td{vertical-align:top;padding:6px}
img{max-width:360px}.pass td:nth-child(2){color:#4ade80}.fail td:nth-child(2){color:#f87171}</style>
<table><tr><th>Target</th><th>Verdict</th><th>Mismatch</th><th>Size delta</th><th>Actual</th><th>Design</th><th>Diff</th></tr>${rows}</table>`,
  );
});
