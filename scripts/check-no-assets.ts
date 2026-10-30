import { execFileSync } from "node:child_process";

import { findForbiddenAssets } from "./lib/forbidden-assets";

const tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
  .split("\0")
  .filter(Boolean);

const offenders = findForbiddenAssets(tracked);

if (offenders.length > 0) {
  console.error("Assets must be served from the CDN, not committed. Remove these files:");
  for (const file of offenders) console.error(`  - ${file}`);
  console.error("Add them to scripts/assets/catalog.ts and run `npm run assets:sync` instead.");
  process.exit(1);
}

console.log(`Asset scan passed: ${tracked.length} tracked files, no binary or vector assets.`);
