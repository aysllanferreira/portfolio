/**
 * The name set huge across the bottom of the page, fading out downwards. Decorative:
 * the name is already the page's brand and footer text. Sizes are fluid per layout so
 * it always spans the column without overflowing it.
 */
export function Wordmark({ name }: { name: string }) {
  return (
    <div aria-hidden className="flex justify-center pt-10 select-none">
      <p className="bg-linear-to-b from-[#f5f5f755] via-[#a493ff22] via-60% to-[#a493ff00] bg-clip-text fluid-text-38 leading-[0.9] font-bold tracking-[-0.047em] whitespace-nowrap text-transparent uppercase tablet:fluid-text-84 desktop:fluid-text-146">
        {name}
      </p>
    </div>
  );
}
