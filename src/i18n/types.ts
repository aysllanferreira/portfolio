import type { en } from "./dictionaries/en";

/**
 * The shape every translation must match. English is the source of truth;
 * `pt` and `es` are declared with `satisfies Dictionary`, so a missing or extra
 * key is a compile error rather than a blank string in production.
 */
export type Dictionary = typeof en;

/**
 * A headline with one serif accent word. Each language places its accent word
 * naturally, so the three parts are translated rather than a single string.
 */
export interface AccentText {
  before: string;
  accent: string;
  after: string;
}
