"use client";

import { useSyncExternalStore } from "react";

import { navSectionIds, type SectionId } from "@/lib/sections";

/*
 * Which navigable section is currently being read. One IntersectionObserver feeds
 * every subscriber (the links pill, the language switcher, the mobile menu), so
 * they always agree and the page observes its sections only once.
 */

type Listener = () => void;

const listeners = new Set<Listener>();
let current: SectionId = navSectionIds[0];
let observer: IntersectionObserver | undefined;
const visible = new Map<SectionId, number>();

function pick(): SectionId {
  let best: SectionId = navSectionIds[0];
  let bestRatio = 0;
  for (const id of navSectionIds) {
    const ratio = visible.get(id) ?? 0;
    if (ratio > bestRatio) {
      best = id;
      bestRatio = ratio;
    }
  }
  // Above the first section (the hero), the first link stays active, as in the design.
  return bestRatio > 0 ? best : current;
}

function start() {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        visible.set(
          entry.target.id as SectionId,
          entry.isIntersecting ? entry.intersectionRatio : 0,
        );
      }
      const next = pick();
      if (next !== current) {
        current = next;
        for (const listener of listeners) listener();
      }
    },
    // A section counts once it crosses the reading band in the upper middle of the screen.
    { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
  );
  for (const id of navSectionIds) {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  }
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  if (!observer) start();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      observer?.disconnect();
      observer = undefined;
      visible.clear();
    }
  };
}

export function useActiveSection(): SectionId {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => navSectionIds[0],
  );
}
