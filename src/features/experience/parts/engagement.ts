import type { Engagement } from "../content";

/** Legend swatches and timeline bars share one color per engagement type. */
export const engagementStyles: Record<Engagement, { swatch: string; bar: string }> = {
  fullTime: { swatch: "bg-accent", bar: "bg-accent/85" },
  contract: { swatch: "bg-info", bar: "bg-info/85" },
  partTime: { swatch: "bg-[#9a9aab]", bar: "bg-[#9a9aab]/85" },
};

/** The ongoing role fades in from its start and stays solid up to now. */
export const currentBar = "bg-linear-[270deg] from-accent/40 to-accent";

export const engagementOrder: readonly Engagement[] = ["fullTime", "contract", "partTime"];
