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
  experience: {},
  stack: {},
  about: {},
  contact: {},
} satisfies Dictionary;
