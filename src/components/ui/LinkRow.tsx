// Pencil: TTZXn Link Row
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

interface LinkRowProps {
  icon: LucideIcon;
  /** Short uppercase key, e.g. "Email". */
  label: string;
  value: string;
  href: string;
  /** Localized note announced after the link name: "opens in a new tab", "downloads a PDF". */
  hint?: string;
  newTab?: boolean;
  className?: string;
}

/** One contact channel: icon box, key and value, and a trailing arrow. The whole row is the link. */
export function LinkRow({
  icon: Icon,
  label,
  value,
  href,
  hint,
  newTab = false,
  className,
}: LinkRowProps) {
  return (
    <a
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group flex items-center gap-[18px] py-[22px] shadow-[inset_0_1px_0_var(--color-border)] first:shadow-none",
        className,
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-bg ring-1 ring-border transition-shadow ring-inset group-hover:ring-accent/60">
        <Icon aria-hidden className="size-[18px] text-text-primary" strokeWidth={2} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-mono text-[11px] tracking-[0.5px] text-text-faint uppercase">
          {label}
        </span>
        <span className="truncate text-[18px] font-medium text-text-primary transition-colors group-hover:text-accent-soft">
          {value}
        </span>
      </span>
      {hint && <span className="sr-only"> ({hint})</span>}
      <ArrowUpRight
        aria-hidden
        className="size-[18px] shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        strokeWidth={2}
      />
    </a>
  );
}
