import { Sparkle } from "lucide-react";

import { cn } from "@/lib/cn";
import { isTestRender } from "@/lib/render-mode";

interface PracticesTickerProps {
  label: string;
  practices: readonly string[];
}

function Run({ practices, hidden = false }: { practices: readonly string[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-7 pr-7">
      {practices.map((practice, index) => (
        <li key={practice} className="flex items-center gap-7">
          <span
            className={cn(
              "text-[30px] leading-[39px] font-medium tracking-[-1px] whitespace-nowrap tablet:text-[44px] tablet:leading-[57px] tablet:tracking-[-1.5px]",
              index % 2 === 0 ? "text-text-primary/40" : "text-text-primary",
            )}
          >
            {practice}
          </span>
          <Sparkle aria-hidden className="size-4 shrink-0 text-accent tablet:size-[22px]" />
        </li>
      ))}
    </ul>
  );
}

/**
 * A slow, seamless marquee of practices. CSS only: two identical runs scroll by half
 * the track and loop; the copy is hidden from assistive technology, the motion stops
 * on hover and focus and never starts for reduced motion. Test renders freeze it at
 * the designed offset.
 */
export function PracticesTicker({ label, practices }: PracticesTickerProps) {
  return (
    <section
      aria-label={label}
      className="group relative h-[72px] overflow-hidden pt-[18px] shadow-[inset_0_1px_0_var(--color-border),inset_0_-1px_0_var(--color-border)] tablet:h-24 tablet:pt-[22px]"
    >
      <div
        className={cn(
          "flex w-max",
          isTestRender
            ? "-translate-x-[120px] tablet:-translate-x-[180px]"
            : "group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-safe:animate-[ticker_60s_linear_infinite]",
        )}
      >
        <Run practices={practices} />
        <Run practices={practices} hidden />
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[120px] bg-linear-to-r from-bg to-bg/0 tablet:w-40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[120px] bg-linear-to-l from-bg to-bg/0 tablet:w-40"
      />
    </section>
  );
}
