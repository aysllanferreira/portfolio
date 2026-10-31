import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";

/*
 * First-load JavaScript budget: sums the gzipped size of every script the prerendered
 * page references, the same bytes a first visit downloads before the page is
 * interactive. Run after `next build`; fails when the total exceeds the budget.
 *
 *   tsx scripts/check-js-budget.ts [--budget-kb 150] [--page en]
 */

const args = process.argv.slice(2);
const option = (name: string, fallback: string) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? (args[index + 1] ?? fallback) : fallback;
};

// React and the Next.js runtime alone are ~115 KB; the budget leaves ~35 KB for the app.
const budgetKb = Number(option("budget-kb", "150"));
const page = option("page", "en");
const nextDir = resolve(process.cwd(), ".next");

export function firstLoadScripts(html: string): string[] {
  // Legacy `nomodule` polyfills are skipped by every browser the site supports.
  const sources = [
    ...html.matchAll(/<script(?![^>]*noModule)[^>]+src="(\/_next\/static\/[^"]+\.js)"/g),
  ].map((match) => match[1] ?? "");
  return [...new Set(sources)];
}

function main() {
  const html = readFileSync(resolve(nextDir, "server/app", `${page}.html`), "utf8");
  const scripts = firstLoadScripts(html);
  if (scripts.length === 0) throw new Error(`No scripts found in the prerendered /${page}`);

  const sizes = scripts.map((src) => {
    const file = resolve(nextDir, src.replace(/^\/_next\//, ""));
    return { src, gzip: gzipSync(readFileSync(file), { level: 9 }).length };
  });
  const totalKb = sizes.reduce((sum, { gzip }) => sum + gzip, 0) / 1024;

  for (const { src, gzip } of sizes.sort((a, b) => b.gzip - a.gzip)) {
    console.log(`${(gzip / 1024).toFixed(1).padStart(7)} KB  ${src}`);
  }
  console.log(
    `First-load JS for /${page}: ${totalKb.toFixed(1)} KB gzipped (budget ${String(budgetKb)} KB)`,
  );
  if (totalKb > budgetKb) {
    console.error("First-load JS is over budget.");
    process.exitCode = 1;
  }
}

main();
