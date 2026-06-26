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
    /** Marco del mockup: "phone", "laptop" o "browser" (por defecto, una ventana). */
    variant?: "phone" | "laptop" | "browser";
    /** Si es true, el mockup de navegador hace un leve tilt 3D al pasar el cursor. */
    tilt?: boolean;
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
    name: "Deja de adivinar en qué va cada cliente. Ten todo tu negocio en una sola pantalla.",
    eyebrow: "Ventas, pipeline y equipo",
    tagline:
      "Cada prospecto, cada conversación, cada cita —ordenados y a la vista. Lead Pilot organiza tus ventas para que sepas exactamente a quién seguir, qué falta y dónde está tu dinero.",
    summary:
      "Tu negocio ordenado y bajo control, sin que tengas que cargarlo todo en la cabeza.",
    cta: "Quiero ordenar mis ventas",
    icon: GaugeIcon,
    problem:
      "Hoy tus clientes viven en tu cabeza, en notas sueltas y en chats que se pierden. Se te olvida a quién prometiste hablar. No sabes cuántas ventas tienes a punto de cerrar. Y si tienes ayudantes, nadie sabe quién atiende a quién.",
    includes: [
      "Ve todas tus ventas de un vistazo. Un tablero donde cada cliente avanza de “interesado” a “cerrado”. Nada se pierde.",
      "El seguimiento se hace solo. El sistema te recuerda —o le escribe por ti— a cada cliente que falta. Cero olvidos.",
      "Si tienes equipo, todos coordinados. Cada lead se asigna solo a la persona correcta, con avisos automáticos.",
      "Sabe cuánto vas a vender. De un vistazo ves qué tienes por cerrar este mes. Adiós a las sorpresas.",
    ],
    mockup: {
      src: "/Imagenes/servicio-ventasycrm-mockup.webp",
      alt: "Tablero de pipeline de ventas de Lead Pilot con clientes avanzando por cada etapa.",
      caption: "Todo tu pipeline de ventas en una sola pantalla, siempre actualizado.",
      variant: "browser",
      tilt: true,
    },
  },
  {
    slug: "web-funnels",
    name: "Una página que trabaja como tu mejor vendedor, abierta las 24 horas.",
    eyebrow: "Páginas web y embudos de venta",
    tagline:
      "No una página bonita que nadie usa. Una página hecha para una cosa: convertir al que llega en un cliente que te escribe o agenda. Y conectada a todo lo demás de tu sistema.",
    summary:
      "Deja de mandar clientes a un perfil que no vende. Mándalos a una página que sí.",
    cta: "Quiero una página que venda",
    icon: CompassIcon,
    problem:
      "Tienes redes, pero ¿a dónde mandas a la gente? Un perfil no cierra ventas. La gente entra, no sabe qué hacer y se va. Cada visitante perdido es un cliente que tuviste enfrente y dejaste ir.",
    includes: [
      "Convierte visitantes en clientes. Cada página está diseñada para que el que llega te escriba, agende o compre. No solo para “verse bien”.",
      "Lista en días, no en meses. Sin esperas eternas ni desarrolladores caros. Rápido y profesional.",
      "Conectada a todo tu sistema. Lo que llega por la página entra solo a tu CRM y dispara el seguimiento automático.",
      "Funciona en el celular. Donde de verdad te ve la gente. Carga rápido y se ve impecable.",
    ],
    mockup: {
      src: "/Imagenes/servicio-paginasweb-mockup.webp",
      alt: "Página de aterrizaje de alta conversión creada por Lead Pilot, vista en una laptop.",
      caption: "Una landing hecha para convertir, no solo para verse bonita.",
      variant: "laptop",
    },
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
