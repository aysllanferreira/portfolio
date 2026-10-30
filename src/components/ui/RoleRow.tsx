// Pencil: o4E5Y Role Row
import { cn } from "@/lib/cn";

import { Flag, type CountryCode } from "./Flag";
import { Stat } from "./Stat";

export interface RoleRowProps {
  /** Already formatted for the locale, e.g. "Sep 2025 — Jun 2026". */
  period: string;
  /** Ongoing roles show a live dot. */
  current: boolean;
  country: CountryCode;
  company: string;
  /** "Contract · Remote" */
  engagement: string;
  role: string;
  summary: string;
  highlights: readonly string[];
  numbers: readonly { value: string; label: string }[];
  className?: string;
}

/** One role in the experience list: where and when, what was done, and the numbers. */
export function RoleRow({
  period,
  current,
  country,
  company,
  engagement,
  role,
  summary,
  highlights,
  numbers,
  className,
}: RoleRowProps) {
  return (
    <article
      className={cn(
        "grid gap-6 py-9 shadow-[inset_0_1px_0_var(--color-border)] tablet:grid-cols-[minmax(0,240px)_1fr] tablet:gap-x-10 desktop:grid-cols-[300px_1fr_220px] desktop:gap-12",
        className,
      )}
    >
      <div className="flex flex-col gap-2.5">
        <p className="flex items-center gap-2 font-mono text-caption tracking-[0.4px] text-text-muted uppercase">
          {current && (
            <span
              aria-hidden
              className="size-[7px] shrink-0 rounded-full bg-accent motion-safe:animate-pulse"
            />
          )}
          {period}
        </p>
        <p className="flex items-center gap-2.5 text-[17px] font-medium text-text-primary">
          <Flag country={country} shape="sm" />
          {company}
        </p>
        <p className="font-mono text-[11px] tracking-[0.4px] text-text-faint uppercase">
          {engagement}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-[26px] font-medium tracking-[-0.8px] text-text-primary">{role}</h3>
        <p className="text-[16px] leading-[1.55] text-text-muted">{summary}</p>
        <ul className="flex flex-col gap-2 pt-1.5">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-[15px] leading-normal text-text-primary">
              <span aria-hidden className="font-mono text-[14px] text-accent">
                →
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <dl className="flex flex-wrap gap-5 tablet:col-start-2 desktop:col-start-auto desktop:flex-col">
        {numbers.map((number) => (
          <Stat
            key={number.label}
            value={number.value}
            label={number.label}
            className="gap-1"
            labelClassName="text-[11px] tracking-[0.4px]"
          />
        ))}
      </dl>
    </article>
  );
}
