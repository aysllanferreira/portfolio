import { cn } from "@/lib/cn";

import { engagementOrder, engagementStyles } from "./engagement";

import type { Engagement } from "../content";

interface EngagementLegendProps {
  label: string;
  names: Record<Engagement, string>;
}

/** What each bar color in the timeline means. */
export function EngagementLegend({ label, names }: EngagementLegendProps) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-3.5 tablet:gap-5">
      {engagementOrder.map((engagement) => (
        <li
          key={engagement}
          className="flex items-center gap-2 font-mono text-[11px] tracking-[0.5px] text-text-muted uppercase"
        >
          <span
            aria-hidden
            className={cn("h-1.5 w-3.5 rounded-[3px]", engagementStyles[engagement].swatch)}
          />
          {names[engagement]}
        </li>
      ))}
    </ul>
  );
}
