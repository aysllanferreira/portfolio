import type { DesignBox } from "./compare";

/**
 * What the fidelity check compares: a page region at a viewport width against the
 * design export at `.fidelity/refs/<name>.png` (exported from the design at 1x).
 * Shader canvases are masked: their animated output is checked separately.
 */
export interface FidelityTarget {
  name: string;
  path: string;
  selector: string;
  width: number;
  height?: number;
  /** The node's own box in the design; exports include room for shadows, which is cropped away. */
  designBox?: DesignBox;
  /** Reviewed by eye instead of failing on pixels, with the reason it cannot match exactly. */
  exception?: string;
}

const widths = { mobile: 390, tablet: 834, desktop: 1440 } as const;

const sections = [
  ["hero", "#top"],
  ["selected-work", "#work"],
  ["projects", "#projects"],
  ["experience", "#experience"],
  ["stack", "#stack"],
  ["about", "#about"],
  ["contact", "#contact"],
] as const;

/** Components rendered in isolation by the QA harness, compared with their design definitions. */
const components = {
  "button-primary": [275, 60],
  "button-secondary": [211, 55],
  "button-light": [111, 40],
  "button-icon": [44, 44],
  eyebrow: [146, 17],
  tag: [78, 24],
  "tag-accent": [57, 24],
  flag: [24, 16],
  status: [131, 14],
  stat: [124, 69],
  "af-mark": [233, 181],
  "tech-chip": [85, 30],
  "link-row": [520, 88],
  "project-card": [420, 312],
  "spotlight-card": [528, 539],
  "core-tile": [205, 220],
  "role-row": [1328, 246],
} as const satisfies Record<string, readonly [number, number]>;

/** Outer shadow offsets of components whose design export is shifted by them. */
const shadowOffsets: Partial<Record<string, { x: number; y: number }>> = {
  "button-primary": { x: 0, y: 12 },
  "button-light": { x: 0, y: 6 },
  "spotlight-card": { x: 0, y: 30 },
};

/** Targets whose pixels cannot match across renderers, reviewed visually instead. */
const exceptions: Partial<Record<string, string>> = {
  flag: "24×16 flags have 13 sub-pixel stripes that each renderer resamples differently",
  status: "a 14px-tall label where a one-pixel baseline difference dominates the area",
};

export const targets: FidelityTarget[] = [
  ...Object.entries(components).map(([name, [width, height]]) => ({
    name: `component-${name}`,
    path: `/en/qa/${name}`,
    selector: '[data-testid="fixture"] > *',
    width: 1440,
    designBox: {
      width,
      height,
      ...(shadowOffsets[name] ? { shadowOffset: shadowOffsets[name] } : {}),
    },
    ...(exceptions[name] ? { exception: exceptions[name] } : {}),
  })),
  ...sections.flatMap(([name, selector]) =>
    Object.values(widths).map((width) => ({
      name: `${name}-${String(width)}`,
      path: "/en",
      selector,
      width,
    })),
  ),
];
