import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { QuoteIcon } from "@/components/icons";

// PLACEHOLDER: reemplaza estos testimonios por los reales.
// Mantén la misma estructura (quote, name, role, initials).
const testimonials = [
  {
    quote:
      "Texto de testimonio de ejemplo. Aquí va lo que dijo tu cliente sobre cómo Lead Pilot le ayudó a responder más rápido y cerrar más ventas.",
    name: "Nombre Apellido",
    role: "Dueño · Negocio de ejemplo",
    initials: "NA",
  },
  {
    quote:
      "Segundo testimonio de ejemplo. Reemplázalo con un resultado concreto: cuántos clientes recuperó, cuánto tiempo ahorró o cuánto creció.",
    name: "Nombre Apellido",
    role: "Gerente · Empresa de ejemplo",
    initials: "NA",
  },
  {
    quote:
      "Tercer testimonio de ejemplo. Una frase honesta y específica genera más confianza que mil adjetivos. Pon aquí la voz real de tu cliente.",
    name: "Nombre Apellido",
    role: "Fundadora · Marca de ejemplo",
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
            Negocios que ya van en piloto automático.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-mist">
            Resultados reales de PyMEs que dejaron de perder clientes.
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
