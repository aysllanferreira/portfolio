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
  projects: {
    eyebrow: "Projetos selecionados · 16 de 30+",
    outline: "Projetos",
    title: { before: "Da saúde às fintechs,\nfeito para ", accent: "durar.", after: "" },
    selectionNote:
      "Uma seleção, não a lista completa. 30+ produtos lançados até agora, muitos outros sob NDA.",
    countriesLabel: "Projetos por país",
    roleLabel: "Meu papel",
    privateProduct: "produto privado",
    gridLabel: "Mais projetos",
    tags: {
      frontend: "Frontend",
      backend: "Backend",
      ai: "IA",
      generativeAi: "IA generativa",
      supplyChain: "Cadeia de suprimentos",
      fintech: "Fintech",
      aws: "AWS",
      singleTenant: "Single-tenant",
      multiTenant: "Multi-tenant",
      endToEnd: "Ponta a ponta",
      hipaa: "HIPAA",
      vue: "Vue",
      lambda: "Lambda",
      ses: "SES",
      desktopApp: "App desktop",
      mobileApp: "App mobile",
      qrCheckIn: "Check-in por QR",
      techLead: "Tech Lead",
    },
    spotlights: {
      "centrum-ai": {
        market: "EUA · IA para cadeia de suprimentos",
        badge: "IA determinística",
        product:
          "Supply Chain Certainty: uma plataforma de IA determinística que torna previsíveis o planejamento e a resposta a rupturas, com 500 conectores ERP/TMS/WMS e trilha de auditoria completa.",
        role: "Desenvolvimento frontend e backend da plataforma Supply Chain Certainty.",
        screenshotAlt:
          "Página inicial da Centrum-AI: “Supply Chain Certainty Starts Now” acima de um globo marcando alertas na cadeia de suprimentos.",
      },
      investable: {
        market: "EUA · Fintech",
        product:
          "Investimento por objetivos como benefício corporativo: as contribuições do salário são investidas automaticamente na bolsa americana.",
        role: "Desenvolvimento frontend e backend em toda a plataforma de investimentos.",
        screenshotAlt:
          "Página inicial da Investable: “Personalized, goal-based investing as a benefit.” acima de um vídeo de apresentação.",
      },
      "privacy-lock": {
        market: "EUA · Compliance para fintechs",
        product:
          "Compliance de privacidade com GDPR e CCPA e conversões de dados com IA para bancos e fintechs.",
        role: "Projetei a infraestrutura AWS para implantações single-tenant e multi-tenant.",
        screenshotAlt:
          "Página inicial da Privacy Lock: “Transforming Data Management with Privacy” ao lado de gráficos de solicitações de consumidores.",
      },
    },
    items: {
      "orchard-mental-health": {
        market: "EUA · Saúde",
        product:
          "Uma clínica de saúde mental com 60+ profissionais, telemedicina e portal do paciente em Maryland e DC.",
        role: "Construí tudo: agendamento de consultas, o site e a infraestrutura AWS em conformidade com a HIPAA.",
      },
      "real-info-box": {
        market: "Canadá · Imóveis",
        product:
          "Newsletters e relatórios de mercado prontos para corretores de imóveis canadenses.",
        role: "Construí de ponta a ponta: frontend em Vue, Express no AWS Lambda e SES enviando 1M+ e-mails por mês.",
      },
      cloudexpat: {
        market: "EUA · Cloud FinOps",
        product: "IA que encontra e aplica economias de nuvem na AWS, Azure e GCP.",
        role: "Implementação de frontend dentro da plataforma.",
      },
      chronly: {
        market: "EUA · Trabalho remoto",
        product:
          "Controle de horas para times remotos que sincroniza com o Jira e lança as horas direto nos tickets.",
        role: "Frontend, backend e o app desktop.",
      },
      "reflections-recorder": {
        market: "EUA · Ferramentas de vídeo",
        product: "Uma ferramenta para gravar sua câmera e sua tela e depois compartilhar o vídeo.",
        role: "Construí tudo, de ponta a ponta.",
      },
      homeparty: {
        market: "Noruega · Vida noturna",
        product:
          "Encontre festas por perto com geolocalização, compre ingressos no app e deixe os anfitriões fazerem o check-in por QR code.",
        role: "Construí o app mobile e o backend.",
      },
      pinely: {
        market: "Tchéquia · Estúdio de software",
        product:
          "Um estúdio de software sob medida que cria apps web, apps mobile e MVPs para clientes na UE, Reino Unido e EUA.",
        role: "Construí o site deles: frontend, backend e infraestrutura AWS.",
      },
      octafin: {
        market: "Brasil · Crédito ao consumidor",
        product: "Empréstimo consignado 100% online pelo WhatsApp, com o dinheiro enviado por Pix.",
        role: "Construí de ponta a ponta.",
      },
      virtoo: {
        market: "Brasil · Mobilidade",
        product:
          "Aluguel de motos para entregadores em São Paulo, com contratos digitais e assinaturas semanais.",
        role: "Construí o app de aluguel de ponta a ponta.",
      },
      intellux: {
        market: "Brasil · Marketing com IA",
        product: "Uma plataforma de marketing com IA tudo-em-um para pequenas empresas e agências.",
        role: "Desenvolvimento backend, além de um servidor próprio de IA generativa para imagens.",
      },
      "upix-networks": {
        market: "Brasil · Telecom e nuvem",
        product:
          "Conectividade, nuvem, edge e data center para empresas que estão se expandindo pela América Latina.",
        role: "Tech Lead, construindo a tecnologia interna da empresa.",
      },
      techtee: {
        market: "Reino Unido · Tecnologia",
        product: "“Building technology that matters.”",
        role: "Desenvolvimento frontend do site deles.",
      },
    },
  },
  experience: {},
  stack: {},
  about: {},
  contact: {},
} satisfies Dictionary;
