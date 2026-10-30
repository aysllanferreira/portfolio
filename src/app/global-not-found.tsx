import { NotFoundView } from "@/components/layout/NotFoundView";
import { defaultLocale, languageTags } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { fontVariables } from "@/styles/fonts";

import type { Metadata } from "next";

import "@/styles/globals.css";

/*
 * 404 for URLs outside every route (e.g. an unsupported locale like /fr). It bypasses
 * the [lang] root layout, so it renders its own document in the default locale.
 */
const dictionary = dictionaries[defaultLocale];

export const metadata: Metadata = {
  title: `${dictionary.notFound.title} · ${dictionary.brand.name}`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang={languageTags[defaultLocale]} className={fontVariables}>
      <body>
        <NotFoundView copy={dictionary.notFound} locale={defaultLocale} />
      </body>
    </html>
  );
}
