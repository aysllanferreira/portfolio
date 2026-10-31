import { AccentHeadline } from "@/components/ui/AccentHeadline";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { AccentText } from "@/i18n/types";
import { cn } from "@/lib/cn";

import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: AccentText;
  titleId: string;
  /** Right-hand column on desktop (an intro paragraph, a legend), stacked below elsewhere. */
  aside?: ReactNode;
  /** Eyebrow label size, for sections whose design sets it smaller on phones. */
  eyebrowClassName?: string;
  /** Title sizes per layout; sections differ slightly in the design. */
  titleClassName?: string;
  accentClassName?: string;
  className?: string;
}

/**
 * The header shared by the content sections: eyebrow and accent title on the left,
 * an aside on the right on desktop, stacked below it on tablet and mobile.
 */
export function SectionHeader({
  eyebrow,
  title,
  titleId,
  aside,
  eyebrowClassName,
  titleClassName,
  accentClassName,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6 desktop:flex-row desktop:items-end desktop:justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        <Eyebrow labelClassName={eyebrowClassName}>{eyebrow}</Eyebrow>
        <AccentHeadline
          as="h2"
          id={titleId}
          text={title}
          className={cn(
            "fluid-text-34 leading-[1.04] font-medium tracking-[-0.039em] text-text-primary tablet:fluid-text-52 desktop:fluid-text-64",
            titleClassName,
          )}
          accentClassName={cn(
            "fluid-text-40 leading-[0.98] tablet:fluid-text-62 desktop:fluid-text-76",
            accentClassName,
          )}
        />
      </div>
      {aside}
    </header>
  );
}
