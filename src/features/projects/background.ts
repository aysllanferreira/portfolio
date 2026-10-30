import type { ShaderConfig } from "@/components/effects/shader-config";

/** Shader settings from the projects frame in the design. */
export const projectsBackground: ShaderConfig = {
  kind: "section",
  uniforms: {
    u_base: "#0A0A0F",
    u_glow: "#7B5CFF",
    u_cool: "#1D3FA8",
    u_seed: 7,
    u_aurora: 0.42,
    u_dots: 0.16,
    u_beam: 0.05,
  },
};
