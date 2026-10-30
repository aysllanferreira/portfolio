import { cn } from "@/lib/cn";

import { Tag } from "./Tag";

export interface ProjectTag {
  label: string;
  tone?: "neutral" | "accent";
}

/** The "My role" callout shared by project and spotlight cards: accent rule, label, text. */
export function RoleCallout({
  label,
  role,
  className,
}: {
  label: string;
  role: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 pl-3 shadow-[inset_2px_0_0_var(--color-accent)]",
        className,
      )}
    >
      <span className="font-mono text-[10px] tracking-[0.4px] text-text-faint uppercase">
        {label}
      </span>
      <p className="text-[14px] leading-normal text-text-primary">{role}</p>
    </div>
  );
}

export function TagList({ tags, className }: { tags: readonly ProjectTag[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5 pt-1", className)}>
      {tags.map((tag) => (
        <li key={tag.label}>
          <Tag tone={tag.tone ?? "neutral"}>{tag.label}</Tag>
        </li>
      ))}
    </ul>
  );
}
