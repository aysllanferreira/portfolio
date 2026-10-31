import { shaderDefaults, type HexColor, type ShaderConfig } from "./shader-config";
import { heroShader } from "./shaders/hero.frag";
import { sectionShader } from "./shaders/section.frag";

/** Rendering above this density costs GPU time without a visible difference for soft gradients. */
export const MAX_DPR = 1.5;

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

/** One triangle that covers the whole viewport (cheaper than a two-triangle quad). */
const FULLSCREEN_TRIANGLE = new Float32Array([-1, -1, 3, -1, -1, 3]);

const fragmentSources = { hero: heroShader, section: sectionShader };

export type UniformValue = number | [number, number, number];

export function hexToVec3(hex: HexColor): [number, number, number] {
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!match) throw new Error(`Expected a #RRGGBB color, got "${hex}"`);
  return [match[1], match[2], match[3]].map((channel) => parseInt(channel ?? "0", 16) / 255) as [
    number,
    number,
    number,
  ];
}

export function capDpr(devicePixelRatio: number): number {
  return Math.min(Math.max(devicePixelRatio, 1), MAX_DPR);
}

/** The config merged over the shader defaults, colors converted to vec3. */
export function resolveUniforms(
  config: ShaderConfig,
  overrides: Partial<Record<`u_${string}`, number>> = {},
): Record<string, UniformValue> {
  const merged = { ...shaderDefaults[config.kind], ...config.uniforms, ...overrides };
  const resolved: Record<string, UniformValue> = {};
  for (const [name, value] of Object.entries(merged)) {
    if (value === undefined) continue;
    resolved[name] = typeof value === "string" ? hexToVec3(value) : value;
  }
  return resolved;
}

export interface ShaderRenderer {
  /** Draws one frame at `time` seconds. */
  render(time: number): void;
  /** Matches the drawing buffer to the canvas' CSS size. */
  resize(cssWidth: number, cssHeight: number, devicePixelRatio: number): void;
  dispose(): void;
}

/**
 * Compiles a full-screen fragment shader. Returns null when WebGL is unavailable or
 * the program fails to build, so callers can fall back to a static background.
 */
export function createShaderRenderer(
  canvas: HTMLCanvasElement,
  config: ShaderConfig,
  {
    overrides,
    allowSoftwareRendering = false,
  }: {
    overrides?: Partial<Record<`u_${string}`, number>> | undefined;
    /**
     * Without a GPU, browsers emulate WebGL on the CPU, where a full-screen shader
     * costs seconds of main-thread time; such devices get the static background.
     * Test renders allow it, so headless screenshots still include the shader.
     */
    allowSoftwareRendering?: boolean;
  } = {},
): ShaderRenderer | null {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: !allowSoftwareRendering,
  });
  if (!gl) return null;

  const program = buildProgram(gl, VERTEX_SHADER, fragmentSources[config.kind]);
  if (!program) return null;

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, FULLSCREEN_TRIANGLE, gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.useProgram(program);

  for (const [name, value] of Object.entries(resolveUniforms(config, overrides))) {
    const location = gl.getUniformLocation(program, name);
    if (Array.isArray(value)) gl.uniform3fv(location, value);
    else gl.uniform1f(location, value);
  }

  const resolution = gl.getUniformLocation(program, "u_resolution");
  const time = gl.getUniformLocation(program, "u_time");
  const dpr = gl.getUniformLocation(program, "u_dpr");

  return {
    render(seconds) {
      gl.uniform1f(time, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    resize(cssWidth, cssHeight, devicePixelRatio) {
      const ratio = capDpr(devicePixelRatio);
      canvas.width = Math.max(1, Math.round(cssWidth * ratio));
      canvas.height = Math.max(1, Math.round(cssHeight * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width / ratio, canvas.height / ratio);
      gl.uniform1f(dpr, ratio);
    },
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}

function buildProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
): WebGLProgram | null {
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function compile(gl: WebGLRenderingContext, type: GLenum, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}
