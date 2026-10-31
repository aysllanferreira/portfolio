import { cacheLife } from "next/cache";

import type { YearMonth } from "./format";

/**
 * The current month, for timelines that run up to "now". Cached so pages stay
 * statically prerendered, and refreshed daily so the timeline moves on its own.
 */
export async function currentMonth(): Promise<YearMonth> {
  "use cache";
  cacheLife("days");
  const now = new Date();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  return Promise.resolve(`${String(now.getUTCFullYear())}-${month}` as YearMonth);
}
