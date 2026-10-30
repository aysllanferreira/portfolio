// Pencil: D8LqW Button/Primary · br39n Button/Secondary · VQt2O Button/Light · XEk6D Button/Icon
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/cn";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

const button = cva(
  "inline-flex shrink-0 items-center justify-center rounded-pill whitespace-nowrap transition-[transform,background-color,border-color,box-shadow,color] duration-200 select-none disabled:pointer-events-none disabled:opacity-50 motion-safe:active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "gap-4 bg-linear-to-l from-accent-soft to-[#8f78ff] py-2 pr-2 pl-[26px] text-[17px] font-semibold text-on-accent shadow-[0_12px_40px_#7b5cff66,inset_0_1px_0_#ffffff66,inset_0_0_0_1px_#ffffff40] hover:shadow-[0_16px_48px_#7b5cff88,inset_0_1px_0_#ffffff66,inset_0_0_0_1px_#ffffff40]",
        secondary:
          "gap-2.5 bg-text-primary/5 px-6 py-[17px] text-[16px] font-medium text-text-primary ring-1 ring-text-primary/20 backdrop-blur-[16px] ring-inset hover:bg-text-primary/10 hover:ring-text-primary/40",
        light:
          "gap-2 bg-text-primary px-[18px] py-[11px] text-[14px] font-semibold text-on-accent shadow-[0_6px_20px_#a493ff40] hover:bg-white hover:shadow-[0_8px_28px_#a493ff66]",
        icon: "size-11 text-text-primary ring-1 ring-border ring-inset hover:bg-text-primary/5 hover:ring-border-strong",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonVariant = NonNullable<VariantProps<typeof button>["variant"]>;

interface BaseProps {
  variant?: ButtonVariant | undefined;
  /** Icon shown before the label (secondary) or after it (light). Defaults per variant. */
  icon?: LucideIcon | undefined;
  className?: string | undefined;
  children?: ReactNode;
}

type LinkProps = BaseProps & {
  href: string;
  /** Opens in a new tab; pass a localized hint for assistive technology. */
  external?: { hint: string } | undefined;
  /** Localized note announced after the label without opening a new tab, e.g. "downloads a PDF". */
  hint?: string | undefined;
  "aria-label"?: string | undefined;
};

type NativeButtonProps = BaseProps & { href?: never; external?: never; hint?: never } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export type ButtonProps = LinkProps | NativeButtonProps;

/**
 * The design's four button styles, rendered as a link when given `href` and as a
 * native button otherwise. Icon-only buttons must carry an `aria-label`.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", icon, className, children } = props;
  const content = (
    <ButtonContent variant={variant} icon={icon}>
      {children}
    </ButtonContent>
  );
  const classes = cn(button({ variant }), className);

  if (props.href !== undefined) {
    const { href, external, hint, "aria-label": ariaLabel } = props;
    const isRoute = href.startsWith("/") || href.startsWith("#");
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={classes}
        >
          {content} <span className="sr-only">({external.hint})</span>
        </a>
      );
    }
    const note = hint ? (
      <>
        {" "}
        <span className="sr-only">({hint})</span>
      </>
    ) : null;
    return isRoute ? (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {content}
        {note}
      </Link>
    ) : (
      <a href={href} aria-label={ariaLabel} className={classes}>
        {content}
        {note}
      </a>
    );
  }

  const {
    variant: _v,
    icon: _i,
    className: _c,
    children: _ch,
    external: _e,
    href: _h,
    ...rest
  } = props;
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}

function ButtonContent({
  variant,
  icon: Icon,
  children,
}: {
  variant: ButtonVariant;
  icon: LucideIcon | undefined;
  children: ReactNode;
}) {
  switch (variant) {
    case "primary": {
      const Glyph = Icon ?? ArrowUpRight;
      return (
        <>
          {children}
          <span className="flex size-11 items-center justify-center rounded-pill bg-on-accent">
            <Glyph aria-hidden className="size-[18px] text-accent-soft" strokeWidth={2} />
          </span>
        </>
      );
    }
    case "secondary":
      return (
        <>
          {Icon && <Icon aria-hidden className="size-[18px]" strokeWidth={2} />}
          {children}
        </>
      );
    case "light": {
      const Glyph = Icon ?? ArrowUpRight;
      return (
        <>
          {children}
          <Glyph aria-hidden className="size-[15px]" strokeWidth={2.2} />
        </>
      );
    }
    case "icon": {
      const Glyph = Icon ?? ArrowUpRight;
      return <Glyph aria-hidden className="size-[18px]" strokeWidth={2} />;
    }
  }
}
