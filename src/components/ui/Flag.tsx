// Pencil: mlZwL Flag
import { AssetImage } from "@/components/media/AssetImage";
import { cn } from "@/lib/cn";

export type CountryCode = "us" | "br" | "es" | "ca" | "gb" | "no" | "cz";

const shapes = {
  /** 24×16, the default in cards and lists. */
  md: "h-4 w-6 rounded-[3px]",
  /** 21×14, used in role rows. */
  sm: "h-[14px] w-[21px] rounded-[3px]",
  /** 18×12, used in chips. */
  xs: "h-3 w-[18px] rounded-[2px]",
  /** 16×16 circle, used in the language switcher. */
  round: "size-4 rounded-full",
} as const;

const sizes: Record<keyof typeof shapes, string> = {
  md: "24px",
  sm: "21px",
  xs: "18px",
  round: "16px",
};

interface FlagProps {
  country: CountryCode;
  /** Country name for assistive technology, or "" when text next to it names it. */
  label?: string;
  shape?: keyof typeof shapes;
  className?: string;
}

export function Flag({ country, label = "", shape = "md", className }: FlagProps) {
  return (
    <AssetImage
      name={`flags/${country}`}
      alt={label}
      sizes={sizes[shape]}
      className={cn("shrink-0", className)}
      imgClassName={cn(
        "size-full object-cover outline outline-1 -outline-offset-1 outline-white/[0.13]",
        shapes[shape],
      )}
    />
  );
}
