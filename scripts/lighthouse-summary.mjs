// Prints each Lighthouse CI run as a GitHub Actions notice, so scores and key metrics
// are visible on the run summary without downloading the report artifact.
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(".lighthouseci/reports/manifest.json", "utf8"));
for (const run of manifest) {
  const report = JSON.parse(readFileSync(run.jsonPath, "utf8"));
  const metric = (id) => report.audits[id]?.displayValue ?? "n/a";
  const scores = Object.entries(run.summary)
    .map(([category, score]) => `${category} ${String(Math.round(score * 100))}`)
    .join(", ");
  console.log(
    `::notice title=Lighthouse ${new URL(run.url).pathname}::${scores} | LCP ${metric("largest-contentful-paint")} | TBT ${metric("total-blocking-time")} | CLS ${metric("cumulative-layout-shift")}`,
  );
}
