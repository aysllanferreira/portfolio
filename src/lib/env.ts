import { parseEnv, type Env } from "./env-schema";

// Each variable is referenced literally so Next.js can inline it into client bundles.
export const env: Env = parseEnv({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_ASSETS_URL: process.env.NEXT_PUBLIC_ASSETS_URL,
  NEXT_PUBLIC_SITE_ENV: process.env.NEXT_PUBLIC_SITE_ENV,
  NEXT_PUBLIC_RENDER_MODE: process.env.NEXT_PUBLIC_RENDER_MODE,
});

export const isProductionSite = env.NEXT_PUBLIC_SITE_ENV === "production";
export { isTestRender } from "./render-mode";
