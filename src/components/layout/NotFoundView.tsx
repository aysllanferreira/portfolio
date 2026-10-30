import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface NotFoundViewProps {
  copy: Dictionary["notFound"];
  locale: Locale;
}

/** The 404 page body, shared by the localized and the global not-found routes. */
export function NotFoundView({ copy, locale }: NotFoundViewProps) {
  return (
    <main
      id="content"
      className="mx-auto flex min-h-dvh max-w-xl flex-col items-start justify-center gap-6 px-5"
    >
      <p className="font-mono text-caption tracking-[0.04em] text-accent uppercase">{404}</p>
      <h1 className="text-h2 font-medium text-text-primary">{copy.title}</h1>
      <p className="text-body-lg text-text-muted">{copy.body}</p>
      <Link
        href={`/${locale}`}
        className="rounded-pill border border-border-strong px-5 py-3 text-text-primary transition-colors hover:border-accent hover:text-accent"
      >
        {copy.back}
      </Link>
    </main>
  );
}
