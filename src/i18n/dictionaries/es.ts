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
  work: {},
  projects: {},
  experience: {},
  stack: {},
  about: {},
  contact: {},
} satisfies Dictionary;
