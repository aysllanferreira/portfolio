import { Section } from "@/components/layout/Section";
import { getDictionary } from "@/i18n/get-dictionary";

import { stackBackground } from "./background";

/** Section shell; its content is built from the Stack frames of the design. */
export async function Stack() {
  const dictionary = await getDictionary();

  return (
    <Section
      id="stack"
      labelledBy="stack-title"
      background={stackBackground}
      className="min-h-[80dvh] fluid-py-72 tablet:fluid-py-96 desktop:fluid-py-120"
    >
      <h2 id="stack-title" className="sr-only">
        {dictionary.nav.links.stack}
      </h2>
    </Section>
  );
}
