import { languageTags, locales } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { buildJsonLd, buildMetadata } from "@/i18n/metadata";
import { favicon } from "@/lib/assets";
import { env } from "@/lib/env";
import { fontVariables } from "@/styles/fonts";

import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

/**
 * Every supported locale is prerendered. Any other first segment renders with the
 * default locale and the page raises a 404 (Cache Components forbids `dynamicParams`).
 */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const [{ meta }, locale] = await Promise.all([getDictionary(), resolveLocale()]);
  return buildMetadata({ locale, meta, siteUrl: env.NEXT_PUBLIC_SITE_URL, icons: favicon });
}

export const viewport: Viewport = { themeColor: "#0a0a0f", colorScheme: "dark" };

export default async function LocaleLayout({ children }: LayoutProps<"/[lang]">) {
  const [{ meta }, locale] = await Promise.all([getDictionary(), resolveLocale()]);
  // Serialized for a script tag: "<" is escaped so no string can close the element.
  const jsonLd = JSON.stringify(
    buildJsonLd({ locale, meta, siteUrl: env.NEXT_PUBLIC_SITE_URL }),
  ).replace(/</g, "\\u003c");

  return (
    <html lang={languageTags[locale]} className={fontVariables}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </body>
    </html>
  );
}
