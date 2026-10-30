import { ArrowDown } from "lucide-react";

import { Stat } from "@/components/ui/Stat";

import { heroStats, type HeroStatKey } from "../content";

interface HeroStatsProps {
  labels: Record<HeroStatKey, string>;
  scrollHint: string;
}

/**
 * The hero's bottom strip: a fading divider, four headline numbers (a row on desktop,
 * a 2×2 grid below) and, on desktop, a hint that scrolls to the work.
 */
export function HeroStats({ labels, scrollHint }: HeroStatsProps) {
  return (
    <div className="flex flex-col gap-7">
      <span
        aria-hidden
        className="h-px w-full bg-linear-to-l from-border-strong to-border-strong/0"
      />
      <div className="flex items-end justify-between">
        <dl className="grid flex-1 grid-cols-2 gap-y-6 tablet:gap-y-7 desktop:flex desktop:flex-none desktop:gap-16">
          {heroStats.map((stat) => (
            <Stat
              key={stat.key}
              value={stat.value}
              label={labels[stat.key]}
              valueClassName="text-[28px] tablet:text-[36px]"
              labelClassName="text-[10px] tablet:text-caption"
            />
          ))}
        </dl>
        <a
          href="#work"
          className="hidden items-center gap-2.5 font-mono text-caption tracking-[0.4px] text-text-muted uppercase transition-colors hover:text-text-primary desktop:flex"
        >
          {scrollHint}
          <ArrowDown aria-hidden className="size-3.5" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}
