import { cn } from "@/lib/cn";

const tones = {
  violet: "bg-[radial-gradient(closest-side,#a493ff1f,#a493ff00)]",
  cool: "bg-[radial-gradient(closest-side,#1d3fa833,#1d3fa800)]",
} as const;

/**
 * The soft ellipse the design places behind section headers. Decorative only;
 * position and size come from the section (design frame coordinates).
 */
export function Glow({
  tone = "violet",
  className,
}: {
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", tones[tone], className)}
    />
  );
}
