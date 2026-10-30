import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { SkipLink } from "@/components/layout/SkipLink";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { currentYear } from "@/lib/current-year";

/** Site chrome around the portfolio: skip link, sticky navigation, main content, footer. */
export default async function SiteLayout({ children }: LayoutProps<"/[lang]">) {
  const [dictionary, locale, year] = await Promise.all([
    getDictionary(),
    resolveLocale(),
    currentYear(),
  ]);

  return (
    <>
      <SkipLink label={dictionary.a11y.skipToContent} />
      <Navbar locale={locale} copy={dictionary} />
      <main id="content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer copy={dictionary} year={year} />
    </>
  );
}
