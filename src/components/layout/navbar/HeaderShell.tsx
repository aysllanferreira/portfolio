"use client";

import { clsx as cn } from "clsx";
import { useEffect, useState } from "react";

import type { ReactNode } from "react";

/**
 * The sticky header. Over the hero it sits exactly where the design places the navbar;
 * once the page scrolls, a soft fade from the page color keeps it legible over content.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-4 tablet:pt-6 desktop:pt-7",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-[calc(100%+24px)] before:bg-linear-to-b before:from-bg before:via-bg/85 before:to-transparent before:transition-opacity before:duration-300",
        scrolled ? "before:opacity-100" : "before:opacity-0",
      )}
    >
      {children}
    </header>
  );
}
