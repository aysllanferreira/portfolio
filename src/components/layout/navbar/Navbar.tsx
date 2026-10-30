// Pencil: clOdA Navbar · m69dM Navbar/Compact · rJNNt Navbar/Mobile
import { Button } from "@/components/ui/Button";
import { Flag } from "@/components/ui/Flag";
import type { CountryCode } from "@/components/ui/Flag";
import { Status } from "@/components/ui/Status";
import { languageNames, locales, type Locale } from "@/i18n/config";
import { interpolate } from "@/i18n/interpolate";
import type { Dictionary } from "@/i18n/types";
import { navSectionIds } from "@/lib/sections";

import { Container } from "../Container";
import { HeaderShell } from "./HeaderShell";
import { LanguageMenu } from "./LanguageMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LinksPill } from "./LinksPill";
import { MobileMenu } from "./MobileMenu";
import { Monogram } from "./Monogram";

import type { LanguageOption } from "./language";

const flagOf: Record<Locale, CountryCode> = { en: "us", pt: "br", es: "es" };

interface NavbarProps {
  locale: Locale;
  copy: Pick<Dictionary, "nav" | "brand">;
}

/**
 * The site header. Exactly one variant is visible per layout range: the full navbar
 * on desktop, the compact one with a menu button on tablet, and the mobile one.
 */
export function Navbar({ locale, copy }: NavbarProps) {
  const { nav, brand } = copy;
  const links = navSectionIds.map((id) => ({ id, label: nav.links[id] }));
  const languages: LanguageOption[] = locales.map((target) => ({
    locale: target,
    code: target.toUpperCase(),
    name: languageNames[target],
    flag: <Flag country={flagOf[target]} shape="round" />,
  }));

  const brandLink = (
    <a href="#top" aria-label={brand.homeLabel} className="flex items-center gap-3">
      <Monogram size="md" />
      <span className="flex flex-col gap-[3px]">
        <span className="text-body font-semibold text-text-primary">{brand.name}</span>
        <Status>{nav.availability}</Status>
      </span>
    </a>
  );

  const hire = (
    <Button variant="light" href="#contact">
      {nav.hire}
    </Button>
  );

  const switcher = (
    <LanguageSwitcher
      label={interpolate(nav.language.current, { language: languageNames[locale] })}
      current={locale}
      options={languages}
    />
  );

  const menu = (
    <MobileMenu
      labels={{ ...nav.menu, language: nav.language.label }}
      links={links}
      brand={
        <span className="flex items-center gap-2.5 tablet:gap-3">
          <Monogram size="sm" className="tablet:size-10 tablet:rounded-[12px]" />
          <span className="text-body font-semibold">
            <span className="tablet:hidden">{brand.shortName}</span>
            <span className="hidden tablet:inline">{brand.name}</span>
          </span>
        </span>
      }
      languageSwitcher={switcher}
      footer={
        <>
          <Status>{nav.availability}</Status>
          {hire}
        </>
      }
    />
  );

  return (
    <HeaderShell>
      <Container>
        {/* Desktop: brand · links pill · languages + hire */}
        <div data-navbar="desktop" className="hidden items-center justify-between desktop:flex">
          <div className="w-[340px]">{brandLink}</div>
          <LinksPill label={nav.label} links={links} />
          <div className="flex w-[340px] items-center justify-end gap-3">
            {switcher}
            {hire}
          </div>
        </div>

        {/* Tablet: brand · languages + hire + menu */}
        <div
          data-navbar="tablet"
          className="hidden items-center justify-between tablet:flex desktop:hidden"
        >
          {brandLink}
          <div className="flex items-center gap-2.5">
            {switcher}
            {hire}
            {menu}
          </div>
        </div>

        {/* Mobile: short brand · language menu + menu */}
        <div data-navbar="mobile" className="flex items-center justify-between tablet:hidden">
          <a href="#top" aria-label={brand.homeLabel} className="flex items-center gap-2.5">
            <Monogram size="sm" />
            <span className="text-body font-semibold text-text-primary">{brand.shortName}</span>
          </a>
          <div className="flex items-center gap-2">
            <LanguageMenu label={nav.language.label} current={locale} options={languages} />
            {menu}
          </div>
        </div>
      </Container>
    </HeaderShell>
  );
}
