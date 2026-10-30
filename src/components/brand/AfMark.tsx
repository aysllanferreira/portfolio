// Pencil: Q8B9j9 Brand/AF Mark
import { AssetSvg } from "@/components/media/AssetSvg";

/** The monogram's fills in the design: violet (default), soft (navbar), ink, deep, ghost (backdrops). */
export type AfMarkTone = "violet" | "soft" | "ink" | "deep" | "ghost";

interface AfMarkProps {
  tone?: AfMarkTone;
  /** Rendered height in CSS pixels; width follows the mark's aspect ratio. */
  height: number;
  /** Accessible name, or "" when the mark is decorative. */
  label?: string;
  className?: string;
}

export function AfMark({ tone = "violet", height, label = "", className }: AfMarkProps) {
  return (
    <AssetSvg name={`brand/af-mark-${tone}`} alt={label} height={height} className={className} />
  );
}
