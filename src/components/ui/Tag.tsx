// Pencil: hPXZu Tag · YD2uV Tag/Accent
import { cn } from "@/lib/cn";

import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  /** Accent tags highlight what matters most (compliance, the featured badge). */
  tone?: "neutral" | "accent";
  className?: string;
}

export function Tag({ children, tone = "neutral", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-[11px] py-[5px] font-mono text-[11px] tracking-[0.4px] whitespace-nowrap ring-1 ring-inset",
        tone === "accent"
          ? "bg-accent-tint text-accent ring-[#a493ff55]"
          : "text-text-primary ring-border",
        className,
      )}
    >
      {children}
    </span>
  );
}
