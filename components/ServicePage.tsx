import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/services";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { LazyMount } from "@/components/LazyMount";
import { ServiceVisualPlaceholder } from "@/components/ServiceVisualPlaceholder";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";

/**
 * Plantilla reutilizable de "página de servicio".
 * Secciones: 1) hero con motion graphics al lado, 2) el problema,
 * 3) qué hace por ti (benefits), 4) prueba (mockup enmarcado),
 * 5) (opcional) imagen de escena, 6) CTA final.
 * Navbar/footer vienen del layout raíz (consistentes en todo el sitio).
 *
 * Pasa `visual` para usar el motion graphics propio del servicio; si no, se
 * muestra un placeholder on-brand.
 */
/** Envuelve en TiltCard solo si `enabled`; si no, deja el contenido tal cual. */
function MaybeTilt({
  enabled,
  className,
  children,
}: {
  enabled: boolean;
  className?: string;
  children: ReactNode;
}) {
  if (!enabled) return <div className={className}>{children}</div>;
  return (
    <TiltCard max={6} className={className}>
      {children}
    </TiltCard>
  );
}

export function ServicePage({
  service,
  visual,
  phoneDemo,
}: {
  service: Service;
  visual?: ReactNode;
  /** Si se pasa, reemplaza la imagen dentro del mockup de teléfono por una
   *  animación interactiva (p. ej. el chat de WhatsApp en automático). */
  phoneDemo?: ReactNode;
}) {
  return (
    <main>
      {/* 1 · Hero del servicio (texto + motion graphics al lado) */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(80% 70% at 50% 20%, black 30%, transparent 100%)",
          }}
        />
        <div className="sunrise-glow pointer-events-none absolute -top-24 right-0 h-[520px] w-[520px] rounded-full blur-[120px]" />

        <div className="container-px relative z-10 grid items-center gap-12 pb-16 pt-32 sm:pt-40 lg:grid-cols-[1.05fr_1fr] lg:pb-20">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" />
              {service.eyebrow}
            </span>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cloud/75">
              {service.tagline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contacto" className="btn-primary group">
                {service.cta ?? "Quiero recuperar mi tiempo"}
                <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link href="/servicios" className="btn-ghost">
                Ver todos los servicios
              </Link>
            </div>
          </Reveal>

          <div className="flex justify-center lg:justify-end" aria-hidden="true">
            {visual ?? (
              <ServiceVisualPlaceholder
                icon={<service.icon className="h-10 w-10" />}
                label={service.name}
              />
            )}
          </div>
        </div>

        <div className="relative">
          <svg
            className="block h-10 w-full sm:h-16"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 80 C 360 20, 1080 20, 1440 80 L 1440 80 L 0 80 Z" fill="#F4F7FB" />
          </svg>
        </div>
      </section>

      {/* 2 · El problema */}
      <section className="cv-auto bg-cloud py-20 sm:py-28">
        <div className="container-px max-w-3xl">
          <Reveal>
            <span className="eyebrow !border-coral/30 !bg-coral/10 !text-coral-dark">
              El problema
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {service.summary}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-mist">
              {service.problem}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 · Qué hace por ti */}
      <section className="cv-auto bg-navy py-20 text-white sm:py-28">
        <div className="container-px">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" />
              Qué hace por ti
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl">
              Tu negocio, atendido sin que tú estés encima.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item, i) => (
              <Reveal key={item} delay={i * 0.08} className="h-full">
                <div className="flex h-full items-start gap-3 rounded-3xl border border-white/10 bg-navy-700/60 p-6">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky/15 text-sky">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <p className="leading-relaxed text-cloud/85">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Prueba: mockup real enmarcado */}
      <section className="cv-auto bg-cloud py-20 sm:py-28">
        <div className="container-px">
          <Reveal>
            <div className="text-center">
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                Así se ve
              </span>
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                Software real, funcionando para tu negocio.
              </h2>
            </div>
          </Reveal>

          {phoneDemo || (service.mockup?.variant === "phone" && service.mockup.src) ? (
            /* Mockup de teléfono con sombra suave + leve tilt 3D al hover */
            <Reveal delay={0.1}>
              <figure className="mt-12 flex flex-col items-center">
                <TiltCard max={9} className="w-[250px] sm:w-[270px]">
                  <div
                    className="relative aspect-[9/19] rounded-[2.6rem] border-[10px] border-[#0b1b2b] bg-[#0b1b2b]"
                    style={{ boxShadow: "0 40px 90px -30px rgba(11,20,43,0.55)" }}
                  >
                    <div className="absolute left-1/2 top-2.5 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-[#0b1b2b]" />
                    <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-white">
                      {phoneDemo ? (
                        <LazyMount className="h-full w-full" minHeight={0}>
                          {phoneDemo}
                        </LazyMount>
                      ) : (
                        <Image
                          src={service.mockup!.src!}
                          alt={service.mockup!.alt}
                          fill
                          sizes="270px"
                          className="object-cover object-top"
                        />
                      )}
                    </div>
                  </div>
                </TiltCard>
                {service.mockup?.caption && (
                  <figcaption className="mt-6 max-w-md text-center text-sm text-mist">
                    {service.mockup.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ) : service.mockup?.variant === "laptop" && service.mockup.src ? (
            /* Mockup de laptop con sombra suave */
            <Reveal delay={0.1}>
              <figure className="mt-12 flex flex-col items-center">
                <div className="w-full max-w-2xl">
                  {/* Pantalla */}
                  <div
                    className="relative rounded-t-2xl border-[10px] border-b-0 border-[#0b1b2b] bg-[#0b1b2b]"
                    style={{ boxShadow: "0 40px 90px -35px rgba(11,20,43,0.5)" }}
                  >
                    {/* Cámara */}
                    <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/25" />
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-lg bg-white">
                      <Image
                        src={service.mockup.src}
                        alt={service.mockup.alt}
                        fill
                        sizes="(min-width: 768px) 672px, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  {/* Base / bisagra */}
                  <div className="relative h-3 rounded-b-xl bg-[#0b1b2b]">
                    <div className="absolute left-1/2 top-0 h-1.5 w-28 -translate-x-1/2 rounded-b-lg bg-white/10" />
                  </div>
                  <div className="mx-auto h-1.5 w-[58%] rounded-b-2xl bg-[#0b1b2b]/80 shadow-[0_18px_30px_-12px_rgba(11,20,43,0.5)]" />
                </div>
                {service.mockup?.caption && (
                  <figcaption className="mt-6 max-w-md text-center text-sm text-mist">
                    {service.mockup.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ) : (
            <Reveal delay={0.1}>
              <figure className="mx-auto mt-10 flex max-w-4xl flex-col items-center">
                <MaybeTilt enabled={!!service.mockup?.tilt} className="w-full">
                  <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card">
                    {/* Marco estilo ventana */}
                    <div className="flex items-center gap-1.5 border-b border-navy/10 bg-cloud px-4 py-3">
                      <span className="h-3 w-3 rounded-full bg-coral/60" />
                      <span className="h-3 w-3 rounded-full bg-amber/70" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400/60" />
                      <span className="ml-3 truncate text-xs text-mist">
                        app.leadpilot.com.mx · {service.eyebrow}
                      </span>
                    </div>

                    {service.mockup?.src ? (
                      <Image
                        src={service.mockup.src}
                        alt={service.mockup.alt}
                        width={1600}
                        height={900}
                        className="h-auto w-full"
                      />
                    ) : (
                      <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3 bg-gradient-to-br from-cloud to-white p-8 text-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky/10 text-sky">
                          <service.icon className="h-8 w-8" />
                        </span>
                        <p className="font-display text-lg font-semibold text-ink">
                          Captura del servicio
                        </p>
                        <p className="max-w-md text-sm text-mist">
                          [Placeholder] Aquí va la captura real del servicio. Pásamela
                          y la enmarco en esta ventana.
                        </p>
                      </div>
                    )}
                  </div>
                </MaybeTilt>

                {service.mockup?.caption && (
                  <figcaption className="mt-6 max-w-md text-center text-sm text-mist">
                    {service.mockup.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          )}
        </div>
      </section>

      {/* 5 · (Opcional) imagen de escena cerca del cierre */}
      {service.scene && (
        <section className="bg-navy py-20 text-white sm:py-28">
          <div className="container-px">
            <Reveal>
              <figure className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 shadow-glow">
                <Image
                  src={service.scene.src}
                  alt={service.scene.alt}
                  width={1600}
                  height={900}
                  className="h-auto w-full"
                />
                {service.scene.caption && (
                  <figcaption className="px-4 py-3 text-center text-sm text-cloud/60">
                    {service.scene.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      {/* 6 · CTA final */}
      <FinalCTA />
    </main>
  );
}
