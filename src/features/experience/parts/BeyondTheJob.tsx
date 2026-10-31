import { GraduationCap, Quote } from "lucide-react";

import { AssetImage } from "@/components/media/AssetImage";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";

import { teachingItems, testimonial } from "../content";

interface BeyondTheJobProps {
  copy: Dictionary["experience"];
}

const { zoom, x, y } = testimonial.photoFrame;

/** A manager's recommendation and the teaching and community work around the jobs. */
export function BeyondTheJob({ copy }: BeyondTheJobProps) {
  return (
    <div className="flex flex-col gap-5 desktop:flex-row desktop:gap-6">
      <figure className="flex flex-1 flex-col justify-between gap-6 rounded-lg bg-[#14141bcc] bg-[radial-gradient(80%_80%_at_0%_0%,#a493ff1f,#a493ff00)] p-7 shadow-panel ring-1 ring-[#a493ff33] backdrop-blur-[20px] ring-inset tablet:p-10 desktop:h-[456px] desktop:gap-7">
        <Quote aria-hidden className="size-8 shrink-0 text-accent" strokeWidth={2} />
        <blockquote lang="en" className="flex flex-col gap-6 desktop:gap-7">
          <p className="font-serif text-[26px] leading-[1.2] text-text-primary tablet:text-[40px]">
            {testimonial.quote}
          </p>
          {/* The design breaks this line in two on tablets, where the card is narrower. */}
          <p className="text-body leading-[23px] text-text-muted tablet:max-w-[640px] tablet:text-[17px] tablet:leading-[26px] desktop:max-w-none">
            {testimonial.more}
          </p>
        </blockquote>
        <figcaption className="flex items-center gap-3.5 pt-2">
          <span className="relative size-14 shrink-0 overflow-hidden rounded-full after:absolute after:inset-0 after:rounded-full after:ring-2 after:ring-[#a493ff55] after:ring-inset">
            <AssetImage
              name={testimonial.photo}
              alt=""
              sizes="90px"
              className="absolute inset-0"
              imgClassName="max-w-none origin-top-left"
              imgStyle={{
                width: `${String(zoom * 100)}%`,
                transform: `translate(${String(-x * 100)}%, ${String(-y * 100)}%)`,
              }}
            />
          </span>
          <span className="flex flex-col gap-[3px]">
            <cite className="text-[16px] font-medium text-text-primary not-italic">
              {testimonial.name}
            </cite>
            <span className="font-mono text-[11px] tracking-[0.4px] text-text-muted uppercase">
              {copy.testimonial.role}
            </span>
          </span>
        </figcaption>
      </figure>

      <section
        aria-labelledby="teaching-title"
        className="rounded-lg bg-[#0f0f15b3] px-6 pt-7 pb-5 ring-1 ring-border backdrop-blur-[16px] ring-inset tablet:px-9 tablet:pt-9 tablet:pb-7 desktop:w-[520px] desktop:shrink-0"
      >
        <h3
          id="teaching-title"
          className="flex items-center gap-2.5 pb-5 font-mono text-caption tracking-[0.4px] text-text-primary uppercase"
        >
          <GraduationCap aria-hidden className="size-[18px] text-accent" strokeWidth={2} />
          {copy.teaching.title}
        </h3>
        <ul>
          {teachingItems.map(({ key, accent }) => (
            <li
              key={key}
              className="flex items-center gap-5 py-4 shadow-[inset_0_1px_0_var(--color-border)]"
            >
              <strong
                className={cn(
                  "w-[120px] shrink-0 text-h3 leading-[31px] font-medium",
                  accent ? "text-accent" : "text-text-primary",
                )}
              >
                {copy.teaching.items[key].value}
              </strong>
              <span className="text-body leading-[22px] text-text-muted">
                {copy.teaching.items[key].label}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
