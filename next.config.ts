import { assetManifest } from "./src/content/assets.generated";
import { iconObjectKey } from "./src/lib/asset-paths";
import { env } from "./src/lib/env"; // validates the environment: a bad value fails the build here

import type { NextConfig } from "next";

const faviconUrl = `${env.NEXT_PUBLIC_ASSETS_URL}/${iconObjectKey("favicon", assetManifest.favicon.hash, 32)}`;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  redirects() {
    return Promise.resolve([
      // Browsers request /favicon.ico regardless of markup; the file lives on the CDN.
      { source: "/favicon.ico", destination: faviconUrl, permanent: true },
    ]);
  },
};

export default nextConfig;
