// Pencil: DbW6I Project Card
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/cn";
import { breakAfterSlashes } from "@/lib/typography";

import { Flag, type CountryCode } from "./Flag";
import { RoleCallout, TagList, type ProjectTag } from "./ProjectMeta";

export interface ProjectCardProps {
  name: string;
  /** Domain shown under the name, e.g. "orchardmentalhealth.com", or "private product". */
  domain: string;
  /** Public site. Private products have none, so their card is not a link. */
  href?: string | undefined;
  country: CountryCode;
  /** "USA · Healthcare" */
  market: string;
  product: string;
  roleLabel: string;
  role: string;
  tags: readonly ProjectTag[];
  /** Localized "opens in a new tab". */
  newTabHint: string;
  className?: string;
}

/**
 * A shipped project in the grid. The project name is the link and stretches over
 * the whole card, so the card is one click target without nested interactives.
 */
export function ProjectCard({
  name,
  domain,
  href,
  country,
  market,
  product,
  roleLabel,
  role,
  tags,
  newTabHint,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3.5 p-7 ring-1 ring-border transition-colors ring-inset",
        href && "focus-within:bg-surface/60 hover:bg-surface/60",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <Flag country={country} />
        <p className="flex-1 font-mono text-[11px] tracking-[0.4px] text-text-muted uppercase">
          {market}
        </p>
        {href && (
          <ArrowUpRight
            aria-hidden
            className="size-4 text-text-muted transition-colors group-hover:text-accent"
            strokeWidth={2}
          />
        )}
      </div>
      <div className="flex flex-col gap-1 pt-1.5">
        <h3 className="text-[22px] leading-[29px] font-medium tracking-[-0.5px] text-text-primary">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="outline-none after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-accent focus-visible:after:outline-solid"
            >
              {name} <span className="sr-only">({newTabHint})</span>
            </a>
          ) : (
            name
          )}
        </h3>
        <p className="font-mono text-[11px] tracking-[0.4px] text-text-faint">{domain}</p>
      </div>
      <p className="text-[14px] leading-[22px] text-text-muted">{breakAfterSlashes(product)}</p>
      <RoleCallout label={roleLabel} role={role} />
      <TagList tags={tags} />
    </article>
  );
}
