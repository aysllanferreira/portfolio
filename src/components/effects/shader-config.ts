/**
 * Shader settings for one section, exactly as set on the section's frame in the design.
 * Colors are hex strings; everything else is a number. Uniforms not listed keep the
 * shader's documented defaults (see `shaderDefaults`).
 */
export type ShaderKind = "hero" | "section";

export type HexColor = `#${string}`;

export interface ShaderConfig {
  kind: ShaderKind;
  uniforms: Record<`u_${string}`, number | HexColor>;
}

/** Defaults declared in each shader's @default annotations. */
export const shaderDefaults: Record<ShaderKind, ShaderConfig["uniforms"]> = {
  hero: {
    u_base: "#0A0A0F",
    u_glow: "#7B5CFF",
    u_cool: "#1D3FA8",
    u_grid: 64,
    u_gridOpacity: 0.05,
    u_glowStrength: 0.22,
    u_grain: 0.04,
  },
  section: {
    u_base: "#0A0A0F",
    u_glow: "#7B5CFF",
    u_cool: "#1D3FA8",
    u_aurora: 0.35,
    u_spacing: 22,
    u_dots: 0.16,
    u_beam: 0.05,
    u_grain: 0.04,
    u_seed: 0,
  },
};
