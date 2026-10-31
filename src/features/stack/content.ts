import type { TechLogoName } from "@/content/tech-logos";
import type { Dictionary } from "@/i18n/types";

/*
 * The stack, shared by all locales: tools are proper nouns and stay in English,
 * except a few generic ones whose labels come from `stack.tools` in the dictionary.
 */

type StackCopy = Dictionary["stack"];

export interface CoreTech {
  name: string;
  logo: TechLogoName;
  category: keyof StackCopy["categories"];
  /** The design highlights the language everything else is written in. */
  featured?: boolean;
}

export const coreTech = [
  { name: "TypeScript", logo: "typescript", category: "language", featured: true },
  { name: "Node.js", logo: "nodedotjs", category: "runtime" },
  { name: "NestJS", logo: "nestjs", category: "backend" },
  { name: "React · Next.js", logo: "react", category: "interface" },
  { name: "PostgreSQL", logo: "postgresql", category: "database" },
  { name: "AWS", logo: "amazonwebservices", category: "cloud" },
] as const satisfies readonly CoreTech[];

/** A tool chip: a proper name, or a key into the localized generic tool labels. */
export type Tool = (
  { name: string; key?: never } | { key: keyof StackCopy["tools"]; name?: never }
) & {
  logo?: TechLogoName;
  /** Core tools of the layer are drawn in the accent tone. */
  core?: boolean;
};

export interface Layer {
  id: keyof StackCopy["layers"];
  /** Chips per line as designed on desktop and tablet; phones simply wrap. */
  toolRows: readonly (readonly Tool[])[];
  /** Project names, or a localized note when a layer is everywhere. */
  shipped: readonly string[] | "acrossMost";
}

export const layers = [
  {
    id: "interface",
    toolRows: [
      [
        { name: "React", logo: "react", core: true },
        { name: "Next.js", logo: "nextdotjs", core: true },
        { name: "React Native", logo: "react" },
        { name: "Vue.js", logo: "vuedotjs" },
        { name: "Redux", logo: "redux" },
      ],
      [{ name: "Tailwind CSS", logo: "tailwindcss" }],
    ],
    shipped: ["Centrum-AI", "Investable", "CloudExpat", "HomeParty", "Real Info Box"],
  },
  {
    id: "services",
    toolRows: [
      [
        { name: "Node.js", logo: "nodedotjs", core: true },
        { name: "NestJS", logo: "nestjs", core: true },
        { name: "TypeScript", logo: "typescript", core: true },
        { name: "Express", logo: "express" },
        { name: "GraphQL", logo: "graphql" },
      ],
      [
        { name: "Prisma", logo: "prisma" },
        { name: "Python", logo: "python" },
      ],
    ],
    shipped: ["Intellux", "HomeParty", "Real Info Box", "Investable", "Centrum-AI"],
  },
  {
    id: "data",
    toolRows: [
      [
        { name: "PostgreSQL", logo: "postgresql", core: true },
        { name: "MySQL", logo: "mysql" },
        { name: "MongoDB", logo: "mongodb" },
      ],
    ],
    shipped: "acrossMost",
  },
  {
    id: "cloud",
    toolRows: [
      [
        { name: "AWS ECS", logo: "amazonecs", core: true },
        { name: "Lambda", logo: "awslambda", core: true },
        { name: "S3", logo: "amazons3", core: true },
        { name: "CloudFront", logo: "amazonwebservices" },
        { name: "SES", logo: "amazonsimpleemailservice" },
      ],
      [
        { name: "EC2", logo: "amazonec2" },
        { name: "CloudFormation", logo: "amazonwebservices" },
        { name: "Docker", logo: "docker" },
        { name: "GitHub Actions", logo: "githubactions" },
      ],
    ],
    shipped: ["Privacy Lock", "Orchard (HIPAA)", "Real Info Box", "Pinely"],
  },
  {
    id: "ai",
    toolRows: [
      [
        { name: "LangChain", logo: "langchain" },
        { key: "aiAgents" },
        { name: "ComfyUI" },
        { key: "generativeAi" },
      ],
    ],
    shipped: ["Intellux", "Centrum-AI"],
  },
  {
    id: "integrations",
    toolRows: [
      [
        { name: "Oracle POS", logo: "oracle" },
        { name: "Clover" },
        { name: "HolidayOil" },
        { name: "Jira", logo: "jira" },
        { name: "OAuth 2.0", logo: "openid" },
      ],
      [{ key: "desktopApps" }],
    ],
    shipped: ["Stream Signage", "Chronly", "Intellux"],
  },
] as const satisfies readonly Layer[];
