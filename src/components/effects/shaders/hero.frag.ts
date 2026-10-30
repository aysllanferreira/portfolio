/*
 * Hero background: faint grid, drifting violet and blue glows, vignette and grain.
 * Copied verbatim from the design file (hero-bg.glsl); the only change is the u_dpr
 * uniform, which keeps every size in CSS pixels on high-density screens.
 */
export const heroShader = `precision mediump float;

/** @resolution */
uniform vec2 u_resolution;

/** @time */
uniform float u_time;

/** Device pixel ratio: fragment coordinates are scaled back to CSS pixels. */
uniform float u_dpr;

/**
 * @label Base
 * @color
 * @default #0A0A0F
 */
uniform vec3 u_base;

/**
 * @label Glow
 * @color
 * @default #7B5CFF
 */
uniform vec3 u_glow;

/**
 * @label Secondary Glow
 * @color
 * @default #1D3FA8
 */
uniform vec3 u_cool;

/**
 * @label Grid Size
 * @default 64
 * @range 16, 160
 */
uniform float u_grid;

/**
 * @label Grid Opacity
 * @default 0.05
 * @range 0, 0.3
 */
uniform float u_gridOpacity;

/**
 * @label Glow Strength
 * @default 0.22
 * @range 0, 1
 */
uniform float u_glowStrength;

/**
 * @label Grain
 * @default 0.04
 * @range 0, 0.2
 */
uniform float u_grain;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 p = gl_FragCoord.xy / u_dpr;
  p.y = u_resolution.y - p.y;
  vec2 uv = p / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  float t = u_time * 0.15;

  vec3 col = u_base;

  vec2 g = abs(fract(p / u_grid - 0.5) - 0.5) * u_grid;
  float line = 1.0 - smoothstep(0.0, 1.0, min(g.x, g.y));
  float node = 1.0 - smoothstep(1.0, 2.2, length(g));
  vec2 c = uv - vec2(0.74, 0.45);
  c.x *= aspect;
  float mask = smoothstep(1.0, 0.15, length(c));
  col += vec3(1.0) * (line * u_gridOpacity + node * u_gridOpacity * 3.0) * mask;

  vec2 d1 = uv - vec2(0.79 + 0.03 * sin(t), 0.47 + 0.04 * cos(t * 1.3));
  d1.x *= aspect;
  float glow1 = exp(-dot(d1, d1) * 5.0);

  vec2 d2 = uv - vec2(0.08 + 0.04 * cos(t * 0.8), 0.02 + 0.03 * sin(t));
  d2.x *= aspect;
  float glow2 = exp(-dot(d2, d2) * 4.0);

  col += u_glow * glow1 * u_glowStrength + u_cool * glow2 * u_glowStrength * 0.9;

  vec2 v = uv - 0.5;
  col *= 1.0 - dot(v, v) * 0.7;

  col += (hash(p) - 0.5) * u_grain;

  gl_FragColor = vec4(col, 1.0);
}
`;
