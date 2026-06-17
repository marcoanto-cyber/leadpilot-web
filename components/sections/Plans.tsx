import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { CALENDAR_URL } from "@/lib/config";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";

type Plan = {
  name: string;
  implementation: string;
  monthly: string;
  tagline: string;
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Despegue",
    implementation: "$12,500",
    monthly: "$2,500",
    tagline: "Lo esencial para arrancar y dejar de perder mensajes.",
    features: [
      "Configuración base de tu plataforma a medida",
      "Flujos de automatización esenciales",
      "1 bot de IA para WhatsApp y redes sociales",
      "Acompañamiento personalizado 20 días",
      "Soporte técnico",
    ],
  },
  {
    name: "Crucero",
    implementation: "$28,000",
    monthly: "$3,500",
    tagline: "El favorito: atención, ventas y marketing trabajando juntos.",
    featured: true,
    features: [
      "Todo lo de Despegue",
      "Pipelines y gestión de equipo comercial",
      "Email marketing + WhatsApp marketing",
      "1 página web / funnel de conversión",
      "Notificaciones internas y asignación de leads",
      "Bots de IA multicanal",
      "Acompañamiento personalizado 3 meses",
      "Soporte técnico prioritario",
    ],
  },
  {
    name: "Comando",
    implementation: "$80,000",
    monthly: "$5,000",
    tagline: "El ecosistema completo para operaciones que escalan.",
    features: [
      "Todo lo de Crucero",
      "Implementación completa del ecosistema",
      "LMS para videocursos / membresías",
      "Automatizaciones complejas multi-departamento",
      "Múltiples funnels y páginas",
      "Acompañamiento personalizado 6 meses",
      "Soporte prioritario",
    ],
  },
];

export function Plans({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="planes" className="bg-cloud py-20 sm:py-28">
      <div className="container-px">
        {showHeading && (
          <Reveal>
            <div className="text-center">
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                Planes
              </span>
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                Elige cuánto quieres que tu negocio trabaje por ti.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-mist">
                Cada negocio es distinto, así que el precio final lo definimos
                juntos en una llamada. Estos son los puntos de partida.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} className="h-full">
              <TiltCard
                max={plan.featured ? 5 : 6}
                className={`relative flex h-full flex-col rounded-3xl p-7 transition-shadow duration-300 ${
                  plan.featured
                    ? "bg-navy text-white shadow-glow ring-1 ring-sky/40 lg:-mt-4"
                    : "border border-navy/10 bg-white text-ink shadow-card hover:shadow-glow"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-coral px-4 py-1 font-display text-xs font-semibold uppercase tracking-wider text-white shadow-coral">
                    Más elegido
                  </span>
                )}

                <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                <p
                  className={`mt-2 text-sm ${
                    plan.featured ? "text-cloud/70" : "text-mist"
                  }`}
                >
                  {plan.tagline}
                </p>

                <div className="mt-6">
                  <div className="flex items-end gap-1.5">
                    <span className="font-display text-3xl font-bold">
                      {plan.implementation}
                    </span>
                    <span
                      className={`mb-1 text-sm ${
                        plan.featured ? "text-cloud/60" : "text-mist"
                      }`}
                    >
                      MXN implementación
                    </span>
                  </div>
                  <div
                    className={`mt-1 font-display text-lg font-semibold ${
                      plan.featured ? "text-amber" : "text-coral-dark"
                    }`}
                  >
                    + {plan.monthly} MXN/mes
                  </div>
                  <p
                    className={`mt-1 text-xs ${
                      plan.featured ? "text-cloud/50" : "text-mist"
                    }`}
                  >
                    Pago único de implementación + mensualidad
                  </p>
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckIcon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.featured ? "text-amber" : "text-sky"
                        }`}
                      />
                      <span className={plan.featured ? "text-cloud/85" : "text-ink/80"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group mt-8 ${plan.featured ? "btn-primary" : "btn-outline"}`}
                >
                  Agenda una llamada
                  <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Enterprise — franja inferior */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col items-start gap-6 overflow-hidden rounded-3xl border border-navy/10 bg-navy p-8 text-white shadow-glow sm:flex-row sm:items-center sm:justify-between">
            <div className="relative">
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                Enterprise
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold">
                Cotización personalizada
              </h3>
              <p className="mt-2 max-w-xl text-cloud/70">
                Solución a la medida para empresas grandes, con integraciones,
                volumen y necesidades específicas.
              </p>
            </div>
            <Link href="/contacto" className="btn-primary group shrink-0">
              Solicita una cotización
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {/* Nota de cierre */}
        <Reveal delay={0.12}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-ink">
            ¿No sabes cuál te conviene? Cuéntame tu caso en una llamada y te digo
            con honestidad qué necesitas —y qué no.
          </p>
        </Reveal>

        {/* Nota de costos de plataforma */}
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-mist">
            Los precios no incluyen los costos de uso de tu plataforma (mensajes
            de WhatsApp, consumo de IA, envíos de email), que se facturan según
            el consumo de cada negocio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
