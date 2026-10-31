import { Flag } from "@/components/ui/Flag";
import type { Locale } from "@/i18n/config";
import { formatRegion } from "@/lib/format";

import { countries } from "../content";

interface CountryListProps {
  note: string;
  label: string;
  locale: Locale;
}

/** The header aside: how much of the work is shown, and the countries it was built for. */
export function CountryList({ note, label, locale }: CountryListProps) {
  return (
    <div className="flex flex-col gap-5 desktop:fluid-w-400 desktop:shrink-0">
      <p className="text-body leading-[23px] text-text-muted tablet:text-[16px] tablet:leading-[25px]">
        {note}
      </p>
      <ul aria-label={label} className="flex flex-col">
        {countries.map(({ code, count }) => (
          <li
            key={code}
            className="flex items-center gap-3.5 py-2.5 shadow-[inset_0_-1px_0_var(--color-border)]"
          >
            <Flag country={code} />
            <span className="flex-1 text-[16px] text-text-primary">
              {formatRegion(code, locale)}
            </span>
            <span className="font-mono text-[13px] tracking-[0.5px] text-text-muted">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
