import type { ShaderConfig } from "@/components/effects/shader-config";

/** Shader settings from the selected-work frame in the design. */
export const selectedWorkBackground: ShaderConfig = {
  kind: "section",
  uniforms: {
    u_base: "#0A0A0F",
    u_glow: "#7B5CFF",
    u_cool: "#1D3FA8",
    u_seed: 23,
    u_aurora: 0.38,
    u_dots: 0.16,
    u_beam: 0.05,
  },
};
