/*
 * English copy: the source of truth for every user-facing string.
 * `{name}` placeholders are filled with `interpolate()` from src/i18n/interpolate.ts.
 */
export const en = {
  meta: {
    title: "Aysllan Ferreira · Senior Software Engineer",
    description:
      "Senior Software Engineer with 5+ years shipping 30+ products, from POS software in 100+ US restaurants to HIPAA-compliant healthcare and fintech platforms.",
  },
  a11y: {
    skipToContent: "Skip to content",
    opensInNewTab: "opens in a new tab",
    downloadsPdf: "downloads a PDF",
  },
  brand: {
    name: "Aysllan Ferreira",
    shortName: "Aysllan",
    homeLabel: "Aysllan Ferreira, back to the top",
  },
  nav: {
    label: "Main",
    availability: "Open to new roles",
    hire: "Hire me",
    links: {
      work: "Work",
      experience: "Experience",
      stack: "Stack",
      about: "About",
      contact: "Contact",
    },
    language: {
      label: "Language",
      current: "Current language: {language}",
    },
    menu: {
      open: "Open menu",
      close: "Close menu",
      title: "Menu",
    },
  },
  footer: {
    copyright: "© {year} Aysllan Ferreira · Senior Software Engineer",
    linksLabel: "Footer",
    linkedin: "LinkedIn",
    github: "GitHub",
    backToTop: "Back to top",
  },
  notFound: {
    title: "Page not found",
    body: "The page you are looking for does not exist or has moved.",
    back: "Back to the portfolio",
  },
  hero: {
    eyebrow: "Senior full-stack engineer · Node · React · AWS",
    eyebrowShort: "Senior full-stack engineer",
    headline: { before: "I build software\n", accent: "people", after: " pay for." },
    subhead:
      "5+ years turning ideas into revenue-generating products: 30+ shipped to production, from POS software running in 100+ US restaurants to HIPAA-compliant healthcare platforms. Remote from São Paulo, fluent in English, overlapping US and EU hours.",
    cta: { interview: "Schedule an interview", resume: "Download résumé" },
    interviewSubject: "Interview with Aysllan Ferreira",
    shippedFor: "Products shipped for",
    codeLabel: "Code sample: an engineer profile written in TypeScript",
    stats: {
      years: "Years in production",
      products: "Products shipped",
      revenue: "Client revenue delivered",
      countries: "Countries served",
    },
    scrollHint: "Scroll to explore",
  },
  work: {
    eyebrow: "01 — Selected work",
    outline: "Shipped",
    title: { before: "Products shipped,\nfrom first call to ", accent: "prod.", after: "" },
    intro:
      "30+ products shipped for clients across the USA, Canada, Europe and Brazil. Here's the one running in the most places.",
    visualLabel:
      "Illustration of a drive-thru lane: the menu board app showing a limited-time combo, and the POS app confirming order #1042, kept in sync by an order event.",
    case: {
      featured: "Featured",
      meta: "USA · Full stack engineer via Pinely",
      title: "The POS and menu software behind drive-thrus across the US.",
      description:
        "Stream Signage powers digital menu boards for chains like Pollo Campero and Panda Express. I helped build the POS app, integrating Oracle, Clover and other POS systems on in-store hardware, and the Menu app that keeps every screen in sync.",
      metrics: {
        restaurants: "US restaurants live",
        apps: "Apps: POS + menu",
        integrations: "POS systems integrated",
      },
    },
  },
  projects: {
    eyebrow: "Selected projects · 16 of 30+",
    outline: "Projects",
    title: { before: "Healthcare to fintech,\nbuilt to ", accent: "last.", after: "" },
    selectionNote:
      "A selection, not the full list. 30+ products shipped so far, many more under NDA.",
    countriesLabel: "Projects by country",
    roleLabel: "My role",
    privateProduct: "private product",
    gridLabel: "More projects",
    tags: {
      frontend: "Frontend",
      backend: "Backend",
      ai: "AI",
      generativeAi: "Generative AI",
      supplyChain: "Supply chain",
      fintech: "Fintech",
      aws: "AWS",
      singleTenant: "Single-tenant",
      multiTenant: "Multi-tenant",
      endToEnd: "End to end",
      hipaa: "HIPAA",
      vue: "Vue",
      lambda: "Lambda",
      ses: "SES",
      desktopApp: "Desktop app",
      mobileApp: "Mobile app",
      qrCheckIn: "QR check-in",
      techLead: "Tech Lead",
    },
    spotlights: {
      "centrum-ai": {
        market: "USA · Supply chain AI",
        badge: "Deterministic AI",
        product:
          "Supply Chain Certainty: a deterministic AI platform that makes planning and disruption response predictable, with 500 ERP/TMS/WMS connectors and a full audit trail.",
        role: "Frontend and backend development for the Supply Chain Certainty platform.",
        screenshotAlt:
          "Centrum-AI home page: “Supply Chain Certainty Starts Now” above a globe marking supply chain alerts.",
      },
      investable: {
        market: "USA · Fintech",
        product:
          "Goal-based investing as an employee benefit: paycheck contributions are invested automatically in the US stock market.",
        role: "Frontend and backend development across the investing platform.",
        screenshotAlt:
          "Investable home page: “Personalized, goal-based investing as a benefit.” above an introduction video.",
      },
      "privacy-lock": {
        market: "USA · Fintech compliance",
        product:
          "GDPR and CCPA privacy compliance and AI-powered data conversions for banks and fintechs.",
        role: "Designed the AWS infrastructure for single-tenant and multi-tenant deployments.",
        screenshotAlt:
          "Privacy Lock home page: “Transforming Data Management with Privacy” next to charts of consumer requests.",
      },
    },
    items: {
      "orchard-mental-health": {
        market: "USA · Healthcare",
        product:
          "A mental health practice with 60+ clinicians, telehealth and a patient portal across Maryland and DC.",
        role: "Built all of it: appointment booking, the website and HIPAA-compliant AWS infrastructure.",
      },
      "real-info-box": {
        market: "Canada · Real estate",
        product: "Done-for-you market-update newsletters and reports for Canadian realtors.",
        role: "Built it end to end: Vue frontend, Express on AWS Lambda, SES sending 1M+ emails a month.",
      },
      cloudexpat: {
        market: "USA · Cloud FinOps",
        product: "AI that finds and ships cloud savings across AWS, Azure and GCP.",
        role: "Frontend implementation inside the platform.",
      },
      chronly: {
        market: "USA · Remote work",
        product:
          "Time tracking for remote teams that syncs with Jira and logs hours straight to tickets.",
        role: "Frontend, backend and the desktop app.",
      },
      "reflections-recorder": {
        market: "USA · Video tools",
        product: "A tool for recording your camera and your screen, then sharing the video.",
        role: "Built everything, end to end.",
      },
      homeparty: {
        market: "Norway · Nightlife",
        product:
          "Find parties nearby by geolocation, buy tickets in the app, and let hosts check guests in by QR code.",
        role: "Built the mobile app and the backend.",
      },
      pinely: {
        market: "Czechia · Software studio",
        product:
          "A custom software studio building web apps, mobile apps and MVPs for clients across the EU, UK and US.",
        role: "Built their website: frontend, backend and AWS infrastructure.",
      },
      octafin: {
        market: "Brazil · Consumer credit",
        product: "Payroll-deductible loans, fully online through WhatsApp, with funds sent by Pix.",
        role: "Built it end to end.",
      },
      virtoo: {
        market: "Brazil · Mobility",
        product:
          "Motorcycle rentals for delivery riders in São Paulo, with digital contracts and weekly subscriptions.",
        role: "Built the rental app end to end.",
      },
      intellux: {
        market: "Brazil · AI marketing",
        product: "An all-in-one AI marketing platform for small businesses and agencies.",
        role: "Backend development, plus a self-hosted generative AI server for images.",
      },
      "upix-networks": {
        market: "Brazil · Telecom & cloud",
        product:
          "Connectivity, cloud, edge and data center services for companies expanding across LATAM.",
        role: "Tech Lead, building the company's internal technology.",
      },
      techtee: {
        market: "UK · Technology",
        product: "“Building technology that matters.”",
        role: "Frontend development for their website.",
      },
    },
  },
  experience: {},
  stack: {},
  about: {},
  contact: {},
};
