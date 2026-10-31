import type { CountryCode } from "@/components/ui/Flag";
import type { YearMonth } from "@/lib/format";

/*
 * Facts about each role, shared by all locales: dates, place and engagement type.
 * Titles, summaries, highlights and numbers live in the `experience` dictionary
 * namespace, keyed by these slugs, newest role first.
 */

export type Engagement = "fullTime" | "contract" | "partTime";

export interface RoleFacts {
  company: string;
  country: CountryCode;
  engagement: Engagement;
  start: YearMonth;
  /** Omitted while the role is ongoing. */
  end?: YearMonth;
}

export const roles = {
  "pinely-senior": {
    company: "Pinely International",
    country: "cz",
    engagement: "fullTime",
    start: "2024-08",
  },
  vituax: {
    company: "Vituax",
    country: "br",
    engagement: "contract",
    start: "2025-09",
    end: "2026-06",
  },
  intellux: {
    company: "Intellux",
    country: "br",
    engagement: "contract",
    start: "2025-05",
    end: "2025-10",
  },
  "pinely-full-stack": {
    company: "Pinely International",
    country: "cz",
    engagement: "fullTime",
    start: "2023-02",
    end: "2024-08",
  },
  trybe: {
    company: "Trybe",
    country: "br",
    engagement: "partTime",
    start: "2023-05",
    end: "2023-06",
  },
} as const satisfies Record<string, RoleFacts>;

export type RoleSlug = keyof typeof roles;

export const roleSlugs = Object.keys(roles) as RoleSlug[];

/**
 * The month the design's timeline was drawn at. Test renders pin "now" to it, so
 * the timeline stays comparable with the design; real visitors see the actual month.
 */
export const designedNow: YearMonth = "2026-10";

/**
 * From a LinkedIn recommendation. The quote is kept in the words it was written in,
 * so every language shows it in English, marked with `lang="en"`.
 */
export const testimonial = {
  name: "Konstantin Vasilev",
  photo: "people/konstantin",
  /** The design zooms into the photo; see SpotlightCard for how frames work. */
  photoFrame: { zoom: 1.6129, x: 0.21, y: 0.09 },
  quote: "Aysllan's ability to balance technical skills with interpersonal care is remarkable.",
  more: "“His continuous self-education and application of new knowledge are truly impressive.”",
} as const;

/** Teaching and community facts in the design's order; numbers worth noticing are accented. */
export const teachingItems = [
  { key: "taught", accent: true },
  { key: "students", accent: true },
  { key: "talks", accent: false },
  { key: "ambassador", accent: false },
  { key: "recommendations", accent: false },
] as const;
