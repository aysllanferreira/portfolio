import { defaultLocale, languageTags, locales, type Locale } from "./config";

export interface LocaleAlternates {
  canonical: string;
  /** hreflang -> absolute URL, including `x-default`. */
  languages: Record<string, string>;
}

/**
 * Canonical URL of a page in one locale plus its translations, in the shape Next.js
 * metadata `alternates` expects. Also used for sitemap entries.
 */
export function localeAlternates(siteUrl: string, locale: Locale, path = ""): LocaleAlternates {
  const url = (target: Locale) => `${siteUrl}/${target}${path}`;
  return {
    canonical: url(locale),
    languages: {
      ...Object.fromEntries(locales.map((target) => [languageTags[target], url(target)])),
      "x-default": url(defaultLocale),
    },
  };
}
