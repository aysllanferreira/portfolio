import { defaultLocale, hasLocale, type Locale } from "./config";

interface LanguagePreference {
  language: string;
  quality: number;
  order: number;
}

/** Parses an Accept-Language header into primary language subtags by preference. */
export function parseAcceptLanguage(header: string): LanguagePreference[] {
  return header
    .split(",")
    .map((part, order): LanguagePreference | undefined => {
      const [range = "", ...params] = part.trim().split(";");
      const language = range.trim().split(/[-_]/)[0]?.toLowerCase() ?? "";
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const quality = q ? Number(q.slice(2)) : 1;
      if (!language || language === "*" || !Number.isFinite(quality) || quality <= 0)
        return undefined;
      return { language, quality, order };
    })
    .filter((preference) => preference !== undefined)
    .sort((a, b) => b.quality - a.quality || a.order - b.order);
}

/** The supported locale the visitor prefers most, or the default locale. */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const match = parseAcceptLanguage(acceptLanguage).find(({ language }) => hasLocale(language));
  return match && hasLocale(match.language) ? match.language : defaultLocale;
}
