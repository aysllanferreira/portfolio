import { Flag } from "@/components/ui/Flag";
import { interpolate } from "@/i18n/interpolate";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";

import { roles, roleSlugs, type RoleFacts, type RoleSlug } from "../content";
import { axisPercent, barGeometry, yearTicks, type Axis } from "../timeline";
import { currentBar, engagementStyles } from "./engagement";

interface TimelineProps {
  axis: Axis;
  copy: Dictionary["experience"];
  /** Localized "Aug 2024 — Present" per role, for the screen-reader list. */
  periods: Record<RoleSlug, string>;
}

const at = (percent: number) => ({ left: `${String(percent)}%` });

/** Year gridlines and the "now" line, repeated behind every row. */
function Gridlines({ axis }: { axis: Axis }) {
  return (
    <>
      {yearTicks(axis).map((tick) => (
        <span
          key={tick.year}
          className="absolute inset-y-0 w-px bg-[#f5f5f70d]"
          style={at(tick.left)}
        />
      ))}
      <span
        className="absolute inset-y-0 w-px bg-[#a493ff55]"
        style={at(axisPercent(axis, axis.now))}
      />
    </>
  );
}

/**
 * Every role as a bar on one shared time axis. The drawing is decorative; the same
 * facts are read out from a visually hidden list, and in full by the role list below.
 */
export function Timeline({ axis, copy, periods }: TimelineProps) {
  const now = axisPercent(axis, axis.now);

  return (
    <div className="glass rounded-lg bg-[#14141bb3] px-3.5 pt-[18px] pb-2.5 shadow-panel [--blur-glass:20px] [--glass-edge-stop:70%] [--glass-edge:#a493ff33] tablet:px-6 tablet:pt-6 tablet:pb-4 desktop:px-8 desktop:pt-7 desktop:pb-5">
      <div aria-hidden>
        <div className="flex items-center pb-3.5 shadow-[inset_0_-1px_0_var(--color-border)] tablet:gap-4 desktop:gap-6">
          <span className="hidden w-[200px] shrink-0 font-mono text-[11px] tracking-[0.5px] text-text-faint uppercase tablet:block desktop:w-[320px]">
            {copy.timeline.axisLabel}
          </span>
          <div className="relative h-4 flex-1 font-mono text-[10px] tracking-[0.5px] uppercase tablet:text-[11px]">
            {yearTicks(axis).map((tick) => (
              <span
                key={tick.year}
                className="absolute top-0 text-text-muted"
                style={at(tick.left)}
              >
                {tick.year}
              </span>
            ))}
            <span className="absolute top-0 -translate-x-1/2 text-accent" style={at(now)}>
              {copy.timeline.now}
            </span>
          </div>
        </div>

        {roleSlugs.map((slug) => {
          const role: RoleFacts = roles[slug];
          const ongoing = role.end === undefined;
          const bar = barGeometry(axis, role.start, role.end);

          return (
            <div
              key={slug}
              className="flex flex-col gap-2.5 py-3 shadow-[inset_0_-1px_0_#1e1e28] last:shadow-none tablet:flex-row tablet:items-center tablet:gap-4 tablet:py-2.5 desktop:gap-6"
            >
              <div className="flex items-center gap-2 tablet:w-[200px] tablet:shrink-0 tablet:gap-3 desktop:w-[320px]">
                <Flag country={role.country} shape="sm" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium whitespace-nowrap text-text-primary tablet:text-[15px]">
                    {role.company}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.5px] whitespace-nowrap text-text-muted uppercase tablet:text-[11px]">
                    {copy.roles[slug].shortTitle}
                  </span>
                </div>
              </div>
              <div className="relative h-5 tablet:h-9 tablet:flex-1">
                <Gridlines axis={axis} />
                <span
                  className={cn(
                    "absolute top-1/2 h-2.5 -translate-y-1/2 rounded-[6px] tablet:h-3",
                    ongoing ? currentBar : engagementStyles[role.engagement].bar,
                  )}
                  style={{ ...at(bar.left), width: `${String(bar.width)}%` }}
                />
                {ongoing && (
                  <span
                    className="absolute top-1/2 size-3.5 -translate-1/2 rounded-full bg-accent shadow-[0_0_0_6px_#a493ff55]"
                    style={at(now)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ul aria-label={copy.timeline.listLabel} className="sr-only">
        {roleSlugs.map((slug) => (
          <li key={slug}>
            {interpolate(copy.timeline.listItem, {
              role: copy.roles[slug].title,
              company: roles[slug].company,
              engagement: copy.engagements[roles[slug].engagement],
              period: periods[slug],
            })}
          </li>
        ))}
      </ul>
    </div>
  );
}
