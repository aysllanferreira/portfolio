import { FileDown } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { AccentHeadline } from "@/components/ui/AccentHeadline";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/site";
import { getDictionary, resolveLocale } from "@/i18n/get-dictionary";
import { documentUrl } from "@/lib/assets";

import { heroBackground } from "./background";
import { shippedFor } from "./content";
import { CodePanel } from "./parts/CodePanel";
import { HeroStats } from "./parts/HeroStats";

/**
 * Hero (design frames ZWWbh · pcbrh · zuuUd): who Aysllan is and what he ships, the two
 * primary actions, clients, an editor panel and headline numbers. The navbar is fixed,
 * so the top padding reserves its place exactly where the design draws it.
 */
export async function Hero() {
  const [{ hero, a11y }, locale] = await Promise.all([getDictionary(), resolveLocale()]);
  const interviewHref = `mailto:${site.email}?subject=${encodeURIComponent(hero.interviewSubject)}`;

  return (
    <Section
      id="top"
      labelledBy="top-title"
      background={heroBackground}
      hairline={false}
      className="fluid-pt-104 fluid-pb-48 tablet:fluid-pt-132 tablet:fluid-pb-56 desktop:fluid-pt-152 desktop:fluid-pb-36"
      containerClassName="flex flex-col fluid-gap-44 tablet:fluid-gap-64 desktop:fluid-gap-78"
    >
      <div className="flex flex-col fluid-gap-48 desktop:flex-row desktop:items-center desktop:fluid-gap-72">
        <div className="flex min-w-0 flex-col gap-6 tablet:gap-7 desktop:fluid-w-760 desktop:shrink-0">
          <Eyebrow labelClassName="text-[11px] tablet:text-[13px]">
            <span className="tablet:hidden">{hero.eyebrowShort}</span>
            <span className="hidden tablet:inline">{hero.eyebrow}</span>
          </Eyebrow>

          <AccentHeadline
            as="h1"
            id="top-title"
            text={hero.headline}
            className="fluid-text-44 leading-[1.02] font-medium tracking-[-0.0417em] text-text-primary tablet:fluid-text-72 desktop:fluid-text-84"
            accentClassName="leading-[0.98] tracking-[-1px] fluid-text-54 tablet:fluid-text-86 desktop:fluid-text-100"
          />

          <p className="text-[16px] leading-[1.55] text-text-muted tablet:text-body-lg desktop:fluid-max-w-600">
            {hero.subhead}
          </p>

          <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:gap-4">
            <Button href={interviewHref} className="w-full justify-between tablet:w-auto">
              {hero.cta.interview}
            </Button>
            <Button
              variant="secondary"
              icon={FileDown}
              href={documentUrl("resume", locale)}
              hint={a11y.downloadsPdf}
              className="w-full tablet:w-auto"
            >
              {hero.cta.resume}
            </Button>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <p className="font-mono text-[11px] tracking-[1px] text-text-muted uppercase">
              {hero.shippedFor}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2.5 tablet:gap-x-7">
              {shippedFor.map((name) => (
                <li
                  key={name}
                  className="text-[15px] font-semibold tracking-[-0.3px] text-text-muted tablet:text-[16px]"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CodePanel label={hero.codeLabel} />
      </div>

      <HeroStats labels={hero.stats} scrollHint={hero.scrollHint} />
    </Section>
  );
}
