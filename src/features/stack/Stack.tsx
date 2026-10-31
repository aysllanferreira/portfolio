import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { OutlineWord } from "@/components/ui/OutlineWord";
import { getDictionary } from "@/i18n/get-dictionary";

import { stackBackground } from "./background";
import { CoreTiles } from "./parts/CoreTiles";
import { Layers } from "./parts/Layers";
import { PracticesTicker } from "./parts/PracticesTicker";

/** Stack (design frames gDJDT · CyeTw · tGX29): core tiles, layers, practices. */
export async function Stack() {
  const { stack } = await getDictionary();

  return (
    <Section
      id="stack"
      labelledBy="stack-title"
      background={stackBackground}
      className="fluid-py-72 tablet:fluid-py-96 desktop:fluid-py-120"
      containerClassName="flex flex-col fluid-gap-36 tablet:fluid-gap-48 desktop:fluid-gap-56"
      decoration={
        <OutlineWord className="fluid-top-30 fluid-left-40 fluid-text-110 tracking-[-0.045em] tablet:fluid-left-260 tablet:fluid-text-200 tablet:tracking-[-0.06em] desktop:fluid-left-600 desktop:fluid-text-300 desktop:tracking-[-0.04em]">
          {stack.outline}
        </OutlineWord>
      }
    >
      <SectionHeader
        eyebrow={stack.eyebrow}
        title={stack.title}
        titleId="stack-title"
        aside={
          <p className="text-body leading-[23px] text-text-muted tablet:text-[17px] tablet:leading-[26px] desktop:fluid-w-400 desktop:shrink-0">
            {stack.intro}
          </p>
        }
      />
      <CoreTiles copy={stack} />
      <Layers copy={stack} />
      <PracticesTicker label={stack.practicesLabel} practices={stack.practices} />
    </Section>
  );
}
