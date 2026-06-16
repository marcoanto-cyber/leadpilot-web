import { Reveal } from "@/components/motion/Reveal";
import { CALENDAR_URL, whatsappUrl } from "@/lib/config";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-28">
      <div className="sunrise-glow pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(70% 70% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      <div className="container-px relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            ¿Listo para dejar de perder clientes?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cloud/75">
            Agenda una llamada de 30 minutos. Sin compromiso: salimos de ahí con
            un plan claro de qué automatizar primero en tu negocio.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              Agenda una llamada
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Prefiero WhatsApp
            </a>
          </div>

          <p className="mt-6 text-sm text-cloud/50">
            Respuesta el mismo día · Atención en español de México
          </p>
        </Reveal>
      </div>
    </section>
  );
}
