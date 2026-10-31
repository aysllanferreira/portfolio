// Pencil: jxMPt Core Tile
import { TechLogo } from "@/components/brand/TechLogo";
import { techBrandColors, type TechLogoName } from "@/content/tech-logos";
import { cn } from "@/lib/cn";

import type { CSSProperties } from "react";

interface CoreTileProps {
  /** Position in the list, e.g. "02". */
  number: string;
  /** Localized category, e.g. "Runtime". */
  category: string;
  name: string;
  logo: TechLogoName;
  /** The highlighted tile: violet edge and glow, stronger tint, accented number. */
  featured?: boolean;
  className?: string;
}

/**
 * A core technology tile: glass surface tinted by the technology's brand color,
 * with a soft glow from the top-right corner and a matching edge.
 */
export function CoreTile({
  number,
  category,
  name,
  logo,
  featured = false,
  className,
}: CoreTileProps) {
  const style = { "--brand": techBrandColors[logo] } as CSSProperties;

  return (
    <li
      style={style}
      className={cn(
        "flex h-[220px] flex-col justify-between rounded-md bg-glass bg-[radial-gradient(160%_160%_at_100%_0%,color-mix(in_srgb,var(--brand)_var(--tint),transparent),transparent)] p-5 backdrop-blur-[20px] [--tint:22%] ring-inset",
        featured
          ? "shadow-[0_16px_48px_#7b5cff40] ring-[1.5px] ring-[#a493ff99] [--tint:28%]"
          : "ring-1 ring-[color-mix(in_srgb,var(--brand)_25%,transparent)]",
        className,
      )}
    >
      <div className="flex items-start justify-between font-mono tracking-[0.5px] text-text-faint">
        <span className={cn("text-caption", featured && "text-accent")}>{number}</span>
        {/* Muted rather than faint: it sits in the brightest corner of the brand tint. */}
        <span className="text-[10px] text-text-muted uppercase">{category}</span>
      </div>
      <div className="flex h-[72px] items-center">
        <TechLogo name={logo} size={64} className="size-16" />
      </div>
      <p className="text-body font-medium text-text-primary">{name}</p>
    </li>
  );
}
