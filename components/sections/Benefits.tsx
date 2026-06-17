import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import {
  ClockIcon,
  GaugeIcon,
  CompassIcon,
  RepeatIcon,
  CheckIcon,
} from "@/components/icons";

const benefits = [
  {
    icon: ClockIcon,
    lead: "Recupera hasta 10 horas a la semana.",
    text: "El tiempo que hoy se te va contestando lo mismo una y otra vez, ahora lo hace el sistema solo.",
  },
  {
    icon: GaugeIcon,
    lead: "Contesta en segundos, las 24 horas.",
    text: "Tus clientes reciben respuesta al instante, incluso cuando duermes. Nunca más “perdí la venta por tardarme”.",
  },
  {
    icon: CompassIcon,
    lead: "Deja el teléfono sin miedo.",
    text: "Come, viaja, descansa. Tu negocio sigue atendiendo y agendando sin ti.",
  },
  {
    icon: RepeatIcon,
    lead: "Ningún cliente se queda sin seguimiento.",
    text: "El sistema le da seguimiento a cada interesado, en automático, hasta que agenda o compra.",
  },
  {
    icon: CheckIcon,
    lead: "Tus citas se agendan solas.",
    text: "El cliente elige horario y queda en tu calendario. Tú solo te presentas.",
  },
];

export function Benefits() {
  return (
    <section id="solucion" className="bg-cloud py-20 sm:py-28">
      <div className="container-px">
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-sky" />
            La solución
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Imagina tu negocio funcionando solo, aunque tú no estés.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-mist">
            Eso es Lead Pilot. Un sistema con inteligencia artificial que atiende
            a tus clientes por ti, mientras tú haces lo que de verdad importa: tu
            trabajo, tu familia, tu descanso.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.lead} delay={i * 0.08} className="h-full">
              <TiltCard className="flex h-full flex-col rounded-3xl border border-navy/10 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-glow">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky/10 text-sky">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {b.lead}
                </h3>
                <p className="mt-2 leading-relaxed text-mist">{b.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
