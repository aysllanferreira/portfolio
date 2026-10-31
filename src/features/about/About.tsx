import { Section } from "@/components/layout/Section";
import { OutlineWord } from "@/components/ui/OutlineWord";
import { site } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";

import { aboutBackground } from "./background";
import { AboutText } from "./parts/AboutText";
import { PortraitCard } from "./parts/PortraitCard";

/** About (design frames ULVHo · iMrXH · EL1E3): portrait and story, side by side on desktop. */
export async function About() {
  const { about, nav } = await getDictionary();

  return (
    <Section
      id="about"
      labelledBy="about-title"
      background={aboutBackground}
      className="fluid-py-72 tablet:fluid-py-96 desktop:fluid-py-120"
      containerClassName="flex flex-col fluid-gap-36 tablet:fluid-gap-48 desktop:flex-row desktop:fluid-gap-80"
      decoration={
        <OutlineWord className="fluid-top-30 fluid-left-30 fluid-text-110 tracking-[-0.045em] tablet:fluid-left-220 tablet:fluid-text-200 tablet:tracking-[-0.06em] desktop:fluid-left-640 desktop:fluid-text-300 desktop:tracking-[-0.04em]">
          {about.outline}
        </OutlineWord>
      }
    >
      <PortraitCard
        name={site.name}
        roleLine={about.roleLine}
        availability={nav.availability}
        portraitAlt={about.portraitAlt}
      />
      <AboutText copy={about} titleId="about-title" />
    </Section>
  );
}
