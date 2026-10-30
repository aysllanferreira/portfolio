// Pencil: X98bUw Tech Chip
import { TechLogo, type TechLogoName } from "@/components/brand/TechLogo";
import { cn } from "@/lib/cn";

interface TechChipProps {
  name: string;
  /** Some tools (e.g. Stripe, Zod) have no logo in the design; the chip then shows text only. */
  logo?: TechLogoName;
  /** Accent chips mark the core tools of a layer. */
  tone?: "neutral" | "accent";
  className?: string;
}

export function TechChip({ name, logo, tone = "neutral", className }: TechChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill py-[7px] pr-[13px] pl-2.5 font-mono text-caption tracking-[0.4px] whitespace-nowrap ring-1 ring-inset",
        tone === "accent"
          ? "bg-[#a493ff14] text-accent ring-[#a493ff55]"
          : "bg-bg/50 text-text-primary ring-border",
        !logo && "pl-[13px]",
        className,
      )}
    >
      {logo && <TechLogo name={logo} size={15} className="size-[15px] shrink-0" />}
      {name}
    </span>
  );
}
