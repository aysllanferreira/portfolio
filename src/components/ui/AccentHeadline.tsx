import { Fragment } from "react";

import type { AccentText } from "@/i18n/types";
import { cn } from "@/lib/cn";

interface AccentHeadlineProps {
  text: AccentText;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  /** Size and spacing of the serif accent word, which the design sets ~20% larger. */
  accentClassName?: string;
}

/**
 * A headline with one serif italic accent word ("I build software *people* pay for.").
 * Translations place the accent anywhere and may break lines with "\n"; the heading
 * still reads as a single sentence to assistive technology.
 */
export function AccentHeadline({
  text,
  as: Tag = "h2",
  id,
  className,
  accentClassName,
}: AccentHeadlineProps) {
  return (
    <Tag id={id} className={className}>
      <Lines text={text.before} />
      <em className={cn("font-serif font-normal text-accent not-italic", accentClassName)}>
        <Lines text={text.accent} />
      </em>
      <Lines text={text.after} />
    </Tag>
  );
}

function Lines({ text }: { text: string }) {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}
