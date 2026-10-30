import { Section } from "@/components/layout/Section";
import { getDictionary } from "@/i18n/get-dictionary";

import { contactBackground } from "./background";

/** Section shell; its content is built from the Contact frames of the design. */
export async function Contact() {
  const dictionary = await getDictionary();

  return (
    <Section
      id="contact"
      labelledBy="contact-title"
      background={contactBackground}
      className="min-h-[80dvh] fluid-py-72 tablet:fluid-py-96 desktop:fluid-py-120"
      extendBackgroundBelow
    >
      <h2 id="contact-title" className="sr-only">
        {dictionary.nav.links.contact}
      </h2>
    </Section>
  );
}
