import { env, isProductionSite } from "@/lib/env";

import type { MetadataRoute } from "next";

/**
 * Crawlers may index only the production site. Every other environment (previews,
 * the site while under construction) asks them to stay out, matching the
 * `X-Robots-Tag: noindex` header those environments send.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
