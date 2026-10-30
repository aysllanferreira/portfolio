import { Section } from "@/components/layout/Section";
import { getDictionary } from "@/i18n/get-dictionary";

import { selectedWorkBackground } from "./background";

/** Section shell; its content is built from the SelectedWork frames of the design. */
export async function SelectedWork() {
  const dictionary = await getDictionary();

  return (
    <Section
      id="work"
      labelledBy="work-title"
      background={selectedWorkBackground}
      className="min-h-[80dvh] fluid-py-72 tablet:fluid-py-96 desktop:fluid-py-120"
    >
      <h2 id="work-title" className="sr-only">
        {dictionary.nav.links.work}
      </h2>
    </Section>
  );
}
