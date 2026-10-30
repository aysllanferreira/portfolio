/**
 * Deterministic render mode for visual tests (shaders frozen). Safe for client
 * components: it reads the build-inlined variable directly, without pulling the
 * validation schema into the browser bundle. The value is validated at build time
 * by src/lib/env.ts, which next.config.ts imports.
 */
export const isTestRender = process.env.NEXT_PUBLIC_RENDER_MODE === "test";
