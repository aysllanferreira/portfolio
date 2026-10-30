import { Section } from "@/components/layout/Section";
import { getDictionary } from "@/i18n/get-dictionary";

import { heroBackground } from "./background";

/** Section shell; its content is built from the Hero frames of the design. */
export async function Hero() {
  const dictionary = await getDictionary();

  return (
    <Section
      id="top"
      labelledBy="top-title"
      background={heroBackground}
      className="min-h-[80dvh] fluid-py-72 tablet:fluid-py-96 desktop:fluid-py-120"
    >
      <h1 id="top-title" className="sr-only">
        {dictionary.brand.name}
      </h1>
    </Section>
  );
}
