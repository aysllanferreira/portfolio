/** Supported locales, as they appear in URLs (`/en`, `/pt`, `/es`). */
export const locales = ["en", "pt", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** BCP 47 tags for `<html lang>`, `hreflang` and `Intl` formatting. */
export const languageTags: Record<Locale, string> = { en: "en", pt: "pt-BR", es: "es" };

/** Open Graph locale codes. */
export const ogLocales: Record<Locale, string> = { en: "en_US", pt: "pt_BR", es: "es_ES" };

/** Each language's own name, used as the switcher's accessible label. */
export const languageNames: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
