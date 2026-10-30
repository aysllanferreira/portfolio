// Pencil: hcHWh Stat
import { cn } from "@/lib/cn";

interface StatProps {
  value: string;
  label: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

/**
 * A headline number with its caption, e.g. "30+ / Products shipped". Renders a
 * term/description pair, so place it inside a `<dl>`; the label is the term and
 * comes first in the DOM, while the number is shown on top.
 */
export function Stat({ value, label, className, valueClassName, labelClassName }: StatProps) {
  return (
    <div className={cn("flex flex-col-reverse justify-end gap-1.5", className)}>
      <dt
        className={cn(
          "font-mono text-caption tracking-[0.5px] text-text-muted uppercase",
          labelClassName,
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          "text-[36px] font-medium tracking-[-1.2px] text-text-primary",
          valueClassName,
        )}
      >
        {value}
      </dd>
    </div>
  );
}
