import { Reveal } from "@/components/motion/Reveal";
import { CompassIcon, WrenchIcon, GaugeIcon } from "@/components/icons";

const steps = [
  {
    n: "01",
    icon: CompassIcon,
    title: "Diagnóstico",
    text: "Analizamos tu operación y detectamos dónde se te están escapando clientes. Salimos con un plan de vuelo claro: qué automatizar primero y qué impacto esperar.",
  },
  {
    n: "02",
    icon: WrenchIcon,
    title: "Implementación",
    text: "Montamos tus flujos de IA: respuestas automáticas, seguimiento y conexión con tus herramientas actuales (WhatsApp, CRM, agenda). Sin que tengas que cambiar cómo trabajas.",
  },
  {
    n: "03",
    icon: GaugeIcon,
    title: "Operación y ajuste",
    text: "Lo ponemos a volar y medimos resultados. Afinamos los mensajes y procesos mes con mes para que cada vez convierta más. Tú solo ves entrar los clientes.",
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
            Tres etapas para poner tu negocio en piloto automático.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-cloud/70">
            Un proceso claro y sin sorpresas. Tú al mando en cada decisión,
            nosotros en los controles técnicos.
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
