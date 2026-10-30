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
  hero: {
    eyebrow: "Engenheiro full-stack sênior · Node · React · AWS",
    eyebrowShort: "Engenheiro full-stack sênior",
    headline: { before: "Crio software\npelo qual ", accent: "pessoas", after: " pagam." },
    subhead:
      "Mais de 5 anos transformando ideias em produtos que geram receita: 30+ lançados em produção, de software de PDV rodando em mais de 100 restaurantes nos EUA a plataformas de saúde em conformidade com a HIPAA. Remoto de São Paulo, inglês fluente e horários compatíveis com os EUA e a Europa.",
    cta: { interview: "Agendar uma entrevista", resume: "Baixar currículo" },
    interviewSubject: "Entrevista com Aysllan Ferreira",
    shippedFor: "Produtos entregues para",
    codeLabel: "Exemplo de código: um perfil de engenheiro escrito em TypeScript",
    stats: {
      years: "Anos em produção",
      products: "Produtos lançados",
      revenue: "Receita gerada a clientes",
      countries: "Países atendidos",
    },
    scrollHint: "Role para explorar",
  },
  work: {
    eyebrow: "01 — Trabalho em destaque",
    outline: "Entregue",
    title: { before: "Produtos entregues,\ndo primeiro papo à ", accent: "produção.", after: "" },
    intro:
      "Mais de 30 produtos entregues para clientes nos EUA, Canadá, Europa e Brasil. Este é o que roda em mais lugares.",
    visualLabel:
      "Ilustração de uma pista de drive-thru: o app de cardápio mostrando um combo por tempo limitado e o app de PDV confirmando o pedido #1042, sincronizados por um evento de pedido.",
    case: {
      featured: "Destaque",
      meta: "EUA · Engenheiro full stack pela Pinely",
      title: "O software de PDV e cardápio por trás de drive-thrus pelos EUA.",
      description:
        "A Stream Signage alimenta cardápios digitais de redes como Pollo Campero e Panda Express. Ajudei a construir o app de PDV, integrando Oracle, Clover e outros sistemas de PDV no hardware das lojas, e o app de cardápio que mantém todas as telas sincronizadas.",
      metrics: {
        restaurants: "Restaurantes nos EUA no ar",
        apps: "Apps: PDV + cardápio",
        integrations: "Sistemas de PDV integrados",
      },
    },
  },
  projects: {},
  experience: {},
  stack: {},
  about: {},
  contact: {},
} satisfies Dictionary;
