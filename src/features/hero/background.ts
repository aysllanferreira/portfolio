import type { ShaderConfig } from "@/components/effects/shader-config";

/** Shader settings from the hero frame in the design. */
export const heroBackground: ShaderConfig = {
  kind: "hero",
  uniforms: {
    u_base: "#0A0A0F",
    u_glow: "#7B5CFF",
    u_cool: "#1D3FA8",
    u_glowStrength: 0.42,
    u_gridOpacity: 0.05,
  },
};
