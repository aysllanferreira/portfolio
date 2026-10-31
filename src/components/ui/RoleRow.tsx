// Pencil: o4E5Y Role Row
import { cn } from "@/lib/cn";

import { Flag, type CountryCode } from "./Flag";
import { Stat } from "./Stat";

export interface RoleRowProps {
  /** Already formatted for the locale, e.g. "Sep 2025 — Jun 2026". */
  period: string;
  /** The ongoing role shows a live dot and accents its dates and numbers. */
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

/**
 * One role in the experience list: where and when, what was done, and the numbers.
 * Three columns on desktop; stacked, with the numbers in a row, below that.
 */
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
        "flex flex-col gap-4 py-7 shadow-[inset_0_1px_0_var(--color-border)] tablet:gap-5 tablet:py-9 desktop:flex-row desktop:gap-12",
        className,
      )}
    >
      <div className="flex flex-col gap-2.5 desktop:w-[300px] desktop:shrink-0">
        <p
          className={cn(
            "flex items-center gap-2 font-mono text-caption tracking-[0.4px] uppercase",
            current ? "text-accent" : "text-text-muted",
          )}
        >
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

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <h3 className="text-[22px] leading-[29px] font-medium tracking-[-0.8px] text-text-primary tablet:text-[26px] tablet:leading-[34px]">
          {role}
        </h3>
        <p className="text-[16px] leading-[25px] text-text-muted">{summary}</p>
        <ul className="flex flex-col gap-2 pt-1.5">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-[15px] leading-[23px] text-text-primary">
              <span aria-hidden className="font-mono text-[14px] text-accent">
                →
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <dl className="flex gap-7 tablet:gap-12 desktop:w-[220px] desktop:shrink-0 desktop:flex-col desktop:gap-5">
        {numbers.map((number) => (
          <Stat
            key={number.label}
            value={number.value}
            label={number.label}
            valueClassName={cn("text-[28px] tablet:text-[36px]", current && "text-accent")}
            labelClassName="text-[11px]"
          />
        ))}
      </dl>
    </article>
  );
}
