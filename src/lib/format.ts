import { languageTags, type Locale } from "@/i18n/config";

/** A calendar month, e.g. "2025-09". */
export type YearMonth = `${number}-${number}`;

function toDate(month: YearMonth): Date {
  const [year, monthIndex] = month.split("-").map(Number);
  if (!year || !monthIndex || monthIndex < 1 || monthIndex > 12) {
    throw new Error(`Invalid month "${month}", expected YYYY-MM`);
  }
  return new Date(Date.UTC(year, monthIndex - 1, 1));
}

/** "Sep 2025" / "set 2025" / "sept 2025": short month and year in the locale's words. */
export function formatMonthYear(month: YearMonth, locale: Locale): string {
  const parts = new Intl.DateTimeFormat(languageTags[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).formatToParts(toDate(month));

  const name = parts.find((part) => part.type === "month")?.value.replace(/\.$/, "") ?? "";
  const year = parts.find((part) => part.type === "year")?.value ?? "";
  return `${name} ${year}`;
}

/** "Sep 2025 — Jun 2026", or "… — Present" for an ongoing period. */
export function formatMonthRange(
  start: YearMonth,
  end: YearMonth | undefined,
  locale: Locale,
  presentLabel: string,
): string {
  return `${formatMonthYear(start, locale)} — ${end ? formatMonthYear(end, locale) : presentLabel}`;
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(languageTags[locale]).format(value);
}

/** Whole months between two months, used to place items on a timeline axis. */
export function monthsBetween(start: YearMonth, end: YearMonth): number {
  const from = toDate(start);
  const to = toDate(end);
  return (
    (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + (to.getUTCMonth() - from.getUTCMonth())
  );
}

/** "United States" / "Estados Unidos": a country's name in the locale's words. */
export function formatRegion(countryCode: string, locale: Locale): string {
  const code = countryCode.toUpperCase();
  return new Intl.DisplayNames(languageTags[locale], { type: "region" }).of(code) ?? code;
}

/** The month `count` months after (or before, when negative) the given one. */
export function addMonths(month: YearMonth, count: number): YearMonth {
  const date = toDate(month);
  date.setUTCMonth(date.getUTCMonth() + count);
  const year = String(date.getUTCFullYear());
  const monthNumber = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${year}-${monthNumber}` as YearMonth;
}
