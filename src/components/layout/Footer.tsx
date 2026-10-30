// Pencil: rDW3U Footer
import { AfMark } from "@/components/brand/AfMark";
import { site } from "@/content/site";
import { interpolate } from "@/i18n/interpolate";
import type { Dictionary } from "@/i18n/types";

import { BackToTop } from "./BackToTop";
import { Container } from "./Container";

interface FooterProps {
  copy: Pick<Dictionary, "footer" | "nav" | "a11y">;
  year: number;
}

const linkClass =
  "font-mono text-caption tracking-[0.5px] text-text-muted transition-colors hover:text-text-primary";

/**
 * Site footer, drawn by the design at the bottom of the contact section: a single row
 * on desktop, stacked on tablet and mobile (where links wrap into two rows).
 */
export function Footer({ copy, year }: FooterProps) {
  const { footer, nav, a11y } = copy;
  const copyright = interpolate(footer.copyright, { year });
  const shortCopyright = copyright.split(" · ")[0];

  const sectionLinks = (["work", "experience", "stack", "about"] as const).map((id) => (
    <li key={id}>
      <a href={`#${id}`} className={linkClass}>
        {nav.links[id]}
      </a>
    </li>
  ));

  const profileLinks = [
    { label: footer.linkedin, href: site.linkedin.url },
    { label: footer.github, href: site.github.url },
  ].map((profile) => (
    <li key={profile.href}>
      <a href={profile.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {profile.label}
        <span className="sr-only"> ({a11y.opensInNewTab})</span>
      </a>
    </li>
  ));

  return (
    <footer className="relative">
      <Container>
        <div className="flex flex-col gap-5 pt-6 pb-7 shadow-[inset_0_1px_0_var(--color-border)] tablet:pb-8 desktop:flex-row desktop:items-center desktop:justify-between desktop:pb-10">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-bg ring-1 ring-[#a493ff44] ring-inset"
            >
              <AfMark height={14} />
            </span>
            <p className="font-mono text-caption tracking-[0.5px] text-text-muted">
              <span className="tablet:hidden">{shortCopyright}</span>
              <span className="hidden tablet:inline">{copyright}</span>
            </p>
          </div>

          <nav aria-label={footer.linksLabel}>
            <div className="flex flex-col gap-3 tablet:flex-row tablet:gap-8">
              <ul className="flex flex-wrap gap-x-5 gap-y-3 tablet:gap-x-8">{sectionLinks}</ul>
              <ul className="flex gap-x-5 tablet:gap-x-8">{profileLinks}</ul>
            </div>
          </nav>

          <BackToTop label={footer.backToTop} />
        </div>
      </Container>
    </footer>
  );
}
