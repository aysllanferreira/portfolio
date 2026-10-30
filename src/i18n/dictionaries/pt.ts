import type { Dictionary } from "../types";

/* Brazilian Portuguese copy. Must mirror every key of the English dictionary. */
export const pt = {
  meta: {
    title: "Aysllan Ferreira · Engenheiro de Software Sênior",
    description:
      "Engenheiro de Software Sênior com mais de 5 anos e 30+ produtos lançados, de PDVs em 100+ restaurantes nos EUA a plataformas de saúde e fintech.",
  },
  a11y: {
    skipToContent: "Pular para o conteúdo",
    opensInNewTab: "abre em uma nova aba",
    downloadsPdf: "baixa um PDF",
  },
  brand: {
    name: "Aysllan Ferreira",
    shortName: "Aysllan",
    homeLabel: "Aysllan Ferreira, voltar ao topo",
  },
  nav: {
    label: "Principal",
    availability: "Aberto a novas vagas",
    hire: "Contrate-me",
    links: {
      work: "Trabalhos",
      experience: "Experiência",
      stack: "Stack",
      about: "Sobre",
      contact: "Contato",
    },
    language: {
      label: "Idioma",
      current: "Idioma atual: {language}",
    },
    menu: {
      open: "Abrir menu",
      close: "Fechar menu",
      title: "Menu",
    },
  },
  footer: {
    copyright: "© {year} Aysllan Ferreira · Engenheiro de Software Sênior",
    linksLabel: "Rodapé",
    linkedin: "LinkedIn",
    github: "GitHub",
    backToTop: "Voltar ao topo",
  },
  notFound: {
    title: "Página não encontrada",
    body: "A página que você procura não existe ou foi movida.",
    back: "Voltar ao portfólio",
  },
  hero: {},
  work: {},
  projects: {},
  experience: {},
  stack: {},
  about: {},
  contact: {},
} satisfies Dictionary;
