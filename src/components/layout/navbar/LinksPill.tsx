"use client";

import { clsx as cn } from "clsx";

import type { SectionId } from "@/lib/sections";

import { useActiveSection } from "../active-section";

interface LinksPillProps {
  label: string;
  links: readonly { id: SectionId; label: string }[];
}

/** The glass pill of section links; the section being read is highlighted. */
export function LinksPill({ label, links }: LinksPillProps) {
  const active = useActiveSection();

  return (
    <nav aria-label={label}>
      <ul className="flex items-center gap-0.5 rounded-pill bg-[#14141b99] p-[5px] ring-1 ring-text-primary/10 backdrop-blur-[20px] ring-inset">
        {links.map((link) => {
          const current = link.id === active;
          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "block rounded-pill px-4 py-[9px] text-[14px] font-medium transition-colors",
                  current
                    ? "bg-text-primary/[0.08] text-text-primary"
                    : "text-text-muted hover:text-text-primary",
                )}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
