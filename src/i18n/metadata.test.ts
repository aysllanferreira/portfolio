import { describe, expect, it } from "vitest";

import { site } from "@/content/site";

import { locales } from "./config";
import { dictionaries } from "./dictionaries";
import { buildJsonLd, buildMetadata } from "./metadata";

const siteUrl = "https://aysllan.com";
const icons = {
  svg: "https://cdn/x.svg",
  png: (size: number) => `https://cdn/x-${String(size)}.png`,
};

describe("buildMetadata", () => {
  it.each(locales)("%s: canonical, hreflang alternates and Open Graph locale", (locale) => {
    const metadata = buildMetadata({ locale, siteUrl, meta: dictionaries[locale].meta, icons });
    expect(metadata.alternates?.canonical).toBe(`${siteUrl}/${locale}`);
    expect(metadata.alternates?.languages).toEqual({
      en: `${siteUrl}/en`,
      "pt-BR": `${siteUrl}/pt`,
      es: `${siteUrl}/es`,
      "x-default": `${siteUrl}/en`,
    });
    expect(metadata.openGraph).toMatchObject({
      url: `${siteUrl}/${locale}`,
      locale: { en: "en_US", pt: "pt_BR", es: "es_ES" }[locale],
    });
    expect((metadata.openGraph as { alternateLocale: string[] }).alternateLocale).toHaveLength(2);
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it.each(locales)("%s: description fits search snippets", (locale) => {
    expect(dictionaries[locale].meta.description.length).toBeLessThanOrEqual(160);
  });

  it("points icons at the CDN", () => {
    const metadata = buildMetadata({ locale: "en", siteUrl, meta: dictionaries.en.meta, icons });
    expect(JSON.stringify(metadata.icons)).toContain("https://cdn/x.svg");
    expect(JSON.stringify(metadata.icons)).toContain("x-180.png");
  });
});

describe("buildJsonLd", () => {
  it("describes the person and the site, linked by id", () => {
    const [person, website] = buildJsonLd({ locale: "pt", siteUrl, meta: dictionaries.pt.meta });
    expect(person).toMatchObject({
      "@id": `${siteUrl}/#person`,
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.name,
      jobTitle: "Engenheiro de Software Sênior",
      sameAs: [site.linkedin.url, site.github.url],
    });
    expect(website).toMatchObject({
      "@type": "WebSite",
      url: `${siteUrl}/pt`,
      inLanguage: "pt-BR",
      author: { "@id": `${siteUrl}/#person` },
    });
  });
});
