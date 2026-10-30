import { defineConfig, devices } from "@playwright/test";

import baseConfig from "./playwright.config";

/**
 * Design-fidelity run: Chromium only, one worker for stable rendering. Uses the same
 * production build and deterministic render mode as the end-to-end suite.
 */
export default defineConfig({
  ...baseConfig,
  testDir: "./tests/fidelity",
  testMatch: "fidelity.spec.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  projects: [
    {
      name: "fidelity",
      use: { ...devices["Desktop Chrome"], deviceScaleFactor: 1 },
    },
  ],
});
