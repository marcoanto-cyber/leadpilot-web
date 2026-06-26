"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Motion graphics del hero de "Ventas y CRM".
// Un tablero tipo Kanban con 4 columnas. Las tarjetas de clientes avanzan solas
// de columna en columna, en bucle. Al llegar a "Cerrado" aparece un check ámbar
// y sube el contador "Ventas del mes $". Etiqueta "Seguimiento automático".
// Estética Lead Pilot. Solo transform/opacity. Respeta prefers-reduced-motion.

const C = {
  base: "#0b1b2b",
  panel: "#0f2438",
  card: "#16314a",
  amber: "#f2a93b",
  sky: "#4D8BFF",
  violet: "#a78bfa",
  green: "#34d399",
  text: "#e6eef7",
  muted: "#8aa0b4",
};

const COLUMNS = [
  { name: "Interesado", color: C.sky },
  { name: "Seguimiento", color: C.amber },
  { name: "Cita", color: C.violet },
  { name: "Cerrado", color: C.green },
];

const POOL = [
  { name: "María G.", amount: 8500 },
  { name: "Carlos R.", amount: 12300 },
  { name: "Lucía M.", amount: 6400 },
  { name: "Diego A.", amount: 15800 },
  { name: "Sofía T.", amount: 9200 },
  { name: "Andrés P.", amount: 11000 },
  { name: "Renata V.", amount: 7300 },
];

type Card = { key: number; name: string; amount: number; stage: number };

const TICK_MS = 1500;

export function ServiceCRMVisual() {
  const reduce = useReducedMotion();
  const [cards, setCards] = useState<Card[]>([]);
  const [revenue, setRevenue] = useState(84500);
  const keyRef = useRef(0);
  const poolRef = useRef(0);

  const advance = useCallback(() => {
    setCards((prev) => {
      // Las que llegan a "Cerrado" (stage 3) suman a las ventas del mes.
      prev.forEach((c) => {
        if (c.stage === 2) setRevenue((r) => r + c.amount);
      });
      const next = prev
        .map((c) => ({ ...c, stage: c.stage + 1 }))
        .filter((c) => c.stage <= 3);
      const lead = POOL[poolRef.current % POOL.length];
      poolRef.current += 1;
      next.push({ key: keyRef.current++, ...lead, stage: 0 });
      return next;
    });
  }, []);

  useEffect(() => {
    if (reduce) {
      setCards([
        { key: 0, ...POOL[0], stage: 0 },
        { key: 1, ...POOL[1], stage: 1 },
        { key: 2, ...POOL[2], stage: 2 },
        { key: 3, ...POOL[3], stage: 3 },
      ]);
      setRevenue(118300);
      return;
    }
    keyRef.current = 4;
    poolRef.current = 4;
    setCards([
      { key: 0, ...POOL[0], stage: 0 },
      { key: 1, ...POOL[1], stage: 1 },
      { key: 2, ...POOL[2], stage: 2 },
      { key: 3, ...POOL[3], stage: 3 },
    ]);
    const id = setInterval(advance, TICK_MS);
    return () => clearInterval(id);
  }, [reduce, advance]);

  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-[460px] overflow-hidden rounded-3xl border border-white/10 p-4 sm:p-5"
      style={{
        background: `radial-gradient(130% 110% at 78% 16%, #133250, ${C.base})`,
        boxShadow: "0 40px 90px -35px rgba(0,0,0,0.75)",
      }}
    >
      {/* Etiqueta: seguimiento automático */}
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
          Seguimiento automático
        </span>
      </div>

      {/* Encabezados de columnas */}
      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {COLUMNS.map((col) => (
          <div
            key={col.name}
            className="flex items-center gap-1 rounded-lg px-1.5 py-1.5"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: col.color }} />
            <span className="truncate text-[8.5px] font-semibold uppercase tracking-wide" style={{ color: C.muted }}>
              {col.name}
            </span>
          </div>
        ))}
      </div>

      {/* Pistas (columnas) + tarjetas que avanzan */}
      <div className="relative mt-2 grid grid-cols-4 gap-1.5" style={{ height: "62%" }}>
        {/* Carriles verticales tenues */}
        {COLUMNS.map((col) => (
          <div key={col.name} className="rounded-xl border border-white/5" style={{ background: "rgba(255,255,255,0.015)" }} />
        ))}

        {/* Tarjetas posicionadas por etapa (cada una en su columna) */}
        <div className="pointer-events-none absolute inset-0">
          <AnimatePresence>
            {cards.map((c) => {
              const closed = c.stage === 3;
              return (
                <motion.div
                  key={c.key}
                  className="absolute top-2 px-1"
                  style={{ width: "25%" }}
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, left: `${c.stage * 25}%` }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 26 }}
                >
                  <div
                    className="rounded-lg border p-1.5"
                    style={{
                      background: C.card,
                      borderColor: closed ? C.amber : "rgba(255,255,255,0.1)",
                      boxShadow: closed ? `0 0 16px -5px ${C.amber}` : "none",
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[7px] font-bold"
                        style={{ background: `${COLUMNS[c.stage].color}22`, color: COLUMNS[c.stage].color }}
                      >
                        {c.name.charAt(0)}
                      </span>
                      <span className="truncate text-[9px] font-semibold" style={{ color: C.text }}>
                        {c.name}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[8.5px] font-medium" style={{ color: C.muted }}>
                        ${c.amount.toLocaleString("es-MX")}
                      </span>
                      {closed && (
                        <motion.span
                          initial={reduce ? false : { scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 14 }}
                          className="flex h-3.5 w-3.5 items-center justify-center rounded-full"
                          style={{ background: C.amber }}
                        >
                          <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="#0b1b2b" strokeWidth="3.5">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Contador: ventas del mes */}
      <div
        className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-xl border border-white/10 px-3 py-2.5 sm:left-5 sm:right-5"
        style={{ background: C.panel }}
      >
        <div>
          <p className="text-[9px] uppercase tracking-wide" style={{ color: C.muted }}>
            Ventas del mes
          </p>
          <div className="flex items-center gap-1.5">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={revenue}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="font-display text-lg font-bold"
                style={{ color: C.amber }}
              >
                ${revenue.toLocaleString("es-MX")}
              </motion.span>
            </AnimatePresence>
            <span className="text-[9px]" style={{ color: C.green }}>▲ en vivo</span>
          </div>
        </div>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: "rgba(52,211,153,0.12)", color: C.green }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 17l6-6 4 4 7-7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 8h4v4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
