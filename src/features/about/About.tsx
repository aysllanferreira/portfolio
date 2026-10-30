import { Section } from "@/components/layout/Section";
import { getDictionary } from "@/i18n/get-dictionary";

import { aboutBackground } from "./background";

/** Section shell; its content is built from the About frames of the design. */
export async function About() {
  const dictionary = await getDictionary();

  return (
    <Section
      id="about"
      labelledBy="about-title"
      background={aboutBackground}
      className="min-h-[80dvh] fluid-py-72 tablet:fluid-py-96 desktop:fluid-py-120"
    >
      <h2 id="about-title" className="sr-only">
        {dictionary.nav.links.about}
      </h2>
    </Section>
  );
}
