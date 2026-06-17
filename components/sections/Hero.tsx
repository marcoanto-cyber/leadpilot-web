"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { CALENDAR_URL, whatsappUrl } from "@/lib/config";
import { ProductDemo } from "@/components/ProductDemo";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";

// Carga diferida y solo en cliente: la lente WebGL no entra en el bundle inicial.
const FluidGlass = dynamic(() => import("@/components/reactbits/FluidGlass"), {
  ssr: false,
});

export function Hero() {
  const reduce = useReducedMotion();

  // El titular de vidrio se monta en desktop y móvil; solo se omite si el
  // usuario pidió menos movimiento (ahí mostramos el titular HTML estático).
  // En desktop la lente sigue el cursor; en táctil deriva sola.
  const [showGlass, setShowGlass] = useState(false);
  useEffect(() => {
    setShowGlass(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const fade = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-navy text-white"
    >
      {/* Fondo: cuadrícula tenue + glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(80% 60% at 50% 30%, black 30%, transparent 100%)",
        }}
      />
      <div className="sunrise-glow pointer-events-none absolute -top-20 right-0 h-[600px] w-[600px]" />

      {/* Lente de vidrio (FluidGlass) sobre TODO el hero, detrás del contenido y
          sin capturar el puntero. Refracta el titular WebGL anclado al DOM. */}
      {showGlass && (
        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
          <FluidGlass
            anchorId="hero-headline-anchor"
            lines={[
              { text: "Deja de perder", color: "#FFFFFF" },
              { text: "clientes por no", color: "#FFFFFF" },
              { text: "responder a tiempo.", color: "#FF7849" },
            ]}
            lensProps={{
              scale: 0.23,
              ior: 1.25,
              thickness: 8,
              chromaticAberration: 0.22,
              anisotropy: 0.02,
            }}
          />
        </div>
      )}

      <div className="container-px relative z-10 grid items-center gap-12 pb-20 pt-32 sm:pt-36 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-40">
        <div>
          <motion.span
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            Automatización con IA para PyMEs
          </motion.span>

          {showGlass ? (
            <>
              {/* Titular real para SEO y lectores de pantalla (no visible) */}
              <h1 className="sr-only">
                Deja de perder clientes por no responder a tiempo.
              </h1>
              {/* Caja-ancla: reserva el espacio y le dice a la lente dónde y de
                  qué tamaño dibujar el titular WebGL. Más alta = texto más grande. */}
              <motion.div
                id="hero-headline-anchor"
                custom={1}
                variants={fade}
                initial="hidden"
                animate="show"
                aria-hidden="true"
                className="mt-5 h-[210px] w-full sm:h-[250px] lg:h-[300px]"
              />
            </>
          ) : (
            <motion.h1
              custom={1}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Deja de perder clientes por{" "}
              <span className="relative whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-sky-soft via-amber to-coral">
                no responder a tiempo
              </span>
              .
            </motion.h1>
          )}

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-lg leading-relaxed text-cloud/75"
          >
            Lead Pilot es tu copiloto de inteligencia artificial: contesta al
            instante, da seguimiento sin que se te caiga ningún prospecto y
            quita de encima las tareas repetitivas. Tú al mando, la IA en los
            controles.
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              Agenda una llamada
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp directo
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-cloud/55"
          >
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400" />
              Implementación en semanas, no meses
            </span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span>Hecho en México, español de aquí</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <ProductDemo />
        </motion.div>
      </div>

      {/* Transición de ola hacia la sección clara */}
      <div className="relative">
        <svg
          className="block h-12 w-full sm:h-20"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 80 C 360 20, 1080 20, 1440 80 L 1440 80 L 0 80 Z"
            fill="#F4F7FB"
          />
        </svg>
      </div>
    </section>
  );
}
