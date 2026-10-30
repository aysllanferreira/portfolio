import { AfMark } from "@/components/brand/AfMark";
import { cn } from "@/lib/cn";

interface MonogramProps {
  size: "md" | "sm";
  className?: string;
}

/** The violet AF tile used as the brand mark in the navbar and menus. */
export function Monogram({ size, className }: MonogramProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center bg-linear-225 from-accent-soft to-accent-strong shadow-[0_6px_20px_#7b5cff55]",
        size === "md" ? "size-10 rounded-[12px]" : "size-9 rounded-[11px]",
        className,
      )}
    >
      <AfMark tone="ink" height={size === "md" ? 18 : 16} />
    </span>
  );
}
