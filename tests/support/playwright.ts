import { createHash } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { test as base, type Route } from "@playwright/test";

/*
 * Every browser test starts with an empty HTTP cache, so without help each page load
 * would download every image from the production CDN again, across three browsers and
 * every CI run. Asset URLs are content-hashed and never change, so the first response
 * for a URL is kept on disk and replayed from then on: a full run fetches each asset
 * at most once, and a warm cache (CI restores it between runs) fetches nothing.
 */

const assetsOrigin = new URL(process.env.NEXT_PUBLIC_ASSETS_URL ?? "https://cdn.aysllan.com")
  .origin;
const cacheDir = resolve(process.env.E2E_CDN_CACHE ?? "node_modules/.cache/e2e-cdn");

interface CachedHeaders {
  status: number;
  headers: Record<string, string>;
}

async function replayOrFetch(route: Route) {
  const key = createHash("sha256").update(route.request().url()).digest("hex");
  const bodyPath = resolve(cacheDir, `${key}.body`);
  const metaPath = resolve(cacheDir, `${key}.json`);

  try {
    const [body, meta] = await Promise.all([readFile(bodyPath), readFile(metaPath, "utf8")]);
    const { status, headers } = JSON.parse(meta) as CachedHeaders;
    await route.fulfill({ status, headers, body });
    return;
  } catch {
    // Not cached yet: fetch it once below.
  }

  const response = await route.fetch();
  const body = await response.body();
  // Only successful responses are immutable; anything else is fetched again next time.
  if (response.ok()) {
    const meta: CachedHeaders = { status: response.status(), headers: response.headers() };
    await Promise.all([store(bodyPath, body), store(metaPath, JSON.stringify(meta))]);
  }
  await route.fulfill({ response, body });
}

/**
 * Writes beside the target, then renames into place, so readers never see half a file.
 * Parallel workers may cache the same URL at once, and Windows refuses to rename over
 * a file another process has open; the copy that landed first is identical, so a lost
 * race is simply dropped.
 */
async function store(path: string, data: Buffer | string) {
  const temporary = `${path}.${String(process.pid)}.${String(Date.now())}.tmp`;
  try {
    await mkdir(cacheDir, { recursive: true });
    await writeFile(temporary, data);
    await rename(temporary, path);
  } catch {
    await rm(temporary, { force: true });
  }
}

export const test = base.extend({
  context: async ({ context }, provide) => {
    await context.route(`${assetsOrigin}/**`, replayOrFetch);
    await provide(context);
  },
});

export { expect } from "@playwright/test";
