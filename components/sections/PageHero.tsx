import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  /** Color del punto del eyebrow */
  accent?: "sky" | "coral";
  /** Capa decorativa full-bleed detrás del contenido (p. ej. una animación). */
  backdrop?: ReactNode;
};

/** Hero oscuro reutilizable para páginas internas (servicios, planes, etc.). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  accent = "sky",
  backdrop,
}: PageHeroProps) {
  return (
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
      {backdrop && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {backdrop}
        </div>
      )}
      <div className="sunrise-glow pointer-events-none absolute -top-24 right-0 h-[520px] w-[520px] rounded-full blur-[120px]" />

      <div className="container-px relative z-10 pb-16 pt-32 sm:pb-20 sm:pt-40">
        <Reveal>
          <span className="eyebrow">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                accent === "coral" ? "bg-coral" : "bg-sky"
              }`}
            />
            {eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cloud/75">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {children}
            </div>
          )}
        </Reveal>
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
  );
}
