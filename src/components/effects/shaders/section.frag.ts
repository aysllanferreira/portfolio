/*
 * Section background: fbm aurora, dot field, sweeping light beam, edge fade and grain.
 * Copied verbatim from the design file (section-bg.glsl); the only change is the u_dpr
 * uniform, which keeps every size in CSS pixels on high-density screens.
 */
export const sectionShader = `precision mediump float;

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
 * @label Aurora Strength
 * @default 0.35
 * @range 0, 1
 */
uniform float u_aurora;

/**
 * @label Dot Spacing
 * @default 22
 * @range 8, 64
 */
uniform float u_spacing;

/**
 * @label Dot Opacity
 * @default 0.16
 * @range 0, 0.6
 */
uniform float u_dots;

/**
 * @label Beam Strength
 * @default 0.05
 * @range 0, 0.3
 */
uniform float u_beam;

/**
 * @label Grain
 * @default 0.04
 * @range 0, 0.2
 */
uniform float u_grain;

/**
 * @label Seed
 * @default 0
 * @range 0, 100
 */
uniform float u_seed;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = gl_FragCoord.xy / u_dpr;
  p.y = u_resolution.y - p.y;
  vec2 uv = p / u_resolution;
  float t = u_time * 0.05;
  vec2 s = p / 720.0 + vec2(u_seed * 3.1, u_seed * 1.7);

  vec3 col = u_base;

  float n = fbm(s * 0.9 + vec2(t, -t * 0.6));
  float n2 = fbm(s * 1.4 + n * 1.8 - vec2(t * 0.7, t * 0.3));
  float ridge = smoothstep(0.1, 0.0, abs(n2 - 0.52));
  float cloud = smoothstep(0.48, 0.85, n);
  col += u_cool * cloud * u_aurora * 0.9;
  col += u_glow * ridge * n * u_aurora * 0.55;
  col += u_glow * smoothstep(0.62, 0.95, n2) * u_aurora * 0.25;

  vec2 cell = mod(p, u_spacing) - u_spacing * 0.5;
  float dotm = 1.0 - smoothstep(0.5, 1.4, length(cell));
  float field = smoothstep(0.45, 0.78, fbm(floor(p / u_spacing) * 0.06 + vec2(t * 2.0, -t) + u_seed));
  vec3 dotCol = mix(vec3(0.85), u_glow, field);
  col += dotCol * dotm * u_dots * (0.2 + field * 1.4);

  float bp = (p.x + p.y * 0.45) / 1400.0;
  float beam = exp(-pow((fract(bp * 0.5 - t * 0.8) - 0.5) * 30.0, 2.0));
  col += u_glow * beam * u_beam;

  float edge = smoothstep(0.0, 180.0, p.y) * smoothstep(0.0, 180.0, u_resolution.y - p.y);
  col = mix(u_base, col, edge);

  float vx = abs(uv.x - 0.5) * 1.7;
  col *= 1.0 - vx * vx * vx * 0.45;

  col += (hash(p + 0.37) - 0.5) * u_grain;

  gl_FragColor = vec4(col, 1.0);
}
`;
