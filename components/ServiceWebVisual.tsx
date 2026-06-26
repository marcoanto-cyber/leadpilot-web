"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Motion graphics del hero de "Web y Funnels".
// Una mini-landing se "arma sola" (encabezado, titular, formulario/botón en
// secuencia). Luego un cursor hace clic en el botón, llega un lead y una flecha
// lo lleva a un mini CRM que lo recibe. La métrica "Visitantes que se
// convirtieron" sube. Bucle. Estética Lead Pilot. Solo transform/opacity.
// Respeta prefers-reduced-motion (muestra el estado final estático).

const C = {
  base: "#0b1b2b",
  panel: "#0f2438",
  card: "#16314a",
  amber: "#f2a93b",
  sky: "#4D8BFF",
  green: "#34d399",
  text: "#e6eef7",
  muted: "#8aa0b4",
};

// 0 marco · 1 encabezado · 2 titular · 3 form/botón · 4 clic · 5 lead→CRM
const STEPS = 6;
const STEP_MS = 950;

export function ServiceWebVisual() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 5 : 0);
  const [converted, setConverted] = useState(326);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS), STEP_MS);
    return () => clearInterval(id);
  }, [reduce]);

  // Cada vez que se completa el clic→lead, sube el contador.
  useEffect(() => {
    if (!reduce && step === 5) setConverted((n) => n + 1);
  }, [step, reduce]);

  const show = (n: number) => reduce || step >= n;
  const clicking = !reduce && step >= 4;
  const leadInCrm = reduce || step >= 5;

  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-[460px] overflow-hidden rounded-3xl border border-white/10 p-4 sm:p-5"
      style={{
        background: `radial-gradient(130% 110% at 78% 16%, #133250, ${C.base})`,
        boxShadow: "0 40px 90px -35px rgba(0,0,0,0.75)",
      }}
    >
      {/* Etiqueta */}
      <div
        className="relative z-20 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
        style={{ background: "rgba(242,169,59,0.12)", border: "1px solid rgba(242,169,59,0.3)" }}
      >
        <span className="relative flex h-2 w-2">
          {!reduce && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: C.amber }} />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: C.amber }} />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.amber }}>
          Página que convierte
        </span>
      </div>

      <div className="mt-4 flex items-stretch gap-2">
        {/* Mini-landing que se arma sola */}
        <div
          className="relative flex-[1.5] overflow-hidden rounded-xl border border-white/10"
          style={{ background: C.panel }}
        >
          {/* Barra del navegador */}
          <div className="flex items-center gap-1 border-b border-white/8 px-2 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="ml-1.5 h-2 flex-1 rounded-full bg-white/5" />
          </div>

          <div className="flex flex-col gap-2 p-2.5">
            {/* Encabezado */}
            <motion.div
              className="flex items-center justify-between"
              initial={false}
              animate={{ opacity: show(1) ? 1 : 0, y: show(1) ? 0 : 8 }}
              transition={{ duration: 0.4 }}
            >
              <span className="h-2 w-10 rounded-full" style={{ background: C.amber }} />
              <span className="flex gap-1">
                <span className="h-1.5 w-4 rounded-full bg-white/15" />
                <span className="h-1.5 w-4 rounded-full bg-white/15" />
              </span>
            </motion.div>

            {/* Titular + texto */}
            <motion.div
              className="mt-1 flex flex-col gap-1.5"
              initial={false}
              animate={{ opacity: show(2) ? 1 : 0, y: show(2) ? 0 : 8 }}
              transition={{ duration: 0.4 }}
            >
              <span className="h-2.5 w-[80%] rounded-full bg-white/35" />
              <span className="h-2.5 w-[60%] rounded-full bg-white/25" />
              <span className="mt-1 h-1.5 w-[90%] rounded-full bg-white/10" />
              <span className="h-1.5 w-[70%] rounded-full bg-white/10" />
            </motion.div>

            {/* Formulario + botón */}
            <motion.div
              className="mt-1.5 flex flex-col gap-1.5"
              initial={false}
              animate={{ opacity: show(3) ? 1 : 0, y: show(3) ? 0 : 8 }}
              transition={{ duration: 0.4 }}
            >
              <span className="h-4 w-full rounded-md border border-white/10 bg-white/5" />
              <div className="relative">
                <motion.span
                  className="flex h-5 w-full items-center justify-center rounded-md text-[9px] font-bold"
                  style={{ background: C.amber, color: C.base }}
                  animate={clicking && !reduce ? { scale: [1, 0.94, 1] } : { scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  Quiero más info
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* Cursor que hace clic en el botón */}
          {!reduce && (
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="absolute z-10 drop-shadow"
              initial={false}
              animate={{
                left: step >= 4 ? "62%" : "82%",
                top: step >= 4 ? "82%" : "60%",
                opacity: step >= 3 ? 1 : 0,
                scale: step === 4 ? 0.85 : 1,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ position: "absolute" }}
            >
              <path d="M4 2l7 18 2.5-7L20 11 4 2z" fill="#fff" stroke="#0b1b2b" strokeWidth="1.4" strokeLinejoin="round" />
            </motion.svg>
          )}
        </div>

        {/* Flecha + Mini CRM que recibe el lead */}
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          {/* Flecha animada */}
          <div className="relative flex h-4 w-full items-center justify-center">
            <div className="h-[2px] w-full rounded-full" style={{ background: "rgba(111,160,255,0.2)" }} />
            {!reduce &&
              [0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full"
                  style={{ background: C.sky, left: 0 }}
                  animate={step >= 5 ? { left: ["0%", "100%"], opacity: [0, 1, 0] } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.18, ease: "easeIn" }}
                />
              ))}
          </div>

          <div className="w-full rounded-xl border border-white/10 p-2" style={{ background: C.panel }}>
            <p className="mb-1.5 text-[8px] font-bold uppercase tracking-wide" style={{ color: C.muted }}>
              CRM
            </p>
            <div className="flex flex-col gap-1.5">
              {/* Tarjeta de lead recién llegada */}
              <AnimatePresence>
                {leadInCrm && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, x: -10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="flex items-center gap-1.5 rounded-lg border p-1.5"
                    style={{ background: C.card, borderColor: C.green }}
                  >
                    <span
                      className="flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-bold"
                      style={{ background: "rgba(52,211,153,0.2)", color: C.green }}
                    >
                      N
                    </span>
                    <span className="text-[8.5px] font-semibold" style={{ color: C.text }}>
                      Nuevo lead
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Tarjetas previas (estáticas) */}
              <div className="flex items-center gap-1.5 rounded-lg p-1.5 opacity-50" style={{ background: C.card }}>
                <span className="h-4 w-4 rounded-full bg-white/10" />
                <span className="h-1.5 w-12 rounded-full bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métrica */}
      <div
        className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-xl border border-white/10 px-3 py-2.5 sm:left-5 sm:right-5"
        style={{ background: C.panel }}
      >
        <div>
          <p className="text-[9px] uppercase tracking-wide" style={{ color: C.muted }}>
            Visitantes que se convirtieron
          </p>
          <div className="flex items-center gap-1.5">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={converted}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="font-display text-lg font-bold"
                style={{ color: C.amber }}
              >
                {converted.toLocaleString("es-MX")}
              </motion.span>
            </AnimatePresence>
            <span className="text-[9px]" style={{ color: C.green }}>▲ en vivo</span>
          </div>
        </div>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: "rgba(77,139,255,0.12)", color: C.sky }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20V10M18 20V4M6 20v-4" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
