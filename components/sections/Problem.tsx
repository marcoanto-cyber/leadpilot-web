import { Reveal } from "@/components/motion/Reveal";
import BorderGlow from "@/components/reactbits/BorderGlow";
import { ClockIcon, ChainBreakIcon, RepeatIcon } from "@/components/icons";

const pains = [
  {
    n: "01",
    icon: ClockIcon,
    title: "No puedes desconectar",
    text: "Cada mensaje sin contestar es una venta que se enfría. Así que contestas a toda hora, hasta en tu día libre. Tu negocio depende de que tú nunca apagues el teléfono.",
  },
  {
    n: "02",
    icon: ChainBreakIcon,
    title: "Se te escapan clientes sin darte cuenta",
    text: "Mientras atiendes a uno, tres más escribieron y no alcanzaste a responder. Para cuando los ves, ya se fueron con quien sí les contestó a tiempo.",
  },
  {
    n: "03",
    icon: RepeatIcon,
    title: "El seguimiento se te cae",
    text: "“Déjame lo checo y le aviso.” Y se te olvida. No por flojera, sino porque eres una sola persona haciendo el trabajo de cinco.",
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
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Si dejas de contestar, dejas de vender. Y contestar te está costando
            tu vida.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-mist">
            Lo conoces bien: el cliente que escribe a las 10 de la noche y, si no
            respondes rápido, mañana ya le compró a otro. Así que vives con el
            teléfono en la mano. En la comida. En el cine. En vacaciones que no
            son vacaciones.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12} className="h-full">
              <BorderGlow
                className="h-full"
                backgroundColor="#070B16"
                borderRadius={24}
                glowColor="16 100% 66%"
                glowIntensity={1.35}
                glowRadius={38}
                edgeSensitivity={26}
                coneSpread={22}
                colors={["#4D8BFF", "#FF7849", "#FFC56E"]}
              >
                <div className="flex h-full flex-col p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral/15 text-coral">
                      <p.icon className="h-6 w-6" />
                    </div>
                    <span className="font-display text-sm font-bold tracking-wider text-coral/70">
                      {p.n}
                    </span>
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
