// Pencil: DWn7Q Spotlight Card
import { Lock } from "lucide-react";

import { AssetImage } from "@/components/media/AssetImage";
import type { RasterKey } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { breakAfterSlashes } from "@/lib/typography";

import { Flag, type CountryCode } from "./Flag";
import { RoleCallout, TagList, type ProjectTag } from "./ProjectMeta";
import { Tag } from "./Tag";

import type { CSSProperties } from "react";

export interface ScreenshotFrame {
  zoom: number;
  x: number;
  y: number;
}

const layouts = ["mobile", "tablet", "desktop"] as const;

/** A frame per layout, for screenshots the design crops differently at each width. */
export type ScreenshotFrames = Record<(typeof layouts)[number], ScreenshotFrame>;

/**
 * Frames are design data, so they travel as custom properties on the screenshot area
 * and the image reads the one for the active layout through its responsive classes.
 */
function frameVariables(frame: ScreenshotFrame | ScreenshotFrames) {
  const frames = "zoom" in frame ? { mobile: frame, tablet: frame, desktop: frame } : frame;
  return Object.fromEntries(
    layouts.flatMap((layout) => {
      const { zoom, x, y } = frames[layout];
      return [
        [`--shot-w-${layout}`, `${String(zoom * 100)}%`],
        [`--shot-x-${layout}`, `${String(-x * 100)}%`],
        [`--shot-y-${layout}`, `${String(-y * 100)}%`],
      ];
    }),
  ) as CSSProperties;
}

/*
 * The large card leads the section, so its title and copy are set bigger from tablet
 * up. Line heights are whole pixels (size × design ratio, rounded) as in the design.
 */
const sizes = {
  default: { name: "text-h3 leading-[28px]", product: "", role: "" },
  large: {
    name: "text-[26px] leading-[30px] tracking-[-1.1px] tablet:text-[34px] tablet:leading-[39px]",
    product: "tablet:text-[17px] tablet:leading-[26px]",
    role: "tablet:text-[16px]",
  },
} as const;

const framedImage =
  "max-w-none origin-top-left w-(--shot-w-mobile) translate-x-(--shot-x-mobile) translate-y-(--shot-y-mobile) tablet:w-(--shot-w-tablet) tablet:translate-x-(--shot-x-tablet) tablet:translate-y-(--shot-y-tablet) desktop:w-(--shot-w-desktop) desktop:translate-x-(--shot-x-desktop) desktop:translate-y-(--shot-y-desktop)";

export interface SpotlightCardProps {
  name: string;
  domain: string;
  href: string;
  country: CountryCode;
  market: string;
  /** Optional accent badge next to the market, e.g. "Deterministic AI". */
  badge?: string;
  product: string;
  roleLabel: string;
  role: string;
  tags: readonly ProjectTag[];
  screenshot: RasterKey;
  screenshotAlt: string;
  /** Rendered screenshot widths per layout, for responsive image selection. */
  screenshotSizes: string;
  newTabHint: string;
  /**
   * Which part of the screenshot the design shows, from the design file's image
   * transform: `zoom` is how much wider than the frame the image is drawn, and `x`/`y`
   * are the fractions of its width and height scrolled out of view at the top-left.
   * Pass one frame for every layout, or one per layout.
   */
  screenshotFrame?: ScreenshotFrame | ScreenshotFrames | undefined;
  /** Height and layout of the screenshot area; the large card shows more of it. */
  screenshotClassName?: string | undefined;
  size?: keyof typeof sizes;
  className?: string;
}

/**
 * A featured project with a real product screenshot in a browser-style frame.
 * The name stretches its link over the card, as in ProjectCard.
 */
export function SpotlightCard({
  name,
  domain,
  href,
  country,
  market,
  badge,
  product,
  roleLabel,
  role,
  tags,
  screenshot,
  screenshotAlt,
  screenshotSizes,
  newTabHint,
  screenshotFrame,
  screenshotClassName,
  size = "default",
  className,
}: SpotlightCardProps) {
  return (
    <article
      className={cn(
        "group glass relative flex flex-col overflow-hidden rounded-lg bg-[#14141bcc] shadow-panel [--glass-edge-stop:60%] [--glass-edge:#a493ff44]",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 shadow-[inset_0_-1px_0_var(--color-border)]">
        <Lock aria-hidden className="size-3 text-text-faint" strokeWidth={2.2} />
        <span className="font-mono text-[11px] tracking-[0.4px] text-text-muted">{domain}</span>
      </div>
      <div
        className={cn("relative h-[220px] overflow-hidden bg-white", screenshotClassName)}
        style={screenshotFrame && frameVariables(screenshotFrame)}
      >
        <AssetImage
          name={screenshot}
          alt={screenshotAlt}
          sizes={screenshotSizes}
          className={cn("size-full", screenshotFrame && "absolute inset-0")}
          imgClassName={screenshotFrame ? framedImage : "size-full object-cover object-top"}
        />
      </div>
      <div className="flex flex-col gap-3.5 px-5 pt-5 pb-6 tablet:px-7 tablet:pt-6 tablet:pb-7">
        <div className="flex items-center gap-2.5">
          <Flag country={country} />
          <p className="flex-1 font-mono text-caption tracking-[0.4px] text-text-muted uppercase">
            {market}
          </p>
          {badge && <Tag tone="accent">{badge}</Tag>}
        </div>
        <h3 className={cn("font-medium text-text-primary", sizes[size].name)}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent focus-visible:after:outline-solid"
          >
            {name} <span className="sr-only">({newTabHint})</span>
          </a>
        </h3>
        <p className={cn("text-body leading-[23px] text-text-muted", sizes[size].product)}>
          {breakAfterSlashes(product)}
        </p>
        <RoleCallout
          label={roleLabel}
          role={role}
          className="pl-3.5"
          roleClassName={sizes[size].role}
        />
        {/* On phones the design lets one row of tags run into the padding rather than wrap. */}
        <TagList tags={tags} className="-mr-2 gap-2 tablet:mr-0" />
      </div>
    </article>
  );
}
