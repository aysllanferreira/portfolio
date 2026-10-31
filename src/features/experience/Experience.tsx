import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { OutlineWord } from "@/components/ui/OutlineWord";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { currentMonth } from "@/lib/current-month";
import { formatMonthRange } from "@/lib/format";
import { isTestRender } from "@/lib/render-mode";

import { experienceBackground } from "./background";
import { designedNow, roles, roleSlugs, type RoleFacts, type RoleSlug } from "./content";
import { BeyondTheJob } from "./parts/BeyondTheJob";
import { EngagementLegend } from "./parts/EngagementLegend";
import { RoleList } from "./parts/RoleList";
import { Timeline } from "./parts/Timeline";
import { createAxis } from "./timeline";

/** Experience (design frames MlqZU · d71Dzw · s5wqzz): timeline, roles, beyond the job. */
export async function Experience() {
  const [{ experience }, locale, month] = await Promise.all([
    getDictionary(),
    getLocale(),
    currentMonth(),
  ]);
  const now = isTestRender ? designedNow : month;
  const axis = createAxis(
    roleSlugs.map((slug) => roles[slug].start),
    now,
  );
  const periods = Object.fromEntries(
    roleSlugs.map((slug) => {
      const role: RoleFacts = roles[slug];
      return [slug, formatMonthRange(role.start, role.end, locale, experience.present)];
    }),
  ) as Record<RoleSlug, string>;

  return (
    <Section
      id="experience"
      labelledBy="experience-title"
      background={experienceBackground}
      className="fluid-py-72 tablet:fluid-py-96 desktop:fluid-py-120"
      containerClassName="flex flex-col fluid-gap-36 tablet:fluid-gap-48 desktop:fluid-gap-56"
      decoration={
        <OutlineWord className="fluid-top-30 fluid-left-20 fluid-text-110 tracking-[-0.045em] tablet:fluid-left-200 tablet:fluid-text-200 tablet:tracking-[-0.06em] desktop:fluid-left-460 desktop:fluid-text-300 desktop:tracking-[-0.04em]">
          {experience.outline}
        </OutlineWord>
      }
    >
      <SectionHeader
        eyebrow={experience.eyebrow}
        title={experience.title}
        titleId="experience-title"
        aside={
          <div className="flex flex-col gap-5 desktop:fluid-w-400 desktop:shrink-0">
            <p className="text-body leading-[23px] text-text-muted tablet:text-[17px] tablet:leading-[26px]">
              {experience.intro}
            </p>
            <EngagementLegend
              label={experience.timeline.legendLabel}
              names={experience.engagements}
            />
          </div>
        }
      />
      <Timeline axis={axis} copy={experience} periods={periods} />
      <RoleList copy={experience} periods={periods} />
      <BeyondTheJob copy={experience} />
    </Section>
  );
}
