import { assetManifest } from "./src/content/assets.generated";
import { iconObjectKey } from "./src/lib/asset-paths";
import { env } from "./src/lib/env"; // validates the environment: a bad value fails the build here
import { securityHeaders } from "./src/lib/security-headers";

import type { NextConfig } from "next";

const faviconUrl = `${env.NEXT_PUBLIC_ASSETS_URL}/${iconObjectKey("favicon", assetManifest.favicon.hash, 32)}`;

const nextConfig: NextConfig = {
  // Do not advertise the framework in response headers.
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    globalNotFound: true,
  },
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
  headers() {
    return Promise.resolve([
      {
        source: "/:path*",
        headers: securityHeaders({
          assetsOrigin: new URL(env.NEXT_PUBLIC_ASSETS_URL).origin,
          isDevelopment: process.env.NODE_ENV === "development",
          indexable: env.NEXT_PUBLIC_SITE_ENV === "production",
        }),
      },
    ]);
  },
};

export default nextConfig;
