import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Plans } from "@/components/sections/Plans";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { StrandsBackdrop } from "@/components/reactbits/StrandsBackdrop";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Planes y precios — Lead Pilot",
  description:
    "Paquetes de automatización con IA para PyMEs: Esencial, Pro y Personalizado. Precios de referencia y sin contratos forzosos.",
  alternates: { canonical: "/planes" },
};

export default function PlanesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Planes"
        title="Elige cuánto quieres que tu negocio trabaje por ti."
        subtitle="Cada negocio es distinto, así que el precio final lo definimos juntos en una llamada. Estos son los puntos de partida."
        backdrop={<StrandsBackdrop />}
      >
        <Link href="/contacto" className="btn-primary group">
          Quiero recuperar mi tiempo
          <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </PageHero>

      <Plans showHeading={false} />
      <FinalCTA />
    </main>
  );
}
