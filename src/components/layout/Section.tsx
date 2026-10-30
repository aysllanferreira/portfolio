import type { ShaderConfig } from "@/components/effects/shader-config";
import { ShaderBackground } from "@/components/effects/ShaderBackground";
import { cn } from "@/lib/cn";
import type { SectionId } from "@/lib/sections";

import { Container } from "./Container";

import type { ReactNode } from "react";

interface SectionProps {
  id: SectionId | "top";
  /** Id of the heading that names this region for assistive technology. */
  labelledBy: string;
  background: ShaderConfig;
  children: ReactNode;
  /** Vertical rhythm per layout (e.g. `fluid-py-72 tablet:fluid-py-96 desktop:fluid-py-120`). */
  className?: string | undefined;
  containerClassName?: string | undefined;
  /** Decorative layers that span the full section width (outline words, glows). */
  decoration?: ReactNode;
  /** Lets the shader continue under the footer, which the design draws inside the last section. */
  extendBackgroundBelow?: boolean;
}

/** A page section: animated background, top hairline and the centered content column. */
export function Section({
  id,
  labelledBy,
  background,
  children,
  className,
  containerClassName,
  decoration,
  extendBackgroundBelow = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "hairline-top relative isolate",
        extendBackgroundBelow ? "overflow-x-clip" : "overflow-hidden",
        className,
      )}
    >
      <ShaderBackground
        config={background}
        className={cn(extendBackgroundBelow && "bottom-[calc(var(--footer-height)*-1)]")}
      />
      {decoration}
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
