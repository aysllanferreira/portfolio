import { RoleRow } from "@/components/ui/RoleRow";
import type { Dictionary } from "@/i18n/types";

import { roles, roleSlugs, type RoleFacts, type RoleSlug } from "../content";

interface RoleListProps {
  copy: Dictionary["experience"];
  periods: Record<RoleSlug, string>;
}

/** Every role in full, newest first; the last one closes the list with a hairline. */
export function RoleList({ copy, periods }: RoleListProps) {
  return (
    <ol className="flex flex-col shadow-[inset_0_-1px_0_var(--color-border)]">
      {roleSlugs.map((slug) => {
        const facts: RoleFacts = roles[slug];
        const text = copy.roles[slug];
        return (
          <li key={slug}>
            <RoleRow
              period={periods[slug]}
              current={facts.end === undefined}
              country={facts.country}
              company={facts.company}
              engagement={`${copy.engagements[facts.engagement]} · ${copy.remote}`}
              role={text.title}
              summary={text.summary}
              highlights={text.highlights}
              numbers={text.numbers}
            />
          </li>
        );
      })}
    </ol>
  );
}
