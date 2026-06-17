import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { QuoteIcon } from "@/components/icons";

// PLACEHOLDER: reemplaza estos testimonios por los reales.
// Mantén la misma estructura (quote, name, role, initials).
const testimonials = [
  {
    quote:
      "Antes no soltaba el teléfono ni en la cena. Ahora mis clientes reciben respuesta al instante y yo por fin desconecto. No he perdido ni una cita.",
    name: "Nombre Apellido",
    role: "Tipo de negocio (ej. consultorio dental)",
    initials: "NA",
  },
  {
    quote:
      "[Placeholder] El dolor antes → qué cambió → el beneficio emocional. Reemplázalo con la voz real de tu cliente: cuánto tiempo recuperó y cómo se siente ahora.",
    name: "Nombre Apellido",
    role: "Tipo de negocio (ej. despacho contable)",
    initials: "NA",
  },
  {
    quote:
      "[Placeholder] “Vivía contestando a toda hora; ahora el sistema atiende solo y yo me dedico a lo mío.” Una frase honesta y concreta vale más que mil adjetivos.",
    name: "Nombre Apellido",
    role: "Tipo de negocio (ej. taller mecánico)",
    initials: "NA",
  },
];

export function Testimonials() {
  return (
    <section id="casos" className="bg-cloud py-20 sm:py-28">
      <div className="container-px">
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            Casos
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Negocios como el tuyo que ya recuperaron su tiempo.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-mist">
            El dolor de antes, qué cambió y cómo se siente hoy. Pronto, historias
            reales de dueños que dejaron de vivir pegados al teléfono.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <TiltCard className="flex h-full flex-col rounded-3xl border border-navy/10 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-glow">
                <QuoteIcon className="h-8 w-8 text-sky/40" />
                <p className="mt-4 flex-1 leading-relaxed text-ink/85">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-navy/10 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky to-coral font-display text-sm font-semibold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">
                      {t.name}
                    </p>
                    <p className="text-xs text-mist">{t.role}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
