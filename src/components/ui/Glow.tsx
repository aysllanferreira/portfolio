import { cn } from "@/lib/cn";

/**
 * The soft violet ellipse the design places behind section headers. Decorative only;
 * position and size come from the section (design frame coordinates).
 */
export function Glow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full bg-[radial-gradient(closest-side,#a493ff1f,#a493ff00)]",
        className,
      )}
    />
  );
}
