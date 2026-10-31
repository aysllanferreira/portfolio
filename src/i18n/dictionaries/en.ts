/*
 * English copy: the source of truth for every user-facing string.
 * `{name}` placeholders are filled with `interpolate()` from src/i18n/interpolate.ts.
 */
export const en = {
  meta: {
    title: "Aysllan Ferreira · Senior Software Engineer",
    description:
      "Senior Software Engineer with 5+ years shipping 30+ products, from POS software in 100+ US restaurants to HIPAA-compliant healthcare and fintech platforms.",
    jobTitle: "Senior Software Engineer",
    ogAlt: "Aysllan Ferreira, Senior Software Engineer: I build software people pay for.",
  },
  a11y: {
    skipToContent: "Skip to content",
    opensInNewTab: "opens in a new tab",
    downloadsPdf: "downloads a PDF",
    opensMailApp: "opens your email app",
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
  experience: {
    eyebrow: "02 — Experience",
    outline: "Career",
    title: { before: "Building products,\ngrowing ", accent: "teams.", after: "" },
    intro:
      "5+ years across a global software studio, product and contract roles, often in parallel. Senior engineer since 2024.",
    engagements: { fullTime: "Full-time", contract: "Contract", partTime: "Part-time" },
    remote: "Remote",
    present: "Present",
    timeline: {
      legendLabel: "Engagement types",
      axisLabel: "Role",
      now: "Now",
      listLabel: "Roles over time",
      listItem: "{role} at {company}, {engagement}: {period}",
    },
    roles: {
      "pinely-senior": {
        title: "Senior Software Engineer",
        shortTitle: "Senior Software Engineer",
        summary:
          "Technical pre-sales, system design and engineering education at a global software studio.",
        highlights: [
          "Lead pre-sales calls that turn business needs into signed projects",
          "Design architecture, roadmaps and estimates from MVP to production",
          "Tutor of Engineering Sync: live classes for 20+ developers",
        ],
        numbers: [
          { value: "30+", label: "MVPs delivered" },
          { value: "US$270K+", label: "Revenue contributed" },
        ],
      },
      vituax: {
        title: "Product Owner",
        shortTitle: "Product Owner",
        summary: "Took a Brazilian cloud provider's platform from idea to a paid MVP.",
        highlights: [
          "Launched VPS hosting with DDoS protection, S3-compatible storage and managed databases",
          "Wrote user stories and refined the backlog with engineering",
          "Gave cloud computing talks in Rio Grande do Sul",
        ],
        numbers: [{ value: "100+", label: "Active VPS instances" }],
      },
      intellux: {
        title: "Senior Software Engineer",
        shortTitle: "Senior Software Engineer",
        summary:
          "Brought self-hosted generative AI into the product and helped grow a junior-heavy team.",
        highlights: [
          "Self-hosted ComfyUI behind a NestJS API, with dynamic Python workflows",
          "Secure AWS EC2 tunnel and reverse proxy to an IP-restricted VPS",
          "Introduced Agile practices and mentored junior developers",
        ],
        numbers: [{ value: "0", label: "Paid image APIs needed" }],
      },
      "pinely-full-stack": {
        title: "Full Stack Software Engineer",
        shortTitle: "Full Stack Engineer",
        summary: "Shipped products for clients across the USA, Canada, Europe and Asia.",
        highlights: [
          "POS integrations running in 100+ US restaurants",
          "Rescued a Nordic ticketing app: Prisma 1 → 2 with Apollo GraphQL",
          "Serverless real-estate platform sending 1M+ emails a month",
        ],
        numbers: [{ value: "20+", label: "Projects delivered" }],
      },
      trybe: {
        title: "Full Stack Software Engineer",
        shortTitle: "Full Stack Engineer · curriculum",
        summary: "Reviewed and improved the curriculum of Trybe's Full-Stack program.",
        highlights: [
          "Automated grading suites with Jest, RTL, Mocha, Chai and Sinon",
          "Algorithm and data structure exercises for interview prep",
        ],
        numbers: [{ value: "3,000+", label: "Students impacted" }],
      },
    },
    testimonial: { role: "Managed Aysllan directly at Pinely" },
    teaching: {
      title: "Teaching & community",
      items: {
        taught: { value: "20+", label: "Developers taught in Pinely's Engineering Sync program" },
        students: {
          value: "3,000+",
          label: "Students reached through Trybe's curriculum and graders",
        },
        talks: { value: "Talks", label: "On cloud computing in Rio Grande do Sul" },
        ambassador: { value: "Elected", label: "Class ambassador by his Trybe classmates" },
        recommendations: { value: "19", label: "Recommendations from managers, mentors and peers" },
      },
    },
  },
  stack: {
    eyebrow: "03 — Stack",
    outline: "Stack",
    title: { before: "Tools I trust\nin ", accent: "production.", after: "" },
    intro:
      "Chosen for the job, not the hype. Every tool here is behind a product that's live with real users.",
    coreLabel: "Core technologies",
    categories: {
      language: "Language",
      runtime: "Runtime",
      backend: "Backend",
      interface: "Interface",
      database: "Database",
      cloud: "Cloud",
    },
    columns: { layer: "Layer", tools: "Tools", shipped: "Shipped in" },
    layersLabel: "The stack by layer",
    layers: {
      interface: { name: "Interface", line: "Web, mobile and desktop apps people actually use." },
      services: { name: "Services", line: "APIs and business logic, from MVP to scale." },
      data: { name: "Data", line: "Schemas and queries that stay fast and auditable." },
      cloud: {
        name: "Cloud & DevOps",
        line: "Infrastructure as code, single-tenant to multi-tenant.",
      },
      ai: { name: "AI", line: "Agents and generative AI inside real products." },
      integrations: {
        name: "Integrations",
        line: "Plugging into the systems businesses already run.",
      },
    },
    tools: { aiAgents: "AI agents", generativeAi: "Generative AI", desktopApps: "Desktop apps" },
    acrossMost: "Used across most projects",
    practicesLabel: "Practices",
    practices: [
      "Technical pre-sales",
      "System design",
      "Multi-tenant SaaS",
      "HIPAA compliance",
      "Serverless",
      "CI/CD",
      "Automated testing",
      "Mentoring",
    ],
  },
  about: {
    eyebrow: "04 — About me",
    outline: "About",
    title: { before: "Hi, I'm ", accent: "Aysllan.", after: "" },
    bio: [
      "I'm a senior software engineer from São Paulo. For 5+ years I've taken products from the first client call to production, shipping 30+ MVPs for teams in the US, Canada, Europe and Brazil.",
      "I care about the unglamorous parts: tests, documentation, and infrastructure that's still healthy years later. Software is a garden, not a house you hand over the keys to.",
      "And I teach. I tutor 20+ developers in Pinely's Engineering Sync, built automated graders used by 3,000+ Trybe students, and give talks on cloud computing.",
    ],
    valuesLabel: "What I value",
    values: [
      { title: "Do it very well", description: "Craft and care, down to the tests and docs." },
      {
        title: "Own it end to end",
        description: "From the pre-sales call to the production deploy.",
      },
      { title: "Teach and multiply", description: "Make the people around me better." },
      {
        title: "Never stop learning",
        description: "PT, EN and ES, now studying Russian, Italian and Japanese.",
      },
    ],
    motto: "Just start, and when you start, don't give up.",
    roleLine: "Senior Software Engineer · 5+ years",
    portraitAlt: "Aysllan Ferreira in a white shirt and glasses, arms crossed, smiling",
  },
  contact: {
    eyebrow: "Get in touch",
    headline: { before: "Let's build something\nthat ", accent: "lasts.", after: "" },
    pitch:
      "Open to senior engineering roles and select freelance projects. Based in São Paulo, working remotely with teams in the US, Canada and Europe.",
    cta: { linkedin: "Message me on LinkedIn", resume: "Download résumé" },
    facts: {
      localTime: { label: "Local time", value: "São Paulo · {offset}" },
      languages: { label: "Languages", value: "PT · EN · ES" },
      works: { label: "Works", value: "Remote, worldwide" },
    },
    links: {
      label: "Ways to reach me",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      coverLetter: "Cover letter",
      coverLetterValue: "Why I'd be a great fit (PDF)",
    },
  },
};
