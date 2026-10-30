import { svgAsset, type SvgKey } from "@/lib/assets";

interface AssetSvgProps {
  name: SvgKey;
  /** Localized description, or "" when a visible label already names it. */
  alt: string;
  /** Rendered size in CSS pixels; the other side follows the vector's aspect ratio. */
  width?: number;
  height?: number;
  className?: string;
}

/** A recolored vector (logo, brand mark) from the asset CDN. Vectors need no srcset. */
export function AssetSvg({ name, alt, width, height, className }: AssetSvgProps) {
  const asset = svgAsset(name);
  const ratio = asset.width / asset.height;
  const renderedWidth = width ?? (height === undefined ? asset.width : height * ratio);
  const renderedHeight = height ?? renderedWidth / ratio;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- vectors are served as-is from the CDN.
    <img
      src={asset.url}
      alt={alt}
      width={Math.round(renderedWidth * 100) / 100}
      height={Math.round(renderedHeight * 100) / 100}
      loading="lazy"
      decoding="async"
      className={className}
      {...(alt === "" ? { "aria-hidden": true } : {})}
    />
  );
}
