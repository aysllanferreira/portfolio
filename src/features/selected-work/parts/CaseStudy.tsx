import { ArrowUpRight } from "lucide-react";

import { Flag } from "@/components/ui/Flag";
import { Stat } from "@/components/ui/Stat";
import { Tag } from "@/components/ui/Tag";

import { caseStudy, type CaseMetricKey } from "../content";

interface CaseStudyProps {
  copy: {
    featured: string;
    meta: string;
    title: string;
    description: string;
    metrics: Record<CaseMetricKey, string>;
  };
  newTabHint: string;
}

/** The featured case: who it was for, what it is, the impact in numbers and the stack. */
export function CaseStudy({ copy, newTabHint }: CaseStudyProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-7">
      <div className="flex flex-col items-start gap-2.5 tablet:flex-row tablet:items-center tablet:gap-3">
        <Tag tone="accent" className="uppercase">
          {copy.featured}
        </Tag>
        <Flag country={caseStudy.country} />
        <p className="font-mono text-[13px] tracking-[0.4px] text-text-muted uppercase">
          {copy.meta}
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        <p className="font-mono text-[14px] tracking-[2px] text-text-muted uppercase">
          {caseStudy.name}
        </p>
        <h3 className="text-[26px] leading-[1.15] font-medium tracking-[-0.8px] text-text-primary tablet:text-h2 tablet:tracking-[-1.2px]">
          {copy.title}
        </h3>
      </div>

      <p className="text-body leading-[1.6] text-text-muted tablet:text-[17px]">
        {copy.description}
      </p>

      <dl className="flex flex-col gap-[18px] py-6 shadow-[inset_0_1px_0_var(--color-border),inset_0_-1px_0_var(--color-border)] tablet:flex-row tablet:gap-0">
        {caseStudy.metrics.map((metric) => (
          <Stat
            key={metric.key}
            value={metric.value}
            label={copy.metrics[metric.key]}
            className="flex-1"
            valueClassName="text-[30px]"
          />
        ))}
      </dl>

      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <ul className="grid grid-cols-[repeat(2,max-content)] gap-2 tablet:flex tablet:flex-wrap">
          {caseStudy.integrations.map((integration) => (
            <li key={integration}>
              <Tag className="text-caption">{integration}</Tag>
            </li>
          ))}
        </ul>
        <a
          href={caseStudy.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[15px] font-medium text-text-primary transition-colors hover:text-accent"
        >
          {caseStudy.domain}
          <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
          <span className="sr-only"> ({newTabHint})</span>
        </a>
      </div>
    </div>
  );
}
