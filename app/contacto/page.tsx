import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { CALENDAR_URL, whatsappUrl } from "@/lib/config";
import { ArrowRightIcon, WhatsAppIcon, ClockIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contacto — Lead Pilot",
  description:
    "Agenda una llamada de 30 minutos o escríbenos por WhatsApp. Salimos con un plan claro de qué automatizar primero en tu negocio.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu negocio."
        subtitle="Agenda una llamada de 30 minutos, sin compromiso. Salimos de ahí con un plan claro de qué automatizar primero."
      />

      <section className="bg-cloud py-20 sm:py-28">
        <div className="container-px grid gap-6 md:grid-cols-2">
          {/* Agendar llamada */}
          <Reveal className="h-full">
            <TiltCard className="flex h-full flex-col rounded-3xl border border-navy/10 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-glow">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky/10 text-sky">
                <ClockIcon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-ink">
                Agenda una llamada
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-mist">
                30 minutos por videollamada para entender tu operación y
                proponerte el primer paso. Elige el horario que mejor te quede.
              </p>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group mt-7"
              >
                Ver horarios disponibles
                <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </TiltCard>
          </Reveal>

          {/* WhatsApp */}
          <Reveal delay={0.1} className="h-full">
            <TiltCard className="flex h-full flex-col rounded-3xl border border-navy/10 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-glow">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#1da851]">
                <WhatsAppIcon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-ink">
                Escríbenos por WhatsApp
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-mist">
                ¿Prefieres texto? Mándanos un mensaje y te respondemos el mismo
                día. Ideal si quieres resolver una duda rápida antes de agendar.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline group mt-7"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Abrir WhatsApp
              </a>
            </TiltCard>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-sm text-mist">
            Atención en español de México · Respuesta el mismo día
          </p>
        </Reveal>
      </section>
    </main>
  );
}
