import type { ShaderConfig } from "@/components/effects/shader-config";

/** Shader settings from the contact frame in the design. */
export const contactBackground: ShaderConfig = {
  kind: "section",
  uniforms: {
    u_base: "#0A0A0F",
    u_glow: "#7B5CFF",
    u_cool: "#1D3FA8",
    u_seed: 63,
    u_aurora: 0.4,
    u_dots: 0.16,
    u_beam: 0.06,
  },
};
