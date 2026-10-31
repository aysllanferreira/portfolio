import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";

import { localizeTags, spotlights, type SpotlightSlug } from "../content";

interface SpotlightCopy {
  market: string;
  badge?: string;
  product: string;
  role: string;
  screenshotAlt: string;
}

/*
 * How each card sits in the layout: the large card spans both rows on desktop and the
 * full width on tablet, with its screenshot area growing to match. Image `sizes` are
 * the rendered screenshot widths (frame width × zoom) per layout.
 */
const placement: Record<
  SpotlightSlug,
  {
    className?: string;
    size?: "large";
    screenshotClassName: string;
    screenshotSizes: string;
  }
> = {
  "centrum-ai": {
    className: "tablet:col-span-2 desktop:col-span-1 desktop:row-span-2",
    size: "large",
    screenshotClassName: "fluid-h-240 tablet:fluid-h-440 desktop:fluid-h-755",
    screenshotSizes:
      "(min-width: 75rem) min(53vw, 760px), (min-width: 48rem) calc(100vw - 80px), calc(100vw - 40px)",
  },
  investable: {
    screenshotClassName: "fluid-h-200 tablet:fluid-h-220",
    screenshotSizes: "(min-width: 75rem) min(50vw, 714px), (min-width: 48rem) 74vw, 145vw",
  },
  "privacy-lock": {
    screenshotClassName: "fluid-h-200 tablet:fluid-h-220",
    screenshotSizes: "(min-width: 75rem) min(53vw, 755px), (min-width: 48rem) 88vw, 173vw",
  },
};

interface SpotlightsProps {
  copy: Dictionary["projects"];
  newTabHint: string;
}

/** The three projects shown with a screenshot: one large card and two beside it. */
export function Spotlights({ copy, newTabHint }: SpotlightsProps) {
  return (
    <ul className="grid fluid-gap-20 tablet:grid-cols-2 desktop:grid-cols-[760fr_528fr] desktop:fluid-gap-24">
      {(Object.keys(spotlights) as SpotlightSlug[]).map((slug) => {
        const facts = spotlights[slug];
        const text: SpotlightCopy = copy.spotlights[slug];
        const { className, ...screenshot } = placement[slug];

        return (
          <li key={slug} className={cn("flex", className)}>
            <SpotlightCard
              name={facts.name}
              domain={facts.domain}
              href={`https://${facts.domain}`}
              country={facts.country}
              market={text.market}
              {...(text.badge ? { badge: text.badge } : {})}
              product={text.product}
              roleLabel={copy.roleLabel}
              role={text.role}
              tags={localizeTags(facts, copy.tags)}
              screenshot={facts.screenshot}
              screenshotAlt={text.screenshotAlt}
              screenshotFrame={facts.frames}
              newTabHint={newTabHint}
              className="flex-1"
              {...screenshot}
            />
          </li>
        );
      })}
    </ul>
  );
}
