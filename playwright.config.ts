import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORT ?? 3100);
const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${port}`;

/**
 * End-to-end tests run against a production build in deterministic render mode
 * (shaders frozen), so results are stable across runs and machines.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  ...(process.env.CI ? { workers: 2 } : {}),
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        // Headless Firefox disables WebGL without a GPU; ask for software rendering.
        launchOptions: { firefoxUserPrefs: { "webgl.force-enabled": true } },
      },
    },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  ...(process.env.E2E_BASE_URL
    ? {}
    : {
        webServer: {
          // Clears stale server output first: OneDrive can lock it on Windows checkouts.
          command: `npm run e2e:serve -- --port ${port}`,
          url: baseURL,
          timeout: 300_000,
          reuseExistingServer: !process.env.CI,
          env: {
            NEXT_PUBLIC_SITE_URL: "https://aysllan.com",
            NEXT_PUBLIC_ASSETS_URL: "https://cdn.aysllan.com",
            NEXT_PUBLIC_SITE_ENV: "preview",
            NEXT_PUBLIC_RENDER_MODE: "test",
          },
        },
      }),
});
