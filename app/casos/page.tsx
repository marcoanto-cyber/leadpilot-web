import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Casos y testimonios — Lead Pilot",
  description:
    "Negocios que ya van en piloto automático con Lead Pilot. Resultados reales de PyMEs que dejaron de perder clientes.",
  alternates: { canonical: "/casos" },
};

export default function CasosPage() {
  return (
    <main>
      <PageHero
        eyebrow="Casos"
        title="Negocios que ya van en piloto automático."
        subtitle="Resultados reales de PyMEs que dejaron de perder clientes por no responder a tiempo."
        accent="coral"
      >
        <Link href="/contacto" className="btn-primary group">
          Quiero estos resultados
          <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </PageHero>

      <Testimonials />
      <FinalCTA />
    </main>
  );
}
