// Pencil: ATLYN Eyebrow
import { cn } from "@/lib/cn";

import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string | undefined;
  labelClassName?: string | undefined;
}

/** Section kicker: a short accent rule followed by an uppercase mono label. */
export function Eyebrow({ children, className, labelClassName }: EyebrowProps) {
  return (
    <p className={cn("flex items-center gap-3.5", className)}>
      <span aria-hidden className="h-px w-8 shrink-0 bg-accent" />
      <span
        className={cn(
          "font-mono text-[13px] tracking-[0.5px] text-text-muted uppercase",
          labelClassName,
        )}
      >
        {children}
      </span>
    </p>
  );
}
