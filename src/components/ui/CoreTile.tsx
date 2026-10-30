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
  className?: string;
}

/**
 * A core technology tile: glass surface tinted by the technology's brand color,
 * with a soft glow from the top-right corner and a matching edge.
 */
export function CoreTile({ number, category, name, logo, className }: CoreTileProps) {
  const style = { "--brand": techBrandColors[logo] } as CSSProperties;

  return (
    <li
      style={style}
      className={cn(
        "flex h-[220px] flex-col justify-between rounded-md bg-glass bg-[radial-gradient(160%_160%_at_100%_0%,color-mix(in_srgb,var(--brand)_22%,transparent),transparent)] p-5 ring-1 ring-[color-mix(in_srgb,var(--brand)_25%,transparent)] backdrop-blur-[20px] ring-inset",
        className,
      )}
    >
      <div className="flex items-start justify-between font-mono tracking-[0.5px] text-text-faint">
        <span className="text-caption">{number}</span>
        <span className="text-[10px] uppercase">{category}</span>
      </div>
      <div className="flex h-[72px] items-center">
        <TechLogo name={logo} size={64} className="size-16" />
      </div>
      <p className="text-body font-medium text-text-primary">{name}</p>
    </li>
  );
}
