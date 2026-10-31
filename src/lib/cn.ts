import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge, validators } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default theme. Registering the design tokens
 * (src/styles/tokens.css) and the fluid utilities (src/styles/fluid.css) lets it tell
 * `text-h3` (size) from `text-text-muted` (color) and dedupe `fluid-*` classes.
 */
type FluidClassGroup =
  | "fluid-text"
  | "fluid-p"
  | "fluid-px"
  | "fluid-py"
  | "fluid-pt"
  | "fluid-pb"
  | "fluid-gap"
  | "fluid-gap-x"
  | "fluid-gap-y"
  | "fluid-mt"
  | "fluid-w"
  | "fluid-h"
  | "fluid-max-w";

const twMerge = extendTailwindMerge<FluidClassGroup>({
  extend: {
    theme: {
      color: [
        "bg",
        "surface",
        "surface-2",
        "glass",
        "border",
        "border-strong",
        "text-primary",
        "text-muted",
        "text-faint",
        "accent",
        "accent-strong",
        "accent-soft",
        "accent-tint",
        "on-accent",
        "success",
        "info",
        "cool",
      ],
      text: ["display", "h1", "h2", "h3", "body-lg", "body", "caption", "caption-sm"],
      radius: ["sm", "md", "lg", "xl", "pill"],
      shadow: ["glow", "panel", "panel-lg"],
      breakpoint: ["tablet", "desktop"],
      font: ["sans", "mono", "serif"],
    },
    classGroups: {
      "fluid-text": [{ "fluid-text": [validators.isNumber] }],
      "fluid-p": [{ "fluid-p": [validators.isNumber] }],
      "fluid-px": [{ "fluid-px": [validators.isNumber] }],
      "fluid-py": [{ "fluid-py": [validators.isNumber] }],
      "fluid-pt": [{ "fluid-pt": [validators.isNumber] }],
      "fluid-pb": [{ "fluid-pb": [validators.isNumber] }],
      "fluid-gap": [{ "fluid-gap": [validators.isNumber] }],
      "fluid-gap-x": [{ "fluid-gap-x": [validators.isNumber] }],
      "fluid-gap-y": [{ "fluid-gap-y": [validators.isNumber] }],
      "fluid-mt": [{ "fluid-mt": [validators.isNumber] }],
      "fluid-w": [{ "fluid-w": [validators.isNumber] }],
      "fluid-h": [{ "fluid-h": [validators.isNumber] }],
      "fluid-max-w": [{ "fluid-max-w": [validators.isNumber] }],
    },
    conflictingClassGroups: {
      "fluid-p": ["fluid-px", "fluid-py", "fluid-pt", "fluid-pb"],
      "fluid-py": ["fluid-pt", "fluid-pb"],
      "fluid-gap": ["fluid-gap-x", "fluid-gap-y"],
      // A fluid size replaces a fixed one in either order, e.g. a section overriding
      // a component default of `h-[220px]` with `fluid-h-200`.
      "fluid-text": ["font-size"],
      "font-size": ["fluid-text"],
      "fluid-w": ["w", "size"],
      w: ["fluid-w"],
      "fluid-h": ["h", "size"],
      h: ["fluid-h"],
      size: ["fluid-w", "fluid-h"],
      "fluid-max-w": ["max-w"],
      "max-w": ["fluid-max-w"],
    },
  },
});

/** Composes class names and resolves Tailwind conflicts so the last utility wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
