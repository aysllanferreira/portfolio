interface SkipLinkProps {
  label: string;
}

/** The first tab stop: jumps past the navigation to the main content. */
export function SkipLink({ label }: SkipLinkProps) {
  return (
    <a
      href="#content"
      className="sr-only-focusable fixed top-3 left-3 z-[100] rounded-pill bg-text-primary px-4 py-2 text-[14px] font-semibold text-on-accent"
    >
      {label}
    </a>
  );
}
