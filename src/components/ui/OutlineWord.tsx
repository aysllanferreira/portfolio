// Pencil: "Outline Type" (decorative display word behind section headers)
import { cn } from "@/lib/cn";

interface OutlineWordProps {
  children: string;
  className?: string;
}

/**
 * A huge, barely visible display word behind a section header ("SHIPPED", "STACK").
 * It is drawn as generated content, not DOM text, so it never reaches assistive
 * technology, find-in-page, copy-paste or contrast audits. Position and size come
 * from the section, which knows where the design places it.
 */
export function OutlineWord({ children, className }: OutlineWordProps) {
  return (
    <span
      aria-hidden
      data-word={children}
      className={cn(
        "pointer-events-none absolute leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-text-primary/[0.04] uppercase select-none before:content-[attr(data-word)]",
        className,
      )}
    />
  );
}
