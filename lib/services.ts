// ============================================================
//  CATÁLOGO DE SERVICIOS DE LEAD PILOT
//  Cada servicio genera su propia página en /servicios/<slug>.
//  Por ahora el contenido de detalle es PLACEHOLDER: ve llenando
//  cada página una por una editando los campos de abajo.
// ============================================================

import type { ComponentType, SVGProps } from "react";
import {
  CompassIcon,
  RepeatIcon,
  GaugeIcon,
  WrenchIcon,
  ClockIcon,
} from "@/components/icons";

export type Service = {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  /** Texto del botón principal del hero (por defecto "Quiero recuperar mi tiempo"). */
  cta?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Lo que hace por ti, en formato benefit-based (placeholder editable). */
  includes: string[];
  /** Texto del problema que resuelve (placeholder editable). */
  problem: string;
  /** Mockup real enmarcado (sección de prueba). Pásame la captura por servicio. */
  mockup?: {
    src?: string;
    alt: string;
    caption?: string;
    /** "phone" lo enmarca en un teléfono; "browser" (por defecto) en una ventana. */
    variant?: "phone" | "browser";
  };
  /** (Opcional) imagen de escena cerca del cierre. */
  scene?: { src: string; alt: string; caption?: string };
};

export const services: Service[] = [
  {
    slug: "automatizaciones-ia",
    name: "Automatización con IA",
    eyebrow: "Servicio",
    tagline:
      "Una IA que atiende a tus clientes en WhatsApp, Instagram y Facebook al instante, las 24 horas, y agenda por ti. Como tener un equipo que nunca duerme.",
    summary:
      "Tus clientes escriben por todos lados y a toda hora. Tú no puedes estar en todos lados a toda hora.",
    icon: RepeatIcon,
    problem:
      "WhatsApp, Instagram, Facebook… los mensajes llegan por todas partes y al mismo tiempo. Mientras atiendes uno, otros tres se quedan esperando —y el que no recibe respuesta rápida se va con quien sí le contesta. Estar pegado a todas las bandejas, todo el día, es imposible (y agotador).",
    includes: [
      "Contesta solo en WhatsApp, Instagram y Facebook, desde una sola conversación.",
      "Responde en segundos, las 24 horas, incluso cuando estás dormido o en familia.",
      "Entiende lo que pide el cliente y responde con el tono de tu negocio.",
      "Agenda citas y deja al cliente en tu calendario, sin que tú muevas un dedo.",
      "Da seguimiento a quien no respondió, hasta que agenda o compra.",
      "Te pasa la conversación a ti cuando se necesita un humano. Tú decides cuándo entrar.",
    ],
    mockup: {
      src: "/Imagenes/servicio-automatizaciones-mockup.webp",
      alt: "Conversación de un cliente con el bot de IA de Lead Pilot atendiendo en automático.",
      caption: "Tu IA atendiendo una conversación real, con el tono de tu negocio.",
      variant: "phone",
    },
  },
  {
    slug: "marketing",
    name: "Tus clientes ya te compraron una vez. Haz que vuelvan, sin que tú muevas un dedo.",
    eyebrow: "Email y WhatsApp marketing",
    tagline:
      "La mayoría de tus ventas están dormidas en tu lista de contactos. Lead Pilot les manda el mensaje correcto en el momento correcto —por correo y WhatsApp— para que regresen, en piloto automático.",
    summary:
      "Tu próxima venta probablemente ya está en tu lista. Solo hay que despertarla.",
    cta: "Quiero hacer que mis clientes regresen",
    icon: ClockIcon,
    problem:
      "Conseguir un cliente nuevo cuesta caro. Pero los que ya te compraron se te olvidan, y se enfrían. No tienes tiempo de andar mandando promociones uno por uno. Por eso ese dinero se queda sobre la mesa.",
    includes: [
      "Reactiva a los clientes que ya tienes. Mensajes automáticos que los hacen volver, sin que tú escribas uno por uno.",
      "Llega donde sí te leen. WhatsApp se abre casi siempre; el correo refuerza. Usamos los dos.",
      "Campañas que se mandan solas. Promociones, recordatorios y novedades programadas una vez y funcionando para siempre.",
      "Vende mientras duermes. El sistema trabaja tu lista de contactos aunque tú estés en otra cosa.",
    ],
    mockup: {
      src: "/Imagenes/servicio-marketing-mockup.webp",
      alt: "Panel de campañas de email y WhatsApp de Lead Pilot enviando mensajes en automático.",
      caption: "Tus campañas de email y WhatsApp trabajando solas, mientras tú haces otra cosa.",
      variant: "browser",
    },
  },
  {
    slug: "ventas-crm",
    name: "Ventas y CRM",
    eyebrow: "Servicio",
    tagline:
      "Pipelines, equipo comercial y notificaciones internas para que ninguna venta se enfríe.",
    summary:
      "Ordena tu proceso comercial: cada prospecto en su etapa, cada seguimiento a tiempo, todo el equipo enterado.",
    icon: GaugeIcon,
    problem:
      "[Placeholder] Describe aquí el dolor concreto que resuelve este servicio para tu cliente.",
    includes: [
      "[Placeholder] Punto 1 de lo que incluye",
      "[Placeholder] Punto 2 de lo que incluye",
      "[Placeholder] Punto 3 de lo que incluye",
      "[Placeholder] Punto 4 de lo que incluye",
    ],
  },
  {
    slug: "web-funnels",
    name: "Web y Funnels",
    eyebrow: "Servicio",
    tagline:
      "Páginas y funnels diseñados para convertir visitantes en clientes.",
    summary:
      "Sitios rápidos y embudos de conversión medibles, conectados a tus automatizaciones.",
    icon: CompassIcon,
    problem:
      "[Placeholder] Describe aquí el dolor concreto que resuelve este servicio para tu cliente.",
    includes: [
      "[Placeholder] Punto 1 de lo que incluye",
      "[Placeholder] Punto 2 de lo que incluye",
      "[Placeholder] Punto 3 de lo que incluye",
      "[Placeholder] Punto 4 de lo que incluye",
    ],
  },
  {
    slug: "cursos-membresias",
    name: "Cursos y Membresías",
    eyebrow: "Servicio",
    tagline:
      "Tu propia plataforma de videocursos y membresías, lista para vender y gestionar tu contenido.",
    summary:
      "Monetiza tu conocimiento con un espacio propio para cursos, accesos y comunidad.",
    icon: WrenchIcon,
    problem:
      "[Placeholder] Describe aquí el dolor concreto que resuelve este servicio para tu cliente.",
    includes: [
      "[Placeholder] Punto 1 de lo que incluye",
      "[Placeholder] Punto 2 de lo que incluye",
      "[Placeholder] Punto 3 de lo que incluye",
      "[Placeholder] Punto 4 de lo que incluye",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
