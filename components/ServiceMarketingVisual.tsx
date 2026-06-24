"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Motion graphics del hero de la página de Marketing (Email + WhatsApp).
// Idea: una lista de contactos a la izquierda y una "campaña" que, sola, dispara
// mensajes (sobres de email y burbujas de WhatsApp) hacia cada contacto en
// secuencia, en bucle. Dos métricas suben: "Mensajes enviados" y "Clientes que
// regresaron". Sensación de envío masivo automático pero ordenado.
// Estética Lead Pilot. Solo transform/opacity. Respeta prefers-reduced-motion.

const C = {
  base: "#0b1b2b",
  panel: "#0f2438",
  card: "#12283d",
  amber: "#f2a93b",
  sky: "#4D8BFF",
  green: "#34d399",
  whats: "#25D366",
  text: "#e6eef7",
  muted: "#8aa0b4",
};

const CONTACTS = [
  { initials: "MG", name: "María G.", color: "#4D8BFF" },
  { initials: "CR", name: "Carlos R.", color: "#f2a93b" },
  { initials: "LM", name: "Lucía M.", color: "#E1306C" },
  { initials: "DA", name: "Diego A.", color: "#34d399" },
];

// Posición vertical (%) del centro de cada fila de contacto dentro del panel.
const ROW_TOP = [30, 44.5, 59, 73.5];
const SOURCE = { x: 84, y: 26 }; // origen de los mensajes (la "campaña")

type Flight = { id: number; to: number; channel: "email" | "whats" };

function EnvelopeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="currentColor" />
      <path d="M3.5 7l8.5 6 8.5-6" stroke="#0b1b2b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsBubble({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 1 1 4.319 4.243L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.512 5.26l-.999 3.648 3.985-1.04z" />
    </svg>
  );
}

export function ServiceMarketingVisual() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(reduce ? null : 0);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [sent, setSent] = useState(3480);
  const [returned, setReturned] = useState(512);
  const [returnedSet, setReturnedSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (reduce) {
      setSent(3486);
      setReturned(515);
      setReturnedSet(new Set([0, 2]));
      return;
    }
    let i = 0;
    let id = 0;
    const tick = () => {
      const to = i % CONTACTS.length;
      const channel: "email" | "whats" = i % 2 === 0 ? "whats" : "email";
      setActive(to);
      setFlight({ id: id++, to, channel });
      setSent((n) => n + 1 + Math.floor(Math.random() * 2));
      // De vez en cuando, un contacto "regresa".
      if (i % 3 === 1) {
        setReturned((n) => n + 1);
        setReturnedSet((prev) => {
          const next = new Set(prev);
          next.add(to);
          // Limpia para que el badge no se quede pegado en todos.
          if (next.size > 2) next.clear();
          return next;
        });
      }
      i += 1;
    };
    tick();
    const interval = setInterval(tick, 1400);
    return () => clearInterval(interval);
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-[460px] overflow-hidden rounded-3xl border border-white/10 p-4 sm:p-5"
      style={{
        background: `radial-gradient(130% 110% at 78% 16%, #133250, ${C.base})`,
        boxShadow: "0 40px 90px -35px rgba(0,0,0,0.75)",
      }}
    >
      {/* Etiqueta: campaña en automático */}
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
          Campaña en automático
        </span>
      </div>

      {/* Fuente de la campaña (de aquí salen los mensajes) */}
      <div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${SOURCE.x}%`, top: `${SOURCE.y}%` }}
      >
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: `linear-gradient(150deg, ${C.amber}, #d98a1f)`, boxShadow: `0 0 26px -4px ${C.amber}` }}
          animate={reduce ? {} : { scale: [1, 1.08, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path d="M3 11l18-7-7 18-3-7-8-4z" fill="#0b1b2b" />
          </svg>
        </motion.div>
      </div>

      {/* Mensaje en vuelo: de la fuente al contacto activo */}
      <AnimatePresence>
        {flight && !reduce && (
          <motion.div
            key={flight.id}
            className="absolute z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg"
            style={{
              background: flight.channel === "whats" ? C.whats : C.sky,
              color: flight.channel === "whats" ? "#06270f" : "#08203f",
              left: `${SOURCE.x}%`,
              top: `${SOURCE.y}%`,
            }}
            initial={{ left: `${SOURCE.x}%`, top: `${SOURCE.y}%`, opacity: 0, scale: 0.6 }}
            animate={{ left: "40%", top: `${ROW_TOP[flight.to]}%`, opacity: [0, 1, 1, 0], scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut", times: [0, 0.15, 0.8, 1] }}
          >
            {flight.channel === "whats" ? (
              <WhatsBubble className="h-3.5 w-3.5" />
            ) : (
              <EnvelopeIcon className="h-3.5 w-3.5" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de contactos (izquierda) */}
      <div className="absolute left-4 right-4 top-[22%] z-0 flex flex-col gap-2 sm:left-5">
        {CONTACTS.map((ct, i) => {
          const isActive = active === i;
          const hasReturned = returnedSet.has(i);
          return (
            <motion.div
              key={ct.name}
              className="flex w-[58%] items-center gap-2 rounded-xl border px-2 py-1.5"
              style={{ background: C.panel, borderColor: isActive ? ct.color : "rgba(255,255,255,0.08)" }}
              animate={{
                scale: isActive && !reduce ? 1.03 : 1,
                boxShadow: isActive ? `0 0 18px -6px ${ct.color}` : "none",
              }}
              transition={{ duration: 0.35 }}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                style={{ background: `${ct.color}22`, color: ct.color }}
              >
                {ct.initials}
              </span>
              <span className="hidden truncate text-[11px] font-medium sm:inline" style={{ color: C.text }}>
                {ct.name}
              </span>
              <AnimatePresence>
                {hasReturned && (
                  <motion.span
                    initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="ml-auto flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[8px] font-bold"
                    style={{ background: "rgba(52,211,153,0.15)", color: C.green }}
                  >
                    <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke={C.green} strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Regresó
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Métricas (abajo) */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-2 sm:left-5 sm:right-5">
        <div className="flex-1 rounded-xl border border-white/10 px-3 py-2" style={{ background: C.panel }}>
          <p className="text-[9px] uppercase tracking-wide" style={{ color: C.muted }}>
            Mensajes enviados
          </p>
          <div className="flex items-center gap-1">
            <motion.span
              key={sent}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display text-base font-bold"
              style={{ color: C.text }}
            >
              {sent.toLocaleString("es-MX")}
            </motion.span>
            <span className="text-[9px]" style={{ color: C.sky }}>▲</span>
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-white/10 px-3 py-2" style={{ background: C.panel }}>
          <p className="text-[9px] uppercase tracking-wide" style={{ color: C.muted }}>
            Clientes que regresaron
          </p>
          <div className="flex items-center gap-1">
            <motion.span
              key={returned}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display text-base font-bold"
              style={{ color: C.amber }}
            >
              {returned.toLocaleString("es-MX")}
            </motion.span>
            <span className="text-[9px]" style={{ color: C.green }}>▲</span>
          </div>
        </div>
      </div>
    </div>
  );
}
