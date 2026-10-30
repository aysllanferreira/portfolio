import { languageTags, locales } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { fontVariables } from "@/styles/fonts";

import type { Metadata } from "next";

import "@/styles/globals.css";

/**
 * Every supported locale is prerendered. Any other first segment renders with the
 * default locale and the page raises a 404 (Cache Components forbids `dynamicParams`).
 */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getDictionary();
  return { title: meta.title, description: meta.description };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await resolveLocale();

  return (
    <html lang={languageTags[locale]} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
