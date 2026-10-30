import type { Locale } from "@/i18n/config";

import type { ReactNode } from "react";

/** One entry of a language switcher. The flag is rendered on the server and passed in. */
export interface LanguageOption {
  locale: Locale;
  /** Visible code, e.g. "PT". */
  code: string;
  /** The language's own name, used as its accessible name ("Português"). */
  name: string;
  flag: ReactNode;
}

/** Same page in another language, keeping the reader on the section they were viewing. */
export function localeHref(locale: Locale, section: string): string {
  return `/${locale}#${section}`;
}
