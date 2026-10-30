import { cacheLife } from "next/cache";

/**
 * The current year for the copyright line. Cached so pages stay statically
 * prerendered, and refreshed daily so the footer rolls over on its own.
 */
export async function currentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return Promise.resolve(new Date().getFullYear());
}
