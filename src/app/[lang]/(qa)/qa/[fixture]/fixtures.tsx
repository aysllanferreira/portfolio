import { ShaderBackground } from "@/components/effects/ShaderBackground";
import { heroBackground } from "@/features/hero/background";
import { selectedWorkBackground } from "@/features/selected-work/background";

import type { ReactNode } from "react";

/**
 * Isolated renders for end-to-end and design-fidelity tests, keyed by URL slug
 * (`/qa/<name>`). Each fixture reproduces a design instance with its own content.
 */
export const fixtures: Record<string, () => ReactNode> = {
  "shader-hero": () => (
    <div className="relative isolate h-[900px] w-full" data-testid="fixture">
      <ShaderBackground config={heroBackground} />
    </div>
  ),
  "shader-stack": () => (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <section
          key={index}
          className="relative isolate h-[1200px]"
          data-testid={`section-${String(index)}`}
        >
          <ShaderBackground config={selectedWorkBackground} />
        </section>
      ))}
    </>
  ),
};
