import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { aboutBackground } from "@/features/about/background";
import { contactBackground } from "@/features/contact/background";
import { experienceBackground } from "@/features/experience/background";
import { heroBackground } from "@/features/hero/background";
import { projectsBackground } from "@/features/projects/background";
import { selectedWorkBackground } from "@/features/selected-work/background";
import { stackBackground } from "@/features/stack/background";

import { capDpr, createShaderRenderer, hexToVec3, MAX_DPR, resolveUniforms } from "./renderer";
import { heroShader } from "./shaders/hero.frag";
import { sectionShader } from "./shaders/section.frag";
import pencilShaders from "../../../tests/fixtures/pencil-shaders.json";

try {
  process.loadEnvFile(".env.local");
} catch {
  // The source comparison only runs where the design files are available.
}

const uniforms = (source: string) =>
  [...source.matchAll(/uniform \w+ (u_\w+);/g)].map((match) => match[1]).sort();

const dprPatch = (source: string) =>
  source
    .replace(
      "\n\n/** Device pixel ratio: fragment coordinates are scaled back to CSS pixels. */\nuniform float u_dpr;",
      "",
    )
    .replace("gl_FragCoord.xy / u_dpr;", "gl_FragCoord.xy;");

describe("shader sources", () => {
  it.each([
    [
      "hero",
      heroShader,
      [
        "u_cool",
        "u_dpr",
        "u_glow",
        "u_glowStrength",
        "u_grain",
        "u_grid",
        "u_gridOpacity",
        "u_resolution",
        "u_time",
        "u_base",
      ],
    ],
    [
      "section",
      sectionShader,
      [
        "u_aurora",
        "u_base",
        "u_beam",
        "u_cool",
        "u_dots",
        "u_dpr",
        "u_glow",
        "u_grain",
        "u_resolution",
        "u_seed",
        "u_spacing",
        "u_time",
      ],
    ],
  ])("%s declares every design uniform plus u_dpr", (_name, source, expected) => {
    expect(uniforms(source)).toEqual([...expected].sort());
  });

  const designDir = process.env.ASSETS_SOURCE_DIR ?? "";
  it.runIf(Boolean(designDir) && existsSync(resolve(designDir, "hero-bg.glsl")))(
    "differ from the design files only by the device-pixel-ratio patch",
    () => {
      for (const [source, file] of [
        [heroShader, "hero-bg.glsl"],
        [sectionShader, "section-bg.glsl"],
      ] as const) {
        const original = readFileSync(resolve(designDir, file), "utf8").replace(/\r\n/g, "\n");
        expect(dprPatch(source).trimEnd()).toBe(original.trimEnd());
      }
    },
  );
});

describe("renderer helpers", () => {
  it("converts hex colors to normalized vec3", () => {
    expect(hexToVec3("#FFFFFF")).toEqual([1, 1, 1]);
    expect(hexToVec3("#7B5CFF").map((c) => Number(c.toFixed(3)))).toEqual([0.482, 0.361, 1]);
    expect(() => hexToVec3("#FFF")).toThrow();
  });

  it("caps the device pixel ratio", () => {
    expect(capDpr(3)).toBe(MAX_DPR);
    expect(capDpr(1.25)).toBe(1.25);
    expect(capDpr(0.5)).toBe(1);
  });

  it("merges a section's uniforms over the shader defaults", () => {
    const resolved = resolveUniforms(experienceBackground);
    expect(resolved.u_seed).toBe(41);
    expect(resolved.u_spacing).toBe(22);
    expect(resolved.u_grain).toBe(0.04);
    expect(resolved.u_base).toEqual(hexToVec3("#0A0A0F"));
    expect(resolveUniforms(experienceBackground, { u_grain: 0 }).u_grain).toBe(0);
  });

  it("asks for a hardware context unless software rendering is allowed", () => {
    const contexts: WebGLContextAttributes[] = [];
    const canvas = {
      getContext: (_type: string, attributes: WebGLContextAttributes) => {
        contexts.push(attributes);
        return null;
      },
    } as unknown as HTMLCanvasElement;
    expect(createShaderRenderer(canvas, experienceBackground)).toBeNull();
    createShaderRenderer(canvas, experienceBackground, { allowSoftwareRendering: true });
    expect(contexts.map((context) => context.failIfMajorPerformanceCaveat)).toEqual([true, false]);
  });
});

describe("section backgrounds", () => {
  const configs = {
    hero: heroBackground,
    "selected-work": selectedWorkBackground,
    projects: projectsBackground,
    experience: experienceBackground,
    stack: stackBackground,
    about: aboutBackground,
    contact: contactBackground,
  };

  it.each(Object.entries(configs))("%s matches its frame in the design", (section, config) => {
    const design = pencilShaders[section as keyof typeof pencilShaders];
    expect(config.kind).toBe(design.url.startsWith("hero") ? "hero" : "section");
    expect(config.uniforms).toEqual(design.uniforms);
  });
});
