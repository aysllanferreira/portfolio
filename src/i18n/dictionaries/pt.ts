import type { Dictionary } from "../types";

/* Brazilian Portuguese copy. Must mirror every key of the English dictionary. */
export const pt = {
  meta: {
    title: "Aysllan Ferreira · Engenheiro de Software Sênior",
    description:
      "Engenheiro de Software Sênior com mais de 5 anos e 30+ produtos lançados, de PDVs em 100+ restaurantes nos EUA a plataformas de saúde e fintech.",
    jobTitle: "Engenheiro de Software Sênior",
    ogAlt:
      "Aysllan Ferreira, Engenheiro de Software Sênior: crio software pelo qual pessoas pagam.",
  },
  a11y: {
    skipToContent: "Pular para o conteúdo",
    opensInNewTab: "abre em uma nova aba",
    downloadsPdf: "baixa um PDF",
    opensMailApp: "abre seu app de e-mail",
  },
  brand: {
    name: "Aysllan Ferreira",
    shortName: "Aysllan",
    homeHint: "voltar ao topo",
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
  experience: {
    eyebrow: "02 — Experiência",
    outline: "Carreira",
    title: { before: "Construindo produtos,\nformando ", accent: "times.", after: "" },
    intro:
      "5+ anos entre um estúdio global de software, papéis de produto e contratos, muitas vezes em paralelo. Engenheiro sênior desde 2024.",
    engagements: { fullTime: "Tempo integral", contract: "Contrato", partTime: "Meio período" },
    remote: "Remoto",
    present: "Atual",
    timeline: {
      legendLabel: "Tipos de vínculo",
      axisLabel: "Cargo",
      now: "Hoje",
      listLabel: "Cargos ao longo do tempo",
      listItem: "{role} na {company}, {engagement}: {period}",
    },
    roles: {
      "pinely-senior": {
        title: "Engenheiro de Software Sênior",
        shortTitle: "Engenheiro de Software Sênior",
        summary:
          "Pré-vendas técnica, design de sistemas e formação de engenheiros em um estúdio global de software.",
        highlights: [
          "Conduzo reuniões de pré-vendas que transformam necessidades de negócio em projetos fechados",
          "Desenho arquitetura, roadmaps e estimativas do MVP à produção",
          "Tutor do Engineering Sync: aulas ao vivo para 20+ desenvolvedores",
        ],
        numbers: [
          { value: "30+", label: "MVPs entregues" },
          { value: "US$270K+", label: "Receita gerada" },
        ],
      },
      vituax: {
        title: "Product Owner",
        shortTitle: "Product Owner",
        summary: "Levei a plataforma de um provedor de nuvem brasileiro da ideia a um MVP pago.",
        highlights: [
          "Lancei hospedagem VPS com proteção DDoS, armazenamento compatível com S3 e bancos de dados gerenciados",
          "Escrevi histórias de usuário e refinei o backlog com a engenharia",
          "Dei palestras sobre computação em nuvem no Rio Grande do Sul",
        ],
        numbers: [{ value: "100+", label: "Instâncias VPS ativas" }],
      },
      intellux: {
        title: "Engenheiro de Software Sênior",
        shortTitle: "Engenheiro de Software Sênior",
        summary:
          "Trouxe IA generativa auto-hospedada para o produto e ajudei a desenvolver um time majoritariamente júnior.",
        highlights: [
          "ComfyUI auto-hospedado por trás de uma API NestJS, com workflows dinâmicos em Python",
          "Túnel seguro na AWS EC2 e proxy reverso para uma VPS com restrição de IP",
          "Introduzi práticas ágeis e mentorei desenvolvedores júnior",
        ],
        numbers: [{ value: "0", label: "APIs de imagem pagas necessárias" }],
      },
      "pinely-full-stack": {
        title: "Engenheiro de Software Full Stack",
        shortTitle: "Engenheiro Full Stack",
        summary: "Entreguei produtos para clientes nos EUA, Canadá, Europa e Ásia.",
        highlights: [
          "Integrações de PDV rodando em 100+ restaurantes nos EUA",
          "Resgatei um app nórdico de ingressos: Prisma 1 → 2 com Apollo GraphQL",
          "Plataforma imobiliária serverless enviando 1M+ e-mails por mês",
        ],
        numbers: [{ value: "20+", label: "Projetos entregues" }],
      },
      trybe: {
        title: "Engenheiro de Software Full Stack",
        shortTitle: "Engenheiro Full Stack · currículo",
        summary: "Revisei e melhorei o currículo do programa Full-Stack da Trybe.",
        highlights: [
          "Suítes de correção automática com Jest, RTL, Mocha, Chai e Sinon",
          "Exercícios de algoritmos e estruturas de dados para entrevistas",
        ],
        numbers: [{ value: "3.000+", label: "Alunos impactados" }],
      },
    },
    testimonial: { role: "Gestor direto do Aysllan na Pinely" },
    teaching: {
      title: "Ensino e comunidade",
      items: {
        taught: {
          value: "20+",
          label: "Desenvolvedores formados no programa Engineering Sync da Pinely",
        },
        students: {
          value: "3.000+",
          label: "Alunos alcançados pelo currículo e pelos corretores da Trybe",
        },
        talks: { value: "Palestras", label: "Sobre computação em nuvem no Rio Grande do Sul" },
        ambassador: { value: "Eleito", label: "Embaixador da turma pelos colegas da Trybe" },
        recommendations: {
          value: "19",
          label: "Recomendações de gestores, mentores e colegas",
        },
      },
    },
  },
  stack: {
    eyebrow: "03 — Stack",
    outline: "Stack",
    title: { before: "Ferramentas que uso\nem ", accent: "produção.", after: "" },
    intro:
      "Escolhidas pela necessidade, não pelo hype. Cada ferramenta aqui está por trás de um produto no ar, com usuários reais.",
    coreLabel: "Tecnologias principais",
    categories: {
      language: "Linguagem",
      runtime: "Runtime",
      backend: "Backend",
      interface: "Interface",
      database: "Banco de dados",
      cloud: "Nuvem",
    },
    columns: { layer: "Camada", tools: "Ferramentas", shipped: "Usado em" },
    layersLabel: "A stack por camada",
    layers: {
      interface: {
        name: "Interface",
        line: "Apps web, mobile e desktop que as pessoas realmente usam.",
      },
      services: { name: "Serviços", line: "APIs e regras de negócio, do MVP à escala." },
      data: { name: "Dados", line: "Schemas e consultas que continuam rápidos e auditáveis." },
      cloud: {
        name: "Nuvem e DevOps",
        line: "Infraestrutura como código, de single-tenant a multi-tenant.",
      },
      ai: { name: "IA", line: "Agentes e IA generativa dentro de produtos reais." },
      integrations: {
        name: "Integrações",
        line: "Conectando aos sistemas que as empresas já usam.",
      },
    },
    tools: {
      aiAgents: "Agentes de IA",
      generativeAi: "IA generativa",
      desktopApps: "Apps desktop",
    },
    acrossMost: "Usado na maioria dos projetos",
    practicesLabel: "Práticas",
    practices: [
      "Pré-vendas técnica",
      "Design de sistemas",
      "SaaS multi-tenant",
      "Conformidade HIPAA",
      "Serverless",
      "CI/CD",
      "Testes automatizados",
      "Mentoria",
    ],
  },
  about: {
    eyebrow: "04 — Sobre mim",
    outline: "Sobre",
    title: { before: "Oi, eu sou o ", accent: "Aysllan.", after: "" },
    bio: [
      "Sou engenheiro de software sênior, de São Paulo. Há mais de 5 anos levo produtos da primeira conversa com o cliente até a produção, com 30+ MVPs entregues para times nos EUA, Canadá, Europa e Brasil.",
      "Eu cuido das partes pouco glamorosas: testes, documentação e uma infraestrutura que continua saudável anos depois. Software é um jardim, não uma casa que você entrega com a chave.",
      "E eu ensino. Sou tutor de 20+ desenvolvedores no Engineering Sync da Pinely, criei corretores automáticos usados por 3.000+ alunos da Trybe e dou palestras sobre computação em nuvem.",
    ],
    valuesLabel: "O que eu valorizo",
    values: [
      {
        title: "Fazer muito bem feito",
        description: "Capricho e cuidado, até nos testes e na documentação.",
      },
      {
        title: "Assumir de ponta a ponta",
        description: "Da reunião de pré-vendas ao deploy em produção.",
      },
      { title: "Ensinar e multiplicar", description: "Fazer as pessoas ao meu redor crescerem." },
      {
        title: "Nunca parar de aprender",
        description: "PT, EN e ES, e agora estudando russo, italiano e japonês.",
      },
    ],
    motto: "Apenas comece, e quando começar, não desista.",
    roleLine: "Engenheiro de Software Sênior · 5+ anos",
    portraitAlt: "Aysllan Ferreira de camisa branca e óculos, de braços cruzados, sorrindo",
  },
  contact: {
    eyebrow: "Fale comigo",
    headline: { before: "Vamos construir algo\nque ", accent: "dure.", after: "" },
    pitch:
      "Aberto a vagas sênior de engenharia e a projetos freelance selecionados. Moro em São Paulo e trabalho remotamente com times nos EUA, Canadá e Europa.",
    cta: { linkedin: "Fale comigo no LinkedIn", resume: "Baixar currículo" },
    facts: {
      localTime: { label: "Horário local", value: "São Paulo · {offset}" },
      languages: { label: "Idiomas", value: "PT · EN · ES" },
      works: { label: "Trabalho", value: "Remoto, de qualquer lugar" },
    },
    links: {
      label: "Onde me encontrar",
      email: "E-mail",
      linkedin: "LinkedIn",
      github: "GitHub",
      coverLetter: "Carta de apresentação",
      coverLetterValue: "Por que eu seria uma ótima escolha (PDF)",
    },
  },
} satisfies Dictionary;
