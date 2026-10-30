import type { ShaderConfig } from "@/components/effects/shader-config";

/** Shader settings from the about frame in the design. */
export const aboutBackground: ShaderConfig = {
  kind: "section",
  uniforms: {
    u_base: "#0A0A0F",
    u_glow: "#7B5CFF",
    u_cool: "#1D3FA8",
    u_seed: 12,
    u_aurora: 0.3,
    u_dots: 0.14,
    u_beam: 0.04,
  },
};
