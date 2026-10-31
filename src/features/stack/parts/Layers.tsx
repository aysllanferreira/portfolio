import { Fragment } from "react";

import { TechChip } from "@/components/ui/TechChip";
import type { Dictionary } from "@/i18n/types";

import { layers, type Layer, type Tool } from "../content";

interface LayersProps {
  copy: Dictionary["stack"];
}

const toolLabel = (tool: Tool, copy: Dictionary["stack"]) =>
  tool.key ? copy.tools[tool.key] : tool.name;

/**
 * The stack layer by layer: what it is for, the tools, and where it shipped. A rail
 * links the layers on desktop, where the column headers are shown; each layer is
 * also its own headed list item, so the structure reads the same without them.
 */
export function Layers({ copy }: LayersProps) {
  return (
    <div className="glass relative overflow-hidden rounded-[16px] bg-[#0f0f15b8] shadow-panel [--blur-glass:20px] [--glass-edge-stop:70%] [--glass-edge:#a493ff33] tablet:rounded-lg">
      <span
        aria-hidden
        className="absolute top-[82px] bottom-9 left-[43px] hidden w-0.5 bg-linear-to-b from-[#a493ff88] to-[#a493ff11] desktop:block"
      />
      <div
        aria-hidden
        className="hidden gap-6 px-8 py-4 font-mono text-[11px] tracking-[0.4px] text-text-faint uppercase shadow-[inset_0_-1px_0_var(--color-border)] desktop:flex"
      >
        <span className="w-6 shrink-0" />
        <span className="w-[300px] shrink-0">{copy.columns.layer}</span>
        <span className="flex-1">{copy.columns.tools}</span>
        <span className="w-[240px] shrink-0">{copy.columns.shipped}</span>
      </div>

      <ol aria-label={copy.layersLabel}>
        {layers.map((layer: Layer, index) => {
          const text = copy.layers[layer.id];
          return (
            <li
              key={layer.id}
              className="flex flex-col gap-3.5 px-[18px] py-[22px] shadow-[inset_0_-1px_0_var(--color-border)] last:shadow-none tablet:gap-4 tablet:px-7 tablet:py-6 desktop:flex-row desktop:gap-6 desktop:px-8 desktop:py-[26px]"
            >
              <span aria-hidden className="hidden w-6 shrink-0 justify-center pt-1 desktop:flex">
                <span className="size-3 rounded-full bg-bg ring-2 ring-accent ring-inset" />
              </span>

              <div className="flex flex-col gap-1.5 desktop:w-[300px] desktop:shrink-0">
                <h3 className="flex items-center gap-2.5">
                  <span className="font-mono text-[11px] tracking-[0.4px] text-accent">
                    {`L${String(index + 1)}`}
                  </span>
                  <span className="text-[22px] leading-[29px] font-medium tracking-[-0.5px] text-text-primary">
                    {text.name}
                  </span>
                </h3>
                <p className="text-[14px] leading-[21px] text-text-muted">{text.line}</p>
              </div>

              <ul
                aria-label={copy.columns.tools}
                className="-mb-2 flex flex-wrap content-start gap-x-2 desktop:min-w-0 desktop:flex-1"
              >
                {layer.toolRows.map((row, rowIndex) => (
                  <Fragment key={row.map((tool) => toolLabel(tool, copy)).join()}>
                    {/* Tablets and up keep the designed line breaks; phones simply wrap. */}
                    {rowIndex > 0 && <li aria-hidden className="hidden basis-full tablet:block" />}
                    {row.map((tool) => (
                      <li key={toolLabel(tool, copy)} className="mb-2">
                        <TechChip
                          name={toolLabel(tool, copy)}
                          {...(tool.logo ? { logo: tool.logo } : {})}
                          tone={tool.core ? "accent" : "neutral"}
                        />
                      </li>
                    ))}
                  </Fragment>
                ))}
              </ul>

              <ul
                aria-label={copy.columns.shipped}
                className="flex flex-col gap-1.5 tablet:flex-row tablet:flex-wrap tablet:gap-[18px] desktop:w-[240px] desktop:shrink-0 desktop:flex-col desktop:gap-1.5"
              >
                {(layer.shipped === "acrossMost" ? [copy.acrossMost] : layer.shipped).map(
                  (project) => (
                    <li
                      key={project}
                      className="flex items-center gap-2 text-[14px] text-text-primary"
                    >
                      <span aria-hidden className="h-px w-1.5 shrink-0 bg-text-faint" />
                      {project}
                    </li>
                  ),
                )}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
