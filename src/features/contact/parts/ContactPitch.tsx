import { ArrowUpRight, FileDown } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { interpolate } from "@/i18n/interpolate";
import type { Dictionary } from "@/i18n/types";

interface ContactPitchProps {
  copy: Dictionary["contact"];
  a11y: Dictionary["a11y"];
  resumeHref: string;
}

/** Who he is looking to work with, the two ways to start, and the practical facts. */
export function ContactPitch({ copy, a11y, resumeHref }: ContactPitchProps) {
  const facts = [
    {
      ...copy.facts.localTime,
      value: interpolate(copy.facts.localTime.value, { offset: site.location.utcOffset }),
    },
    copy.facts.languages,
    copy.facts.works,
  ];

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-7 tablet:gap-9">
      <p className="text-[16px] leading-[25px] text-text-muted tablet:max-w-[560px] tablet:text-[20px] tablet:leading-[31px]">
        {copy.pitch}
      </p>

      <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:gap-7">
        <Button
          href={site.linkedin.url}
          external={{ hint: a11y.opensInNewTab }}
          icon={ArrowUpRight}
          className="w-full justify-between tablet:w-auto"
        >
          {copy.cta.linkedin}
        </Button>
        <Button
          variant="secondary"
          icon={FileDown}
          href={resumeHref}
          hint={a11y.downloadsPdf}
          className="w-full tablet:w-auto"
        >
          {copy.cta.resume}
        </Button>
      </div>

      <dl className="flex flex-col gap-3.5 pt-7 shadow-[inset_0_1px_0_var(--color-border)] tablet:max-w-[560px] tablet:flex-row tablet:gap-12">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1.5">
            <dt className="font-mono text-[11px] tracking-[0.5px] text-text-faint uppercase">
              {fact.label}
            </dt>
            <dd className="text-body leading-[19px] text-text-primary">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
