import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Glow } from "@/components/ui/Glow";
import { OutlineWord } from "@/components/ui/OutlineWord";
import { getDictionary } from "@/i18n/get-dictionary";

import { selectedWorkBackground } from "./background";
import { CaseStudy } from "./parts/CaseStudy";
import { DriveThruVisual } from "./parts/DriveThruVisual";

/** Selected Work (design frames kS7jw · oVLYd · eQJ9S): the featured Stream Signage case. */
export async function SelectedWork() {
  const { work, a11y } = await getDictionary();

  return (
    <Section
      id="work"
      labelledBy="work-title"
      background={selectedWorkBackground}
      className="fluid-py-72 tablet:fluid-py-96 desktop:fluid-py-120"
      containerClassName="flex flex-col fluid-gap-40 tablet:fluid-gap-56 desktop:fluid-gap-72"
      decoration={
        <>
          <Glow className="top-[180px] left-[-200px] h-[800px] w-[1100px]" />
          <OutlineWord className="fluid-top-20 fluid-left-20 fluid-text-120 tablet:fluid-left-120 tablet:fluid-text-220 desktop:fluid-left-520 desktop:fluid-text-300">
            {work.outline}
          </OutlineWord>
        </>
      }
    >
      <SectionHeader
        eyebrow={work.eyebrow}
        title={work.title}
        titleId="work-title"
        titleClassName="tablet:fluid-text-64"
        aside={
          <p className="text-body leading-[1.55] text-text-muted tablet:text-[17px] desktop:fluid-w-400">
            {work.intro}
          </p>
        }
      />

      <div className="flex flex-col fluid-gap-40 desktop:flex-row desktop:items-center desktop:fluid-gap-72">
        <DriveThruVisual label={work.visualLabel} />
        <CaseStudy copy={work.case} newTabHint={a11y.opensInNewTab} />
      </div>
    </Section>
  );
}
