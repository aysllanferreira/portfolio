import { Quote } from "lucide-react";

import { AccentHeadline } from "@/components/ui/AccentHeadline";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Dictionary } from "@/i18n/types";

interface AboutTextProps {
  copy: Dictionary["about"];
  titleId: string;
}

/** Who he is in his own words: greeting, bio, the values he works by and a motto. */
export function AboutText({ copy, titleId }: AboutTextProps) {
  const [lead, ...rest] = copy.bio;

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-9 desktop:pt-6">
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <AccentHeadline
        id={titleId}
        text={copy.title}
        className="text-[40px] leading-[1.02] font-medium tracking-[-0.04em] text-text-primary tablet:text-[60px] tablet:tracking-[-0.05em] desktop:text-[72px] desktop:tracking-[-0.0417em]"
        accentClassName="text-[48px] leading-[0.96] tracking-normal tablet:text-[72px] desktop:text-[86px]"
      />

      <div className="flex flex-col gap-5">
        <p className="text-[17px] leading-[27px] text-text-primary tablet:text-[20px] tablet:leading-[32px]">
          {lead}
        </p>
        {rest.map((paragraph) => (
          <p
            key={paragraph}
            className="text-body leading-[24px] text-text-muted tablet:text-[17px] tablet:leading-[27px]"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <ol aria-label={copy.valuesLabel} className="shadow-[inset_0_1px_0_var(--color-border)]">
        {copy.values.map((value, index) => (
          <li
            key={value.title}
            className="flex flex-col gap-1 py-4 shadow-[inset_0_-1px_0_var(--color-border)] tablet:flex-row tablet:items-center tablet:gap-5"
          >
            <span aria-hidden className="font-mono text-caption tracking-[0.5px] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[18px] leading-[23px] font-medium text-text-primary tablet:w-[220px] tablet:shrink-0">
              {value.title}
            </span>
            <span className="text-body leading-[19px] text-text-muted tablet:flex-1">
              {value.description}
            </span>
          </li>
        ))}
      </ol>

      <p className="flex items-start gap-4 tablet:items-center">
        <Quote aria-hidden className="size-5 shrink-0 text-accent tablet:mt-0" strokeWidth={2} />
        <span className="font-serif text-[22px] leading-[29px] text-text-primary tablet:text-[26px] tablet:leading-[34px]">
          {copy.motto}
        </span>
      </p>
    </div>
  );
}
