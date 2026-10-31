import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Dictionary } from "@/i18n/types";

import { localizeTags, projects, type ProjectFacts, type ProjectSlug } from "../content";

interface ProjectGridProps {
  copy: Dictionary["projects"];
  newTabHint: string;
}

/**
 * The rest of the selection in one panel, divided by hairlines. Every cell draws its
 * right and bottom line; the list is 1px larger than the panel so the lines of the
 * last column and row fall outside it and are clipped, whatever the column count.
 */
export function ProjectGrid({ copy, newTabHint }: ProjectGridProps) {
  return (
    <div className="relative overflow-hidden rounded-[16px] bg-[#0f0f15b3] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-border after:ring-inset tablet:rounded-[18px]">
      <ul
        aria-label={copy.gridLabel}
        className="-mr-px -mb-px grid tablet:grid-cols-2 desktop:grid-cols-3"
      >
        {(Object.keys(projects) as ProjectSlug[]).map((slug) => {
          const facts: ProjectFacts = projects[slug];
          const text = copy.items[slug];

          return (
            <li key={slug} className="flex">
              <ProjectCard
                name={facts.name}
                domain={facts.domain ?? copy.privateProduct}
                href={facts.domain && `https://${facts.domain}`}
                country={facts.country}
                market={text.market}
                product={text.product}
                roleLabel={copy.roleLabel}
                role={text.role}
                tags={localizeTags(facts, copy.tags)}
                newTabHint={newTabHint}
                className="flex-1 p-6 shadow-[inset_-1px_-1px_0_var(--color-border)] ring-0 tablet:p-7"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
