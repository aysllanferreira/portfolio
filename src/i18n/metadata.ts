import { site } from "@/content/site";

import { localeAlternates } from "./alternates";
import { languageTags, locales, ogLocales, type Locale } from "./config";

import type { Dictionary } from "./types";
import type { Metadata } from "next";
import type { Person, WebSite, WithContext } from "schema-dts";

interface MetadataInput {
  locale: Locale;
  siteUrl: string;
  meta: Dictionary["meta"];
  /** CDN favicon URLs: the vector icon and PNG sizes for platforms that need them. */
  icons: { svg: string; png: (size: 32 | 180 | 192 | 512) => string };
}

/**
 * The document head for one locale: localized title and description, canonical and
 * hreflang alternates (with x-default), Open Graph and Twitter cards, and CDN icons.
 * The Open Graph image itself comes from the `opengraph-image` route next to the layout.
 */
export function buildMetadata({ locale, siteUrl, meta, icons }: MetadataInput): Metadata {
  const alternates = localeAlternates(siteUrl, locale);

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: siteUrl }],
    alternates,
    openGraph: {
      type: "profile",
      firstName: "Aysllan",
      lastName: "Ferreira",
      url: alternates.canonical,
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((other) => other !== locale).map((other) => ogLocales[other]),
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    icons: {
      icon: [
        { url: icons.svg, type: "image/svg+xml" },
        { url: icons.png(32), sizes: "32x32", type: "image/png" },
        { url: icons.png(192), sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: icons.png(180), sizes: "180x180" }],
    },
  };
}

/** Structured data for search engines: who the site is about, and the site itself. */
export function buildJsonLd({
  locale,
  siteUrl,
  meta,
}: Omit<MetadataInput, "icons">): [WithContext<Person>, WithContext<WebSite>] {
  const url = localeAlternates(siteUrl, locale).canonical;
  const person: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: site.name,
    url,
    email: `mailto:${site.email}`,
    jobTitle: meta.jobTitle,
    description: meta.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.country.toUpperCase(),
    },
    knowsLanguage: ["pt-BR", "en", "es"],
    sameAs: [site.linkedin.url, site.github.url],
  };
  const website: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    url,
    inLanguage: languageTags[locale],
    author: { "@id": `${siteUrl}/#person` },
  };
  return [person, website];
}
