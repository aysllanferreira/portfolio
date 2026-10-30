import { notFound } from "next/navigation";
import { lang } from "next/root-params";

import { defaultLocale, hasLocale, type Locale } from "./config";
import { dictionaries } from "./dictionaries";

import type { Dictionary } from "./types";

/*
 * The active locale comes from the `[lang]` root segment via next/root-params, so
 * Server Components read it directly instead of drilling it through props. The
 * import also makes this module fail the build if a Client Component imports it.
 */

/**
 * The requested locale, or a 404 when the segment is not a supported locale.
 * Pages call this so an unknown locale renders the localized not-found boundary.
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

/**
 * The requested locale, falling back to the default for unknown segments. The root
 * layout and the not-found boundary use this so they can always render a document.
 */
export async function resolveLocale(): Promise<Locale> {
  const value = await lang();
  return hasLocale(value) ? value : defaultLocale;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await resolveLocale()];
}
