import { cacheLife } from "next/cache";

export interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500;
  style: "normal" | "italic";
}

/**
 * Downloads a Google Font subset for Open Graph images at build time, so no font
 * files live in the repository. Without a modern User-Agent, Google serves TrueType,
 * which the image renderer supports (it cannot read WOFF2). Subsetting to `text`
 * keeps each request small.
 */
export async function loadGoogleFont(
  family: string,
  { weight, style, text }: { weight: 400 | 500; style: "normal" | "italic"; text: string },
): Promise<OgFont> {
  "use cache";
  cacheLife("max");
  const axis = style === "italic" ? `ital,wght@1,${String(weight)}` : `wght@${String(weight)}`;
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${axis}&text=${encodeURIComponent(text)}`,
  ).then((response) => response.text());
  const url = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/.exec(css)?.[1];
  if (!url) throw new Error(`No TrueType source for ${family} ${String(weight)} ${style}`);
  const data = await fetch(url).then((response) => response.arrayBuffer());
  return { name: family, data, weight, style };
}
