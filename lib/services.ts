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
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Lo que incluye el servicio (placeholder editable). */
  includes: string[];
  /** Texto del problema que resuelve (placeholder editable). */
  problem: string;
};

export const services: Service[] = [
  {
    slug: "automatizaciones-ia",
    name: "Automatizaciones con IA",
    eyebrow: "Servicio",
    tagline:
      "Respuestas, seguimiento y tareas repetitivas en piloto automático con inteligencia artificial.",
    summary:
      "Atiende al instante, da seguimiento sin que se caiga ningún prospecto y elimina el trabajo manual repetitivo.",
    icon: RepeatIcon,
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
    slug: "marketing",
    name: "Marketing: Email + WhatsApp",
    eyebrow: "Servicio",
    tagline:
      "Campañas de email y WhatsApp que nutren, recuerdan y venden en automático.",
    summary:
      "Mantén tu marca presente con secuencias automáticas que convierten contactos en clientes.",
    icon: ClockIcon,
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
      "Plataforma LMS para vender y gestionar tus videocursos y membresías.",
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
