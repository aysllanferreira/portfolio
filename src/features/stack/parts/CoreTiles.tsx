import { CoreTile } from "@/components/ui/CoreTile";
import type { Dictionary } from "@/i18n/types";

import { coreTech, type CoreTech } from "../content";

interface CoreTilesProps {
  copy: Dictionary["stack"];
}

/** The six technologies everything else is built around: 2, 3 or 6 per row. */
export function CoreTiles({ copy }: CoreTilesProps) {
  return (
    <ol
      aria-label={copy.coreLabel}
      className="grid grid-cols-2 gap-3 tablet:grid-cols-3 tablet:gap-4 desktop:grid-cols-6"
    >
      {coreTech.map((tech: CoreTech, index) => (
        <CoreTile
          key={tech.name}
          number={String(index + 1).padStart(2, "0")}
          category={copy.categories[tech.category]}
          name={tech.name}
          logo={tech.logo}
          featured={tech.featured ?? false}
          className="h-[170px] tablet:h-[220px]"
        />
      ))}
    </ol>
  );
}
