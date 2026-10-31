import { ImageResponse } from "next/og";

import { site } from "@/content/site";
import { defaultLocale, hasLocale, locales } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { svgAsset } from "@/lib/assets";
import { env } from "@/lib/env";
import { loadGoogleFont } from "@/lib/og-fonts";

/*
 * The social card for each language (1200×630): the AF mark, the role and the hero
 * headline with its serif accent word, drawn with the site's tokens and fonts.
 */

const size = { width: 1200, height: 630 };

export function generateImageMetadata({ params }: { params: { lang: string } }) {
  const locale = hasLocale(params.lang) ? params.lang : defaultLocale;
  return [{ id: "card", alt: dictionaries[locale].meta.ogAlt, size, contentType: "image/png" }];
}

const color = {
  bg: "#0a0a0f",
  primary: "#f5f5f7",
  muted: "#b4b4c0",
  faint: "#8e8e9c",
  accent: "#a493ff",
  border: "#272733",
};

const accentStyle = {
  fontFamily: "Instrument Serif",
  fontStyle: "italic",
  fontSize: 100,
  color: color.accent,
  letterSpacing: -1,
} as const;

/**
 * The headline as separate words the renderer can wrap. A word gets a leading space
 * only where the copy has one, so an accent word can run straight into punctuation.
 */
function headlineWords(before: string, accent: string, after: string) {
  const text = `${before}\u0000${accent}\u0000${after}`;
  const words: { text: string; accent: boolean; spaced: boolean }[] = [];
  let part = 0;
  for (const token of text.split(/(\s+|\u0000)/)) {
    if (token === "\u0000") part++;
    else if (/^\s+$/.test(token)) words.push({ text: "", accent: false, spaced: true });
    else if (token) words.push({ text: token, accent: part === 1, spaced: false });
  }
  // Fold each whitespace marker into the word after it.
  return words.flatMap((word, index) =>
    word.text ? [{ ...word, spaced: index > 0 && words[index - 1]?.text === "" }] : [],
  );
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const { hero, meta } = dictionaries[locale];
  const { before, accent, after } = hero.headline;
  const kicker = `${site.name} · ${meta.jobTitle}`;
  const domain = new URL(env.NEXT_PUBLIC_SITE_URL).host;
  const languages = locales.map((code) => code.toUpperCase()).join(" · ");
  const words = headlineWords(before, accent, after);

  const [sans, serif, mono] = await Promise.all([
    loadGoogleFont("Geist", { weight: 500, style: "normal", text: `${before}${after}` }),
    loadGoogleFont("Instrument Serif", { weight: 400, style: "italic", text: accent }),
    loadGoogleFont("Geist Mono", {
      weight: 400,
      style: "normal",
      text: `${kicker}${domain}${languages}`.toUpperCase(),
    }),
  ]);
  const mark = svgAsset("brand/af-mark-violet");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: color.bg,
        backgroundImage: `radial-gradient(circle at 85% 0%, #7b5cff55, ${color.bg} 60%)`,
        fontFamily: "Geist",
        color: color.primary,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG, not HTML */}
        <img src={mark.url} width={(mark.width / mark.height) * 56} height={56} alt="" />
        <span
          style={{
            fontFamily: "Geist Mono",
            fontSize: 22,
            letterSpacing: 1,
            color: color.muted,
            textTransform: "uppercase",
          }}
        >
          {kicker}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          fontSize: 84,
          lineHeight: 1.04,
          letterSpacing: -3.5,
          maxWidth: 1000,
        }}
      >
        {words.map((word, index) => (
          <span
            key={`${word.text}-${String(index)}`}
            style={{
              // Spaces trail the word, so a wrapped line never starts indented.
              marginRight: words[index + 1]?.spaced ? 22 : 0,
              ...(word.accent ? accentStyle : {}),
            }}
          >
            {word.text}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 28,
          borderTop: `1px solid ${color.border}`,
          fontFamily: "Geist Mono",
          fontSize: 20,
          letterSpacing: 1,
          color: color.faint,
          textTransform: "uppercase",
        }}
      >
        <span>{domain}</span>
        <span style={{ color: color.accent }}>{languages}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { ...sans, name: "Geist" },
        { ...serif, name: "Instrument Serif" },
        { ...mono, name: "Geist Mono" },
      ],
    },
  );
}
