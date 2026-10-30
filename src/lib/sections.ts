/**
 * Stable, locale-independent anchors for every page section. Navigation, the
 * language switcher and deep links all rely on these ids.
 */
export const sectionIds = ["work", "projects", "experience", "stack", "about", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];

/** Sections linked from the navbar pill, in display order. */
export const navSectionIds = [
  "work",
  "experience",
  "stack",
  "about",
  "contact",
] as const satisfies readonly SectionId[];

export function isSectionId(value: string): value is SectionId {
  return (sectionIds as readonly string[]).includes(value);
}
