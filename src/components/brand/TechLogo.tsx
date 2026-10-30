// Pencil: EOA4m … TgaVF Logo/* (27 technology logos)
import { AssetSvg } from "@/components/media/AssetSvg";
import type { TechLogoName } from "@/content/tech-logos";

export type { TechLogoName };

interface TechLogoProps {
  name: TechLogoName;
  size: number;
  className?: string;
}

/** Technology logos are decorative: the technology's name is always shown as text. */
export function TechLogo({ name, size, className }: TechLogoProps) {
  return <AssetSvg name={`logos/${name}`} alt="" height={size} className={className} />;
}
