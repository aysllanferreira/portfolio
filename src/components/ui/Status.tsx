// Pencil: tekD8 Status
import { cn } from "@/lib/cn";

import type { ReactNode } from "react";

interface StatusProps {
  children: ReactNode;
  className?: string;
}

/** A live green dot with a short mono label ("Open to new roles"). */
export function Status({ children, className }: StatusProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        aria-hidden
        className="size-1.5 shrink-0 rounded-full bg-success shadow-[0_0_6px_#4ade80aa]"
      />
      <span className="font-mono text-[11px] tracking-[0.4px] text-text-muted">{children}</span>
    </span>
  );
}
