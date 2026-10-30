import { Section } from "@/components/layout/Section";
import { getDictionary } from "@/i18n/get-dictionary";

import { projectsBackground } from "./background";

/** Section shell; its content is built from the Projects frames of the design. */
export async function Projects() {
  const dictionary = await getDictionary();

  return (
    <Section
      id="projects"
      labelledBy="projects-title"
      background={projectsBackground}
      className="min-h-[80dvh] fluid-py-72 tablet:fluid-py-96 desktop:fluid-py-120"
    >
      <h2 id="projects-title" className="sr-only">
        {dictionary.nav.links.work}
      </h2>
    </Section>
  );
}
