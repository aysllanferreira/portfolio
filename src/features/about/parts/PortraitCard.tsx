import { AfMark } from "@/components/brand/AfMark";
import { AssetImage } from "@/components/media/AssetImage";
import { Flag } from "@/components/ui/Flag";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

interface PortraitCardProps {
  name: string;
  roleLine: string;
  availability: string;
  portraitAlt: string;
}

const chip =
  "absolute top-3.5 flex items-center gap-2 rounded-pill bg-[#0a0a0fb3] px-2.5 py-1.5 font-mono text-[11px] tracking-[0.5px] text-text-primary uppercase ring-1 backdrop-blur-[12px] ring-inset tablet:top-6 tablet:px-3.5 tablet:py-2";

/**
 * The portrait: a cutout photo over the AF monogram and a faint 90px grid, fading
 * into the name plate. The monogram, grid and fade are decoration; the photo, the
 * availability, the location and the name plate carry the content.
 */
export function PortraitCard({ name, roleLine, availability, portraitAlt }: PortraitCardProps) {
  return (
    <figure className="glass relative h-[460px] overflow-hidden rounded-[20px] bg-[radial-gradient(130%_100%_at_50%_42%,#a493ff55,#a493ff00),linear-gradient(#17142c,#0a0a0f)] shadow-panel-lg [--glass-edge-stop:80%] [--glass-edge:#a493ff66] tablet:h-[760px] tablet:rounded-xl desktop:h-[766px] desktop:w-[540px] desktop:shrink-0">
      <div aria-hidden className="absolute inset-0">
        <AfMark
          tone="ghost"
          height={233}
          className="absolute top-[70px] left-1/2 h-[233px] w-[300px] max-w-none -translate-x-1/2 tablet:top-[110px] tablet:h-[357px] tablet:w-[460px] desktop:top-[90px]"
        />
        <span className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f70a_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f70a_1px,transparent_1px)] bg-size-[90px_90px]" />
      </div>
      <AssetImage
        name="people/aysllan"
        alt={portraitAlt}
        sizes="(min-width: 48rem) 480px, 300px"
        className="absolute top-11 left-1/2 w-[300px] -translate-x-1/2 tablet:top-[60px] tablet:w-[480px] desktop:top-[70px]"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[200px] bg-linear-to-b from-bg/0 to-bg/95 tablet:h-[300px]"
      />

      <p className={cn(chip, "left-3.5 ring-[#a493ff44] tablet:left-6")}>
        <span aria-hidden className="size-[7px] rounded-full bg-accent" />
        {availability}
      </p>
      <p className={cn(chip, "right-[34px] ring-border tablet:right-14 desktop:right-[66px]")}>
        <Flag country={site.location.country} shape="xs" />
        {site.location.city}
      </p>

      <figcaption className="absolute inset-x-3.5 bottom-[15px] flex flex-col gap-1 rounded-md bg-[#14141bb3] px-4 py-3.5 ring-1 ring-border backdrop-blur-[20px] ring-inset tablet:inset-x-6 tablet:bottom-[27px] tablet:px-5 tablet:py-4">
        <span className="text-[22px] leading-[29px] font-medium tracking-[-0.5px] text-text-primary">
          {name}
        </span>
        <span className="font-mono text-[11px] tracking-[0.5px] text-text-muted uppercase">
          {roleLine}
        </span>
      </figcaption>
    </figure>
  );
}
