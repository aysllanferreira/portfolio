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
  projects: {},
  experience: {},
  stack: {},
  about: {},
  contact: {},
} satisfies Dictionary;
