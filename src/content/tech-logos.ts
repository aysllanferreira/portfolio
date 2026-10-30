/**
 * Technology logos available on the asset CDN and their brand colors on the dark theme.
 * The asset sync recolors each logo to this color, and Core Tiles tint their glow with it.
 */
export const techBrandColors = {
  typescript: "#3178C6",
  nodedotjs: "#5FA04E",
  react: "#61DAFB",
  nextdotjs: "#FFFFFF",
  vuedotjs: "#4FC08D",
  nestjs: "#E0234E",
  amazonwebservices: "#FF9900",
  redux: "#9B7BE0",
  postgresql: "#6E9BF5",
  tailwindcss: "#38BDF8",
  express: "#FFFFFF",
  graphql: "#E10098",
  prisma: "#FFFFFF",
  python: "#4B8BBE",
  mongodb: "#4DB33D",
  mysql: "#5C9BD1",
  amazonecs: "#FF9900",
  awslambda: "#FF9900",
  amazonec2: "#FF9900",
  docker: "#2496ED",
  amazons3: "#7AC143",
  amazonsimpleemailservice: "#E8546A",
  githubactions: "#2088FF",
  langchain: "#1C9C7C",
  oracle: "#F80000",
  jira: "#2684FF",
  openid: "#F78C40",
} as const;

export type TechLogoName = keyof typeof techBrandColors;
