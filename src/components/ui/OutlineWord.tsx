// Pencil: "Outline Type" (decorative display word behind section headers)
import { cn } from "@/lib/cn";

interface OutlineWordProps {
  children: string;
  className?: string;
}

/**
 * A huge, barely visible display word set behind a section header ("SHIPPED",
 * "STACK"). Purely decorative, so assistive technology skips it. Position and size
 * come from the section, which knows where the design places it.
 */
export function OutlineWord({ children, className }: OutlineWordProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-text-primary/[0.04] uppercase select-none",
        className,
      )}
    >
      {children}
    </span>
  );
}
