import { Reveal } from "@/components/motion/Reveal";
import BorderGlow from "@/components/reactbits/BorderGlow";
import { ClockIcon, ChainBreakIcon, RepeatIcon } from "@/components/icons";

const pains = [
  {
    icon: ClockIcon,
    title: "Respondes tarde",
    text: "El 78% de los clientes le compra al primer negocio que contesta. Si tardas horas, el prospecto ya se fue con la competencia.",
  },
  {
    icon: ChainBreakIcon,
    title: "El seguimiento se te cae",
    text: "Cotizaste, quedaste de marcar… y se perdió entre mil pendientes. Sin seguimiento constante, el dinero se queda en el aire.",
  },
  {
    icon: RepeatIcon,
    title: "Tareas repetitivas te comen el día",
    text: "Agendar, capturar datos, mandar el mismo mensaje veinte veces. Horas valiosas que podrías invertir en hacer crecer tu negocio.",
  },
];

export function Problem() {
  return (
    <section id="problema" className="bg-cloud py-20 sm:py-28">
      <div className="container-px">
        <Reveal>
          <span className="eyebrow !border-coral/30 !bg-coral/10 !text-coral-dark">
            El problema
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Cada mensaje sin responder es un cliente que se va con otro.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-mist">
            No es falta de ganas, es falta de tiempo y de manos. Estos son los
            tres huecos por donde se te escapan las ventas:
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12} className="h-full">
              <BorderGlow
                className="h-full"
                backgroundColor="#0B1437"
                borderRadius={24}
                glowColor="16 100% 66%"
                glowRadius={34}
                edgeSensitivity={28}
                coneSpread={22}
                colors={["#3D7EFF", "#FF7849", "#FFC56E"]}
              >
                <div className="flex h-full flex-col p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral/15 text-coral">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-cloud/70">{p.text}</p>
                </div>
              </BorderGlow>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
