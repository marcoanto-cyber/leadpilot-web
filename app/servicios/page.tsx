import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/sections/Services";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Servicios — Lead Pilot",
  description:
    "Automatización con IA, marketing por email y WhatsApp, ventas y CRM, web y funnels, cursos y membresías. Conoce los servicios de Lead Pilot para PyMEs.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <main>
      <PageHero
        eyebrow="Servicios"
        title="Un sistema completo para crecer en automático."
        subtitle="Cada servicio resuelve una parte de tu operación y se conecta con los demás. Empieza por donde más lo necesitas."
      >
        <Link href="/contacto" className="btn-primary group">
          Agenda una llamada
          <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
        <Link href="/planes" className="btn-ghost">
          Ver planes
        </Link>
      </PageHero>

      <Services showHeading={false} />
      <FinalCTA />
    </main>
  );
}
