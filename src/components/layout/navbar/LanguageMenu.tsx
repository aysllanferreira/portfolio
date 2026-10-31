"use client";

import { clsx as cn } from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { useId } from "react";

import type { Locale } from "@/i18n/config";

import { useActiveSection } from "../active-section";
import { localeHref, type LanguageOption } from "./language";

interface LanguageMenuProps {
  label: string;
  current: Locale;
  options: readonly LanguageOption[];
}

/**
 * The compact language control of the mobile navbar (designed in frame lgoaF):
 * a pill showing the current language that opens a popover with all three. Built
 * on the native Popover API, so Escape, outside clicks and focus return just work.
 */
export function LanguageMenu({ label, current, options }: LanguageMenuProps) {
  const section = useActiveSection();
  const popoverId = useId();
  const active = options.find((option) => option.locale === current) ?? options[0];

  return (
    <>
      <button
        type="button"
        popoverTarget={popoverId}
        className="flex items-center gap-1.5 rounded-pill bg-[#14141b99] px-3 py-2 font-mono text-[11px] font-semibold tracking-[0.4px] text-text-primary ring-1 ring-text-primary/10 backdrop-blur-[20px] ring-inset"
      >
        <span className="sr-only">{`${label}: ${active?.name ?? ""}, `}</span>
        {active?.flag}
        {active?.code}
        <ChevronDown aria-hidden className="size-3.5 text-text-muted" strokeWidth={2} />
      </button>
      <div
        id={popoverId}
        popover="auto"
        className="glass fixed inset-auto top-[68px] right-5 m-0 w-[200px] rounded-md border-0 bg-[#14141be6] p-1.5 text-text-primary shadow-[0_20px_40px_#00000080] [--glass-edge-stop:70%] [--glass-edge:#a493ff44]"
      >
        <ul aria-label={label} className="flex flex-col gap-0.5">
          {options.map((option) => {
            const isCurrent = option.locale === current;
            return (
              <li key={option.locale}>
                <a
                  href={localeHref(option.locale, section)}
                  hrefLang={option.locale}
                  lang={option.locale}
                  aria-current={isCurrent ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 transition-colors",
                    isCurrent ? "bg-[#a493ff26]" : "hover:bg-text-primary/5",
                  )}
                >
                  {option.flag}
                  <span
                    className={cn(
                      "flex-1 text-[14px] font-medium",
                      isCurrent ? "text-text-primary" : "text-text-muted",
                    )}
                  >
                    {option.name}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[11px] font-semibold tracking-[0.4px]",
                      isCurrent ? "text-accent" : "text-text-faint",
                    )}
                  >
                    {option.code}
                  </span>
                  {isCurrent && (
                    <Check aria-hidden className="size-3.5 text-accent" strokeWidth={2.4} />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
