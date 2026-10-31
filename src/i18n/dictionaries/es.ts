import type { Dictionary } from "../types";

/* Spanish copy. Must mirror every key of the English dictionary. */
export const es = {
  meta: {
    title: "Aysllan Ferreira · Ingeniero de Software Sénior",
    description:
      "Ingeniero de Software Sénior con más de 5 años y 30+ productos lanzados, de TPV en 100+ restaurantes de EE. UU. a plataformas de salud y fintech.",
  },
  a11y: {
    skipToContent: "Saltar al contenido",
    opensInNewTab: "se abre en una pestaña nueva",
    downloadsPdf: "descarga un PDF",
  },
  brand: {
    name: "Aysllan Ferreira",
    shortName: "Aysllan",
    homeLabel: "Aysllan Ferreira, volver arriba",
  },
  nav: {
    label: "Principal",
    availability: "Disponible para nuevos roles",
    hire: "Contrátame",
    links: {
      work: "Trabajo",
      experience: "Experiencia",
      stack: "Stack",
      about: "Sobre mí",
      contact: "Contacto",
    },
    language: {
      label: "Idioma",
      current: "Idioma actual: {language}",
    },
    menu: {
      open: "Abrir menú",
      close: "Cerrar menú",
      title: "Menú",
    },
  },
  footer: {
    copyright: "© {year} Aysllan Ferreira · Ingeniero de Software Sénior",
    linksLabel: "Pie de página",
    linkedin: "LinkedIn",
    github: "GitHub",
    backToTop: "Volver arriba",
  },
  notFound: {
    title: "Página no encontrada",
    body: "La página que buscas no existe o se ha movido.",
    back: "Volver al portafolio",
  },
  hero: {
    eyebrow: "Ingeniero full-stack sénior · Node · React · AWS",
    eyebrowShort: "Ingeniero full-stack sénior",
    headline: { before: "Construyo software\npor el que la ", accent: "gente", after: " paga." },
    subhead:
      "Más de 5 años convirtiendo ideas en productos que generan ingresos: 30+ lanzados a producción, desde software de punto de venta en más de 100 restaurantes de EE. UU. hasta plataformas de salud que cumplen con HIPAA. En remoto desde São Paulo, con inglés fluido y horario compatible con EE. UU. y Europa.",
    cta: { interview: "Agendar una entrevista", resume: "Descargar currículum" },
    interviewSubject: "Entrevista con Aysllan Ferreira",
    shippedFor: "Productos entregados para",
    codeLabel: "Ejemplo de código: un perfil de ingeniero escrito en TypeScript",
    stats: {
      years: "Años en producción",
      products: "Productos lanzados",
      revenue: "Ingresos generados a clientes",
      countries: "Países atendidos",
    },
    scrollHint: "Desplázate para explorar",
  },
  work: {
    eyebrow: "01 — Trabajo destacado",
    outline: "Lanzado",
    title: {
      before: "Productos lanzados,\nde la primera llamada a ",
      accent: "producción.",
      after: "",
    },
    intro:
      "Más de 30 productos lanzados para clientes en EE. UU., Canadá, Europa y Brasil. Este es el que funciona en más lugares.",
    visualLabel:
      "Ilustración de un carril de autoservicio: la app de menú mostrando un combo por tiempo limitado y la app de punto de venta confirmando el pedido #1042, sincronizadas por un evento de pedido.",
    case: {
      featured: "Destacado",
      meta: "EE. UU. · Ingeniero full stack vía Pinely",
      title: "El software de punto de venta y menús detrás de autoservicios en EE. UU.",
      description:
        "Stream Signage impulsa los menús digitales de cadenas como Pollo Campero y Panda Express. Ayudé a construir la app de punto de venta, integrando Oracle, Clover y otros sistemas en el hardware de las tiendas, y la app de menú que mantiene cada pantalla sincronizada.",
      metrics: {
        restaurants: "Restaurantes en EE. UU. activos",
        apps: "Apps: punto de venta + menú",
        integrations: "Sistemas de punto de venta integrados",
      },
    },
  },
  projects: {
    eyebrow: "Proyectos seleccionados · 16 de 30+",
    outline: "Proyectos",
    title: { before: "De la salud a las fintech,\nhecho para ", accent: "durar.", after: "" },
    selectionNote:
      "Una selección, no la lista completa. 30+ productos lanzados hasta ahora, muchos más bajo NDA.",
    countriesLabel: "Proyectos por país",
    roleLabel: "Mi rol",
    privateProduct: "producto privado",
    gridLabel: "Más proyectos",
    tags: {
      frontend: "Frontend",
      backend: "Backend",
      ai: "IA",
      generativeAi: "IA generativa",
      supplyChain: "Cadena de suministro",
      fintech: "Fintech",
      aws: "AWS",
      singleTenant: "Single-tenant",
      multiTenant: "Multi-tenant",
      endToEnd: "De punta a punta",
      hipaa: "HIPAA",
      vue: "Vue",
      lambda: "Lambda",
      ses: "SES",
      desktopApp: "App de escritorio",
      mobileApp: "App móvil",
      qrCheckIn: "Check-in con QR",
      techLead: "Tech Lead",
    },
    spotlights: {
      "centrum-ai": {
        market: "EE. UU. · IA para cadena de suministro",
        badge: "IA determinista",
        product:
          "Supply Chain Certainty: una plataforma de IA determinista que hace predecibles la planificación y la respuesta a interrupciones, con 500 conectores ERP/TMS/WMS y una auditoría completa.",
        role: "Desarrollo frontend y backend de la plataforma Supply Chain Certainty.",
        screenshotAlt:
          "Página de inicio de Centrum-AI: “Supply Chain Certainty Starts Now” sobre un globo que marca alertas en la cadena de suministro.",
      },
      investable: {
        market: "EE. UU. · Fintech",
        product:
          "Inversión por objetivos como beneficio para empleados: los aportes de la nómina se invierten automáticamente en la bolsa de EE. UU.",
        role: "Desarrollo frontend y backend en toda la plataforma de inversión.",
        screenshotAlt:
          "Página de inicio de Investable: “Personalized, goal-based investing as a benefit.” sobre un video de presentación.",
      },
      "privacy-lock": {
        market: "EE. UU. · Cumplimiento para fintech",
        product:
          "Cumplimiento de privacidad con GDPR y CCPA y conversiones de datos con IA para bancos y fintech.",
        role: "Diseñé la infraestructura en AWS para despliegues single-tenant y multi-tenant.",
        screenshotAlt:
          "Página de inicio de Privacy Lock: “Transforming Data Management with Privacy” junto a gráficos de solicitudes de consumidores.",
      },
    },
    items: {
      "orchard-mental-health": {
        market: "EE. UU. · Salud",
        product:
          "Una clínica de salud mental con 60+ profesionales, telemedicina y un portal de pacientes en Maryland y DC.",
        role: "Construí todo: la reserva de citas, el sitio web y la infraestructura en AWS conforme a HIPAA.",
      },
      "real-info-box": {
        market: "Canadá · Bienes raíces",
        product:
          "Boletines e informes de mercado listos para usar para agentes inmobiliarios canadienses.",
        role: "Lo construí de punta a punta: frontend en Vue, Express en AWS Lambda y SES enviando 1M+ correos al mes.",
      },
      cloudexpat: {
        market: "EE. UU. · Cloud FinOps",
        product: "IA que encuentra y aplica ahorros en la nube en AWS, Azure y GCP.",
        role: "Implementación de frontend dentro de la plataforma.",
      },
      chronly: {
        market: "EE. UU. · Trabajo remoto",
        product:
          "Control de horas para equipos remotos que se sincroniza con Jira y registra las horas directamente en los tickets.",
        role: "Frontend, backend y la app de escritorio.",
      },
      "reflections-recorder": {
        market: "EE. UU. · Herramientas de video",
        product: "Una herramienta para grabar tu cámara y tu pantalla y luego compartir el video.",
        role: "Construí todo, de punta a punta.",
      },
      homeparty: {
        market: "Noruega · Vida nocturna",
        product:
          "Encuentra fiestas cercanas por geolocalización, compra entradas en la app y deja que los anfitriones registren a sus invitados con un código QR.",
        role: "Construí la app móvil y el backend.",
      },
      pinely: {
        market: "Chequia · Estudio de software",
        product:
          "Un estudio de software a medida que crea apps web, apps móviles y MVPs para clientes en la UE, el Reino Unido y EE. UU.",
        role: "Construí su sitio web: frontend, backend e infraestructura en AWS.",
      },
      octafin: {
        market: "Brasil · Crédito al consumo",
        product:
          "Préstamos con descuento de nómina, 100% en línea por WhatsApp, con el dinero enviado por Pix.",
        role: "Lo construí de punta a punta.",
      },
      virtoo: {
        market: "Brasil · Movilidad",
        product:
          "Alquiler de motos para repartidores en São Paulo, con contratos digitales y suscripciones semanales.",
        role: "Construí la app de alquiler de punta a punta.",
      },
      intellux: {
        market: "Brasil · Marketing con IA",
        product:
          "Una plataforma de marketing con IA todo en uno para pequeñas empresas y agencias.",
        role: "Desarrollo backend, además de un servidor propio de IA generativa para imágenes.",
      },
      "upix-networks": {
        market: "Brasil · Telecomunicaciones y nube",
        product:
          "Conectividad, nube, edge y centros de datos para empresas que se expanden por Latinoamérica.",
        role: "Tech Lead, construyendo la tecnología interna de la empresa.",
      },
      techtee: {
        market: "Reino Unido · Tecnología",
        product: "“Building technology that matters.”",
        role: "Desarrollo frontend de su sitio web.",
      },
    },
  },
  experience: {
    eyebrow: "02 — Experiencia",
    outline: "Carrera",
    title: { before: "Construyendo productos,\nformando ", accent: "equipos.", after: "" },
    intro:
      "5+ años entre un estudio global de software, roles de producto y contratos, a menudo en paralelo. Ingeniero sénior desde 2024.",
    engagements: { fullTime: "Tiempo completo", contract: "Contrato", partTime: "Medio tiempo" },
    remote: "Remoto",
    present: "Actual",
    timeline: {
      legendLabel: "Tipos de vínculo",
      axisLabel: "Rol",
      now: "Hoy",
      listLabel: "Roles a lo largo del tiempo",
      listItem: "{role} en {company}, {engagement}: {period}",
    },
    roles: {
      "pinely-senior": {
        title: "Ingeniero de Software Sénior",
        shortTitle: "Ingeniero de Software Sénior",
        summary:
          "Preventa técnica, diseño de sistemas y formación de ingenieros en un estudio global de software.",
        highlights: [
          "Dirijo reuniones de preventa que convierten necesidades de negocio en proyectos firmados",
          "Diseño arquitectura, roadmaps y estimaciones desde el MVP hasta producción",
          "Tutor de Engineering Sync: clases en vivo para 20+ desarrolladores",
        ],
        numbers: [
          { value: "30+", label: "MVPs entregados" },
          { value: "US$270K+", label: "Ingresos aportados" },
        ],
      },
      vituax: {
        title: "Product Owner",
        shortTitle: "Product Owner",
        summary:
          "Llevé la plataforma de un proveedor de nube brasileño de la idea a un MVP de pago.",
        highlights: [
          "Lancé hosting VPS con protección DDoS, almacenamiento compatible con S3 y bases de datos gestionadas",
          "Escribí historias de usuario y refiné el backlog con ingeniería",
          "Di charlas sobre computación en la nube en Rio Grande do Sul",
        ],
        numbers: [{ value: "100+", label: "Instancias VPS activas" }],
      },
      intellux: {
        title: "Ingeniero de Software Sénior",
        shortTitle: "Ingeniero de Software Sénior",
        summary:
          "Integré IA generativa autoalojada en el producto y ayudé a crecer a un equipo mayormente junior.",
        highlights: [
          "ComfyUI autoalojado detrás de una API en NestJS, con workflows dinámicos en Python",
          "Túnel seguro en AWS EC2 y proxy inverso hacia un VPS con restricción de IP",
          "Introduje prácticas ágiles y fui mentor de desarrolladores junior",
        ],
        numbers: [{ value: "0", label: "APIs de imágenes de pago necesarias" }],
      },
      "pinely-full-stack": {
        title: "Ingeniero de Software Full Stack",
        shortTitle: "Ingeniero Full Stack",
        summary: "Entregué productos para clientes en EE. UU., Canadá, Europa y Asia.",
        highlights: [
          "Integraciones de TPV funcionando en 100+ restaurantes de EE. UU.",
          "Rescaté una app nórdica de entradas: Prisma 1 → 2 con Apollo GraphQL",
          "Plataforma inmobiliaria serverless que envía 1M+ correos al mes",
        ],
        numbers: [{ value: "20+", label: "Proyectos entregados" }],
      },
      trybe: {
        title: "Ingeniero de Software Full Stack",
        shortTitle: "Ingeniero Full Stack · currículo",
        summary: "Revisé y mejoré el currículo del programa Full-Stack de Trybe.",
        highlights: [
          "Suites de corrección automática con Jest, RTL, Mocha, Chai y Sinon",
          "Ejercicios de algoritmos y estructuras de datos para entrevistas",
        ],
        numbers: [{ value: "3000+", label: "Estudiantes impactados" }],
      },
    },
    testimonial: { role: "Gerente directo de Aysllan en Pinely" },
    teaching: {
      title: "Enseñanza y comunidad",
      items: {
        taught: {
          value: "20+",
          label: "Desarrolladores formados en el programa Engineering Sync de Pinely",
        },
        students: {
          value: "3000+",
          label: "Estudiantes alcanzados con el currículo y los correctores de Trybe",
        },
        talks: { value: "Charlas", label: "Sobre computación en la nube en Rio Grande do Sul" },
        ambassador: {
          value: "Elegido",
          label: "Embajador de la clase por sus compañeros de Trybe",
        },
        recommendations: {
          value: "19",
          label: "Recomendaciones de gerentes, mentores y compañeros",
        },
      },
    },
  },
  stack: {},
  about: {},
  contact: {},
} satisfies Dictionary;
