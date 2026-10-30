import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import { pt } from "./dictionaries/pt";

import type { Locale } from "./config";
import type { Dictionary } from "./types";

/** All translations, keyed by locale. Server-only: never imported by client components. */
export const dictionaries: Record<Locale, Dictionary> = { en, pt, es };
