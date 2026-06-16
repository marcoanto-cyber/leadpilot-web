import Link from "next/link";
import type { Service } from "@/lib/services";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/motion/Reveal";
import { CALENDAR_URL } from "@/lib/config";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";

/**
 * Plantilla reutilizable de "página de servicio".
 * Estructura: hero del servicio → problema que resuelve → qué incluye →
 * mockup/imagen → CTA. Las 5 páginas de servicio la usan.
 */
export function ServicePage({ service }: { service: Service }) {
  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.name}
        subtitle={service.tagline}
      >
        <Link href="/contacto" className="btn-primary group">
          Agenda una llamada
          <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
        <Link href="/servicios" className="btn-ghost">
          Ver todos los servicios
        </Link>
      </PageHero>

      {/* Problema que resuelve + Qué incluye */}
      <section className="bg-cloud py-20 sm:py-28">
        <div className="container-px grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow !border-coral/30 !bg-coral/10 !text-coral-dark">
              El problema que resuelve
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {service.summary}
            </h2>
            <p className="mt-4 leading-relaxed text-mist">{service.problem}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-navy/10 bg-white p-7 shadow-card">
              <h3 className="font-display text-xl font-semibold text-ink">
                Qué incluye
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-ink/80">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mockup / imagen del servicio (placeholder) */}
      <section className="bg-navy py-20 text-white sm:py-28">
        <div className="container-px">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-700/60 shadow-glow">
              <div className="sunrise-glow pointer-events-none absolute inset-0 opacity-70" />
              <div className="relative flex aspect-[16/9] flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-sky">
                  <service.icon className="h-8 w-8" />
                </span>
                <p className="font-display text-lg font-semibold">
                  Mockup / imagen de {service.name}
                </p>
                <p className="max-w-md text-sm text-cloud/60">
                  [Placeholder] Aquí irá una captura, mockup o demo del servicio.
                  Reemplázalo cuando llenes esta página.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 text-center">
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
              >
                Agenda una llamada
                <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
