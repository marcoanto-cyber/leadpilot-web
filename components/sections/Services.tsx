import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { services } from "@/lib/services";
import { ArrowRightIcon } from "@/components/icons";

type ServicesProps = {
  /** Oculta el encabezado cuando se usa debajo de un PageHero. */
  showHeading?: boolean;
};

export function Services({ showHeading = true }: ServicesProps) {
  return (
    <section id="servicios" className="bg-cloud py-20 sm:py-28">
      <div className="container-px">
        {showHeading && (
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" />
              Servicios
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Todo lo que tu negocio necesita para crecer en automático.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-mist">
              Elige por dónde empezar. Cada servicio se conecta con los demás
              para que tu operación funcione como un solo sistema.
            </p>
          </Reveal>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08} className="h-full">
              <TiltCard className="h-full">
                <Link
                  href={`/servicios/${s.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-navy/10 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-glow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky/10 text-sky">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {s.name}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-mist">
                    {s.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-sky">
                    Ver servicio
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
