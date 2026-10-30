import { cn } from "@/lib/cn";

import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string | undefined;
}

/**
 * The design's content column: 1312px wide at 1440 with 64px margins, 40px margins on
 * tablet and 20px on mobile, all scaled with the anchored fluid unit in between.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] fluid-px-20 tablet:fluid-px-40 desktop:fluid-px-64",
        className,
      )}
    >
      {children}
    </div>
  );
}
