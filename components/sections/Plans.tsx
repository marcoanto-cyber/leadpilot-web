import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { CALENDAR_URL } from "@/lib/config";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";

type Plan = {
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  features: string[];
  featured?: boolean;
  cta: string;
};

const plans: Plan[] = [
  {
    name: "Esencial",
    price: "desde $4,900",
    priceNote: "MXN / mes",
    tagline: "Para dejar de perder mensajes y arrancar con la automatización.",
    features: [
      "Respuesta automática 24/7 en WhatsApp",
      "Captura y orden de prospectos",
      "1 flujo de seguimiento",
      "Reporte mensual de resultados",
    ],
    cta: "Agenda una llamada",
  },
  {
    name: "Pro",
    price: "desde $9,900",
    priceNote: "MXN / mes",
    tagline: "El favorito: automatiza atención, seguimiento y agenda completa.",
    features: [
      "Todo lo de Esencial, y además:",
      "IA que califica y agenda citas sola",
      "Seguimientos múltiples automáticos",
      "Integración con tu CRM y calendario",
      "Optimización mensual de mensajes",
      "Soporte prioritario",
    ],
    featured: true,
    cta: "Agenda una llamada",
  },
  {
    name: "Personalizado",
    price: "Hablemos",
    priceNote: "a tu medida",
    tagline: "Para operaciones con varios canales, equipos o necesidades especiales.",
    features: [
      "Automatizaciones a la medida",
      "Integraciones con tus sistemas internos",
      "Flujos para varios equipos o sucursales",
      "Acompañamiento dedicado",
    ],
    cta: "Agenda una llamada",
  },
];

export function Plans() {
  return (
    <section id="planes" className="bg-cloud py-20 sm:py-28">
      <div className="container-px">
        <Reveal>
          <div className="text-center">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" />
              Planes
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Elige tu plan de vuelo.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-mist">
              Precios de referencia para PyMEs. El alcance final lo definimos
              juntos en la llamada, según lo que tu negocio necesita.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} className="h-full">
              <TiltCard
                max={plan.featured ? 5 : 6}
                className={`relative flex h-full flex-col rounded-3xl p-7 transition-shadow duration-300 ${
                  plan.featured
                    ? "bg-navy text-white shadow-glow ring-1 ring-sky/40 lg:-mt-4 lg:mb-0"
                    : "border border-navy/10 bg-white text-ink shadow-card hover:shadow-glow"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-coral px-4 py-1 font-display text-xs font-semibold uppercase tracking-wider text-white shadow-coral">
                    Más elegido
                  </span>
                )}

                <h3 className="font-display text-xl font-semibold">
                  {plan.name}
                </h3>
                <p
                  className={`mt-2 text-sm ${
                    plan.featured ? "text-cloud/70" : "text-mist"
                  }`}
                >
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-end gap-1.5">
                  <span className="font-display text-3xl font-bold">
                    {plan.price}
                  </span>
                  <span
                    className={`mb-1 text-sm ${
                      plan.featured ? "text-cloud/60" : "text-mist"
                    }`}
                  >
                    {plan.priceNote}
                  </span>
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckIcon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.featured ? "text-amber" : "text-sky"
                        }`}
                      />
                      <span
                        className={
                          plan.featured ? "text-cloud/85" : "text-ink/80"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group mt-8 ${
                    plan.featured ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {plan.cta}
                  <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-sm text-mist">
            Sin contratos forzosos. Cancelas cuando quieras.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
