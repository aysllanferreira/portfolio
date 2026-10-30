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

export const targets: FidelityTarget[] = sections.flatMap(([name, selector]) =>
  Object.values(widths).map((width) => ({
    name: `${name}-${String(width)}`,
    path: "/en",
    selector,
    width,
  })),
);
