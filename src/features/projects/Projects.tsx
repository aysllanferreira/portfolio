import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Glow } from "@/components/ui/Glow";
import { OutlineWord } from "@/components/ui/OutlineWord";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

import { projectsBackground } from "./background";
import { CountryList } from "./parts/CountryList";
import { ProjectGrid } from "./parts/ProjectGrid";
import { Spotlights } from "./parts/Spotlights";

/** All Projects (design frames Ms70f · vX4pF · l6SF7): spotlights, then the full grid. */
export async function Projects() {
  const [{ projects, a11y }, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <Section
      id="projects"
      labelledBy="projects-title"
      background={projectsBackground}
      className="fluid-py-72 tablet:fluid-py-96 desktop:fluid-py-120"
      containerClassName="flex flex-col fluid-gap-36 tablet:fluid-gap-48 desktop:fluid-gap-56"
      decoration={
        <>
          <Glow tone="cool" className="top-[-200px] left-[800px] h-[700px] w-[1000px]" />
          <OutlineWord className="fluid-top-30 fluid-left-20 fluid-text-110 tracking-[-0.045em] tablet:left-[-30px] tablet:fluid-text-200 tablet:tracking-[-0.06em] desktop:fluid-text-300 desktop:tracking-[-0.04em]">
            {projects.outline}
          </OutlineWord>
        </>
      }
    >
      <SectionHeader
        eyebrow={projects.eyebrow}
        title={projects.title}
        titleId="projects-title"
        eyebrowClassName="text-[11px] tablet:text-[13px]"
        className="gap-8"
        aside={
          <CountryList
            note={projects.selectionNote}
            label={projects.countriesLabel}
            locale={locale}
          />
        }
      />
      <Spotlights copy={projects} newTabHint={a11y.opensInNewTab} />
      <ProjectGrid copy={projects} newTabHint={a11y.opensInNewTab} />
    </Section>
  );
}
