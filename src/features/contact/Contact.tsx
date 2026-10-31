import { Section } from "@/components/layout/Section";
import { AccentHeadline } from "@/components/ui/AccentHeadline";
import { Glow } from "@/components/ui/Glow";
import { site } from "@/content/site";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { documentUrl } from "@/lib/assets";

import { contactBackground } from "./background";
import { ContactPitch } from "./parts/ContactPitch";
import { LinksPanel } from "./parts/LinksPanel";
import { Wordmark } from "./parts/Wordmark";

/**
 * Contact (design frames AbUHU · fU6ZJ · l19C13): the closing call to action. The
 * design draws the footer inside this frame, so the shader continues beneath it and
 * the bottom padding is the gap between the wordmark and the footer.
 */
export async function Contact() {
  const [{ contact, nav, a11y }, locale] = await Promise.all([getDictionary(), resolveLocale()]);

  return (
    <Section
      id="contact"
      labelledBy="contact-title"
      background={contactBackground}
      extendBackgroundBelow
      className="fluid-pt-72 fluid-pb-40 tablet:fluid-pt-96 tablet:fluid-pb-56 desktop:fluid-pt-140 desktop:fluid-pb-72"
      containerClassName="flex flex-col fluid-gap-40 tablet:fluid-gap-56 desktop:fluid-gap-72"
      decoration={<Glow tone="bright" className="top-[-60px] left-[-160px] h-[760px] w-[1200px]" />}
    >
      <div className="flex flex-col gap-7">
        <p className="flex items-center gap-3.5 font-mono text-[11px] tracking-[0.5px] text-text-muted uppercase tablet:text-[13px]">
          <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />
          <span>
            {contact.eyebrow}
            <span className="hidden tablet:inline">{` · ${nav.availability}`}</span>
          </span>
        </p>
        <AccentHeadline
          id="contact-title"
          text={contact.headline}
          className="fluid-text-44 leading-[0.98] font-medium tracking-[-0.041em] text-text-primary tablet:fluid-text-76 tablet:tracking-[-0.046em] desktop:fluid-text-124 desktop:tracking-[-0.048em]"
          accentClassName="fluid-text-54 leading-[0.9] tracking-[-2px] tablet:fluid-text-92 desktop:fluid-text-148"
        />
      </div>

      <div className="flex flex-col gap-12 desktop:flex-row desktop:items-end desktop:fluid-gap-72">
        <ContactPitch copy={contact} a11y={a11y} resumeHref={documentUrl("resume", locale)} />
        <LinksPanel
          copy={contact.links}
          a11y={a11y}
          coverLetterHref={documentUrl("cover-letter", locale)}
        />
      </div>

      <Wordmark name={site.name} />
    </Section>
  );
}
