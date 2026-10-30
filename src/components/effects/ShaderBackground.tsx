"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { isTestRender } from "@/lib/env";

import { createShaderRenderer, type ShaderRenderer } from "./renderer";

import type { ShaderConfig } from "./shader-config";

/**
 * idle      – not near the viewport (or tab hidden): no frames drawn, no context held
 * animating – drawing frames
 * static    – one frame drawn, motion reduced
 * fallback  – WebGL unavailable or lost; a CSS gradient stands in
 */
export type ShaderState = "idle" | "animating" | "static" | "fallback";

interface ShaderBackgroundProps {
  config: ShaderConfig;
  className?: string;
}

/** Sections within this distance of the viewport keep a live context. */
const ROOT_MARGIN = "50% 0px";

/** Deterministic frames for visual tests: time frozen, film grain off. */
const TEST_OVERRIDES = isTestRender ? { u_grain: 0 } : undefined;

const CANVAS_CLASSES =
  "block size-full opacity-0 motion-safe:transition-opacity motion-safe:duration-700";

/**
 * Animated WebGL background behind a section. Content never waits for it: the section
 * shows its solid base color until the first frame, then the canvas fades in. Each
 * activation mounts a fresh canvas and every release destroys it, so only sections near
 * the viewport hold a GPU context.
 */
export function ShaderBackground({ config, className }: ShaderBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ShaderState>("idle");

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let canvas: HTMLCanvasElement | null = null;
    let renderer: ShaderRenderer | null = null;
    let frame = 0;
    let visible = false;
    let failed = false;
    const startedAt = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      if (!canvas || !renderer) return;
      const { width, height } = canvas.getBoundingClientRect();
      renderer.resize(width, height, window.devicePixelRatio);
    };
    const resizing = new ResizeObserver(resize);

    const draw = () => {
      renderer?.render(isTestRender ? 0 : (performance.now() - startedAt) / 1000);
      canvas?.classList.add("opacity-100");
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const release = () => {
      stop();
      if (!canvas) return;
      canvas.removeEventListener("webglcontextlost", onContextLost);
      resizing.unobserve(canvas);
      renderer?.dispose();
      canvas.remove();
      canvas = null;
      renderer = null;
    };

    function onContextLost() {
      release();
      failed = true;
      setState("fallback");
    }

    const mount = (): boolean => {
      canvas = document.createElement("canvas");
      canvas.className = CANVAS_CLASSES;
      wrapper.append(canvas);
      renderer = createShaderRenderer(canvas, config, TEST_OVERRIDES);
      if (!renderer) {
        onContextLost();
        return false;
      }
      canvas.addEventListener("webglcontextlost", onContextLost);
      resizing.observe(canvas);
      resize();
      return true;
    };

    const sync = () => {
      if (failed) return;
      if (!visible) {
        release();
        setState("idle");
        return;
      }
      if (!renderer && !mount()) return;
      if (document.hidden) {
        stop();
        setState("idle");
      } else if (reducedMotion.matches) {
        stop();
        draw();
        setState("static");
      } else if (!frame) {
        loop();
        setState("animating");
      }
    };

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        sync();
      },
      { rootMargin: ROOT_MARGIN },
    );

    intersection.observe(wrapper);
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);

    return () => {
      intersection.disconnect();
      resizing.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", sync);
      release();
    };
  }, [config]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      data-shader-state={state}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-bg",
        state === "fallback" &&
          (config.kind === "hero"
            ? "bg-[radial-gradient(60%_70%_at_80%_47%,#7b5cff38,transparent_70%),radial-gradient(50%_60%_at_8%_2%,#1d3fa82e,transparent_70%)]"
            : "bg-[radial-gradient(55%_60%_at_85%_20%,#7b5cff24,transparent_70%),radial-gradient(60%_65%_at_10%_80%,#1d3fa826,transparent_70%)]"),
        className,
      )}
    />
  );
}
