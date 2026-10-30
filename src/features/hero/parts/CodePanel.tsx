import { CircleCheck, FileCode, GitBranch } from "lucide-react";

import { codeSample, type TokenKind } from "../content";

const tokenColor: Record<TokenKind, string> = {
  comment: "text-text-faint",
  keyword: "text-[#c4b5fd]",
  name: "text-text-primary",
  punctuation: "text-text-muted",
  string: "text-[#fbbf77]",
  call: "text-[#7dd3fc]",
};

/**
 * The `engineer.ts` editor panel: tab bar, eleven lines of real, selectable code and a
 * status bar. Exposed as one figure with a localized label; line numbers are hidden
 * from assistive technology and disappear on mobile, as in the design.
 */
export function CodePanel({ label }: { label: string }) {
  const lastLine = codeSample.lines.length - 1;

  return (
    <figure
      aria-label={label}
      className="glass flex w-full min-w-0 flex-col overflow-hidden rounded-md shadow-panel-lg desktop:flex-1"
    >
      <div className="flex h-11 items-center justify-between px-3.5 shadow-[inset_0_-1px_0_var(--color-border)] tablet:px-5">
        <span className="flex h-full items-center gap-2 font-mono text-caption tracking-[0.4px] text-text-primary shadow-[inset_0_-1px_0_var(--color-accent)]">
          <FileCode aria-hidden className="size-3.5 text-text-muted" strokeWidth={2} />
          {codeSample.file}
        </span>
        <span className="font-mono text-caption tracking-[0.4px] text-text-muted">
          {codeSample.language}
        </span>
      </div>

      <pre className="overflow-x-auto py-4 font-mono text-[11px] tablet:py-[22px] tablet:text-[14px]">
        <code className="flex flex-col">
          {codeSample.lines.map((line, index) => (
            <span
              key={index}
              className="flex h-[22px] items-center gap-5 px-3.5 tablet:h-[26px] tablet:px-6"
            >
              <span
                aria-hidden
                className="hidden w-[18px] shrink-0 text-right text-[13px] text-text-faint tablet:inline"
              >
                {index + 1}
              </span>
              <span className={line.indent ? "pl-3.5 tablet:pl-5" : undefined}>
                {line.tokens.map(([text, kind], tokenIndex) => (
                  <span key={tokenIndex} className={tokenColor[kind]}>
                    {text}
                  </span>
                ))}
                {index === lastLine && (
                  <span
                    aria-hidden
                    className="ml-px inline-block h-[18px] w-2 translate-y-[3px] bg-accent motion-safe:animate-[caret_1.1s_steps(1)_infinite]"
                  />
                )}
              </span>
            </span>
          ))}
        </code>
      </pre>

      <div className="flex h-9 items-center justify-between px-3.5 font-mono text-caption tracking-[0.4px] text-text-muted shadow-[inset_0_1px_0_var(--color-border)] tablet:px-5">
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <GitBranch aria-hidden className="size-[13px]" strokeWidth={2} />
            {codeSample.branch}
          </span>
          <span className="flex items-center gap-1.5">
            <CircleCheck aria-hidden className="size-[13px] text-accent" strokeWidth={2} />
            {codeSample.checks}
          </span>
        </span>
        <span>{codeSample.position}</span>
      </div>
    </figure>
  );
}
