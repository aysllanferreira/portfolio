"use client";

import { clsx as cn } from "clsx";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useRef } from "react";

import type { SectionId } from "@/lib/sections";

import { useActiveSection } from "../active-section";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface MobileMenuProps {
  labels: { open: string; close: string; title: string; language: string };
  links: readonly { id: SectionId; label: string }[];
  brand: ReactNode;
  languageSwitcher: ReactNode;
  footer: ReactNode;
}

/**
 * Full-screen menu for tablet and mobile (designed in frames bDATw and FkOkd). A native
 * modal dialog provides focus containment, Escape to close, an inert page behind it
 * and focus return to the menu button; links and backdrop clicks also close it.
 */
export function MobileMenu({ labels, links, brand, languageSwitcher, footer }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const active = useActiveSection();

  const close = () => dialogRef.current?.close();

  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  // Keep Tab cycling inside the open menu instead of escaping to the browser UI.
  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const focusable = [...event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (element) => element.offsetParent !== null,
    );
    if (focusable.length === 0) return;
    const index = focusable.indexOf(document.activeElement as HTMLElement);
    const next = event.shiftKey
      ? (index <= 0 ? focusable.length : index) - 1
      : (index + 1) % focusable.length;
    event.preventDefault();
    focusable[next]?.focus();
  };

  return (
    <>
      <button
        type="button"
        aria-label={labels.open}
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="flex size-11 shrink-0 items-center justify-center rounded-pill bg-[#14141b99] text-text-primary ring-1 ring-text-primary/10 backdrop-blur-[20px] ring-inset"
      >
        <Menu aria-hidden className="size-[18px]" strokeWidth={2} />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={labels.title}
        onClick={onDialogClick}
        onKeyDown={onKeyDown}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-text-primary backdrop:bg-bg/80 open:flex"
      >
        <div className="flex min-h-full w-full flex-col gap-9 px-5 pt-4 pb-8 tablet:gap-12 tablet:px-10 tablet:pt-6 tablet:pb-10">
          <div className="flex items-center justify-between">
            {brand}
            <button
              type="button"
              aria-label={labels.close}
              onClick={close}
              className="flex size-11 items-center justify-center rounded-pill bg-[#14141b99] ring-1 ring-text-primary/10 ring-inset"
            >
              <X aria-hidden className="size-[18px]" strokeWidth={2} />
            </button>
          </div>

          <nav aria-label={labels.title}>
            <ol className="flex flex-col">
              {links.map((link, index) => {
                const current = link.id === active;
                return (
                  <li key={link.id} className="shadow-[inset_0_-1px_0_var(--color-border)]">
                    <a
                      href={`#${link.id}`}
                      onClick={close}
                      aria-current={current ? "location" : undefined}
                      className="group flex items-center gap-4 py-[18px] tablet:py-[22px]"
                    >
                      <span
                        className={cn(
                          "font-mono text-caption tracking-[0.5px]",
                          current ? "text-accent" : "text-text-faint",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-[30px] font-medium tracking-[-1px] tablet:text-[44px] tablet:tracking-[-1.6px]",
                          current
                            ? "text-text-primary"
                            : "text-text-muted group-hover:text-text-primary",
                        )}
                      >
                        {link.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className={cn("size-[18px]", current ? "text-accent" : "text-text-faint")}
                        strokeWidth={2}
                      />
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] tracking-[0.5px] text-text-faint uppercase">
              {labels.language}
            </p>
            <div className="flex">{languageSwitcher}</div>
          </div>

          <div className="mt-auto flex items-center justify-between" onClick={close}>
            {footer}
          </div>
        </div>
      </dialog>
    </>
  );
}
