import { localeAlternates } from "@/i18n/alternates";
import { locales } from "@/i18n/config";
import { env } from "@/lib/env";

import type { MetadataRoute } from "next";

/** One entry per language, each listing its translations as alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => {
    const { canonical, languages } = localeAlternates(env.NEXT_PUBLIC_SITE_URL, locale);
    return { url: canonical, changeFrequency: "monthly", priority: 1, alternates: { languages } };
  });
}
