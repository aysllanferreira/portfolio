"use client";

import { ArrowUp } from "lucide-react";

import type { MouseEvent } from "react";

/**
 * Scrolls back to the top (instantly when motion is reduced) and moves keyboard focus
 * to the main content, so the next Tab continues from the start of the page. Without
 * JavaScript it is a plain link to the top.
 */
export function BackToTop({ label }: { label: string }) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
    document.getElementById("content")?.focus({ preventScroll: true });
    history.replaceState(null, "", window.location.pathname);
  };

  return (
    <a
      href="#top"
      onClick={onClick}
      className="inline-flex items-center gap-2 font-mono text-caption tracking-[0.5px] text-text-primary uppercase transition-colors hover:text-accent"
    >
      {label}
      <ArrowUp aria-hidden className="size-3.5" strokeWidth={2} />
    </a>
  );
}
