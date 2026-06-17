import { Reveal } from "@/components/motion/Reveal";
import { CompassIcon, WrenchIcon, GaugeIcon } from "@/components/icons";

const steps = [
  {
    n: "01",
    icon: CompassIcon,
    title: "Platicamos tu caso",
    text: "En una llamada corta me cuentas cómo trabajas y dónde se te van los clientes. Sin tecnicismos.",
  },
  {
    n: "02",
    icon: WrenchIcon,
    title: "Armo tu sistema",
    text: "Yo configuro todo por ti: las respuestas automáticas, el seguimiento y la agenda. Tú no tocas nada complicado.",
  },
  {
    n: "03",
    icon: GaugeIcon,
    title: "Tu negocio empieza a volar solo",
    text: "En pocos días tu negocio ya contesta, agenda y da seguimiento sin ti. Y yo te acompaño para que todo funcione perfecto.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative bg-navy py-20 text-white sm:py-28">
      <div className="sunrise-glow pointer-events-none absolute -left-40 -top-24 h-[480px] w-[480px] rounded-full opacity-40 blur-[130px]" />
      <div className="container-px relative">
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-sky" />
            Cómo funciona
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl">
            Empezar es más fácil de lo que crees.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-cloud/70">
            Sin tecnicismos y sin que tengas que aprender nada nuevo. Yo me
            encargo de la parte técnica; tú solo cuéntame tu caso.
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* Línea de ruta que conecta las etapas (desktop) */}
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-sky/40 via-amber/40 to-coral/40 md:block" />

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.15}>
                <div className="relative">
                  <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/12 bg-navy-700 text-sky shadow-glow">
                    <s.icon className="h-7 w-7" />
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-coral font-display text-xs font-bold text-white">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-cloud/70">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
