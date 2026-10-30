import { rasterAsset, rasterSrcSet, rasterUrl, type RasterKey } from "@/lib/assets";
import { cn } from "@/lib/cn";

import type { CSSProperties } from "react";

interface AssetImageProps {
  name: RasterKey;
  /** Localized description, or "" for a purely decorative image. */
  alt: string;
  /** Rendered width per layout, e.g. "(width >= 75rem) 528px, (width >= 48rem) 367px, 90vw". */
  sizes: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  className?: string | undefined;
  imgClassName?: string | undefined;
  /** Computed, data-driven styles for the <img> (e.g. a design-defined crop). */
  imgStyle?: CSSProperties | undefined;
}

/**
 * Responsive image served from the asset CDN. Every srcset candidate is a real,
 * pre-optimized file listed in the manifest, so the browser downloads the right
 * size in AVIF (or WebP) and the server never processes images. Rendered on the
 * server with no client JavaScript; width/height reserve the box to avoid layout shift.
 */
export function AssetImage({
  name,
  alt,
  sizes,
  priority = false,
  className,
  imgClassName,
  imgStyle,
}: AssetImageProps) {
  const { width, height, blurDataURL } = rasterAsset(name);

  return (
    <picture className={cn("block", className)}>
      <source type="image/avif" srcSet={rasterSrcSet(name, "avif")} sizes={sizes} />
      {/* Candidates come from the manifest, not the Next.js image optimizer. */}
      <img
        src={rasterUrl(name, width, "webp")}
        srcSet={rasterSrcSet(name, "webp")}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={cn("block h-auto max-w-full", imgClassName)}
        style={{
          ...(blurDataURL
            ? { backgroundImage: `url(${blurDataURL})`, backgroundSize: "cover" }
            : {}),
          ...imgStyle,
        }}
      />
    </picture>
  );
}
