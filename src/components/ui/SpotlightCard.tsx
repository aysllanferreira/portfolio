// Pencil: DWn7Q Spotlight Card
import { Lock } from "lucide-react";

import { AssetImage } from "@/components/media/AssetImage";
import type { RasterKey } from "@/lib/assets";
import { cn } from "@/lib/cn";

import { Flag, type CountryCode } from "./Flag";
import { RoleCallout, TagList, type ProjectTag } from "./ProjectMeta";
import { Tag } from "./Tag";

export interface ScreenshotFrame {
  zoom: number;
  x: number;
  y: number;
}

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
   */
  screenshotFrame?: ScreenshotFrame | undefined;
  /** Height and layout of the screenshot area; the large card shows more of it. */
  screenshotClassName?: string | undefined;
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
  className,
}: SpotlightCardProps) {
  // Frames are design data, so they are applied as computed styles rather than classes.
  const frameStyle = screenshotFrame && {
    width: `${String(screenshotFrame.zoom * 100)}%`,
    maxWidth: "none",
    transform: `translate(${String(-screenshotFrame.x * 100)}%, ${String(-screenshotFrame.y * 100)}%)`,
  };

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
      <div className={cn("relative h-[220px] overflow-hidden bg-white", screenshotClassName)}>
        <AssetImage
          name={screenshot}
          alt={screenshotAlt}
          sizes={screenshotSizes}
          className={cn("size-full", frameStyle && "absolute inset-0")}
          imgClassName={cn(frameStyle ? "origin-top-left" : "size-full object-cover object-top")}
          imgStyle={frameStyle}
        />
      </div>
      <div className="flex flex-col gap-3.5 px-7 pt-6 pb-7">
        <div className="flex items-center gap-2.5">
          <Flag country={country} />
          <p className="flex-1 font-mono text-caption tracking-[0.4px] text-text-muted uppercase">
            {market}
          </p>
          {badge && <Tag tone="accent">{badge}</Tag>}
        </div>
        <h3 className="text-h3 leading-[1.15] font-medium text-text-primary">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent focus-visible:after:outline-solid"
          >
            {name} <span className="sr-only">({newTabHint})</span>
          </a>
        </h3>
        <p className="text-body leading-[1.55] text-text-muted">{product}</p>
        <RoleCallout label={roleLabel} role={role} className="pl-3.5" />
        <TagList tags={tags} className="gap-2" />
      </div>
    </article>
  );
}
