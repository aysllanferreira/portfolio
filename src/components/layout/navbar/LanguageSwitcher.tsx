"use client";

import { clsx as cn } from "clsx";

import type { Locale } from "@/i18n/config";

import { useActiveSection } from "../active-section";
import { localeHref, type LanguageOption } from "./language";

interface LanguageSwitcherProps {
  label: string;
  current: Locale;
  options: readonly LanguageOption[];
  className?: string;
}

/** Flag-and-code pills for each language; switching keeps the current section in view. */
export function LanguageSwitcher({ label, current, options, className }: LanguageSwitcherProps) {
  const section = useActiveSection();

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center gap-0.5 rounded-pill bg-[#14141b99] p-1 ring-1 ring-text-primary/10 backdrop-blur-[20px] ring-inset">
        {options.map((option) => {
          const active = option.locale === current;
          return (
            <li key={option.locale}>
              <a
                href={localeHref(option.locale, section)}
                hrefLang={option.locale}
                lang={option.locale}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-pill px-2.5 py-[7px] font-mono text-[11px] font-semibold tracking-[0.4px] transition-colors",
                  active
                    ? "bg-[#a493ff26] text-text-primary ring-1 ring-[#a493ff66] ring-inset"
                    : "text-text-faint hover:text-text-primary",
                )}
              >
                {option.flag}
                {option.code}
                <span className="sr-only"> {option.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
