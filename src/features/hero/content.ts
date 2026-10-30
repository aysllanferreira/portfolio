/** Facts shown in the hero. Prose lives in the `hero` dictionary namespace. */

export const shippedFor = [
  "Stream Signage",
  "Centrum-AI",
  "Investable",
  "Privacy Lock",
  "CloudExpat",
] as const;

export const heroStats = [
  { key: "years", value: "5+" },
  { key: "products", value: "30+" },
  { key: "revenue", value: "US$270K+" },
  { key: "countries", value: "6" },
] as const;

export type HeroStatKey = (typeof heroStats)[number]["key"];

/** Syntax roles of the code panel, mapped to the design's token colors. */
export type TokenKind = "comment" | "keyword" | "name" | "punctuation" | "string" | "call";

type Line = readonly (readonly [text: string, kind: TokenKind])[];

/**
 * The `engineer.ts` sample shown in the hero, token by token as in the design. It is
 * code, so it stays in English in every locale. Indented lines sit inside the object.
 */
export const codeSample = {
  file: "engineer.ts",
  language: "TypeScript",
  branch: "main",
  checks: "all checks passing",
  position: "Ln 11, Col 22",
  lines: [
    { indent: false, tokens: [["// about me, in production", "comment"]] },
    {
      indent: false,
      tokens: [
        ["export const ", "keyword"],
        ["engineer", "name"],
        [" = {", "punctuation"],
      ],
    },
    {
      indent: true,
      tokens: [
        ["name", "name"],
        [": ", "punctuation"],
        ['"Aysllan Ferreira"', "string"],
        [",", "punctuation"],
      ],
    },
    {
      indent: true,
      tokens: [
        ["role", "name"],
        [": ", "punctuation"],
        ['"Senior Software Engineer"', "string"],
        [",", "punctuation"],
      ],
    },
    {
      indent: true,
      tokens: [
        ["experience", "name"],
        [": ", "punctuation"],
        ['"5+ years"', "string"],
        [",", "punctuation"],
      ],
    },
    {
      indent: true,
      tokens: [
        ["focus", "name"],
        [": ", "punctuation"],
        ['"AI agents & serverless"', "string"],
        [",", "punctuation"],
      ],
    },
    {
      indent: true,
      tokens: [
        ["stack", "name"],
        [": [", "punctuation"],
        ['"Node"', "string"],
        [", ", "punctuation"],
        ['"NestJS"', "string"],
        [", ", "punctuation"],
        ['"React"', "string"],
        [", ", "punctuation"],
        ['"AWS"', "string"],
        ["],", "punctuation"],
      ],
    },
    {
      indent: true,
      tokens: [
        ["shipping", "name"],
        [": ", "punctuation"],
        ["true", "keyword"],
        [",", "punctuation"],
      ],
    },
    { indent: false, tokens: [["};", "punctuation"]] },
    { indent: false, tokens: [] },
    {
      indent: false,
      tokens: [
        ["await ", "keyword"],
        ["engineer", "name"],
        [".", "punctuation"],
        ["ship", "call"],
        ["();", "punctuation"],
      ],
    },
  ] satisfies readonly { indent: boolean; tokens: Line }[],
} as const;
