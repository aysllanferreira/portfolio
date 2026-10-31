import { Download, FilePenLine, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/brand/social-icons";
import { LinkRow } from "@/components/ui/LinkRow";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n/types";

interface LinksPanelProps {
  copy: Dictionary["contact"]["links"];
  a11y: Dictionary["a11y"];
  coverLetterHref: string;
}

/** Every way to reach him, one row each; the whole row is the link. */
export function LinksPanel({ copy, a11y, coverLetterHref }: LinksPanelProps) {
  return (
    <nav
      aria-label={copy.label}
      className="glass flex flex-col rounded-lg bg-[#14141bb8] px-4 py-1 shadow-panel [--glass-edge-stop:70%] [--glass-edge:#a493ff44] tablet:px-7 tablet:py-2 desktop:w-[560px] desktop:shrink-0"
    >
      <LinkRow
        icon={Mail}
        label={copy.email}
        value={site.email}
        href={`mailto:${site.email}`}
        hint={a11y.opensMailApp}
      />
      <LinkRow
        icon={LinkedinIcon}
        label={copy.linkedin}
        value={site.linkedin.handle}
        href={site.linkedin.url}
        hint={a11y.opensInNewTab}
        newTab
      />
      <LinkRow
        icon={GithubIcon}
        label={copy.github}
        value={site.github.handle}
        href={site.github.url}
        hint={a11y.opensInNewTab}
        newTab
      />
      <LinkRow
        icon={FilePenLine}
        label={copy.coverLetter}
        value={copy.coverLetterValue}
        href={coverLetterHref}
        hint={a11y.downloadsPdf}
        trailingIcon={Download}
      />
    </nav>
  );
}
