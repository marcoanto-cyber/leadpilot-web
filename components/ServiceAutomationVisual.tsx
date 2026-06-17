"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from "@/components/icons";

// Motion graphics 100% en código para el hero de "Automatización con IA".
// Estética Lead Pilot: fondo #0b1b2b, paneles #0f2438, acento ámbar #f2a93b.
// Mensajes de 3 canales llegan a un cerebro de IA central que pulsa y responde
// en automático. Bucle suave, solo transform/opacity, respeta reduced-motion.

const C = {
  base: "#0b1b2b",
  panel: "#0f2438",
  amber: "#f2a93b",
  sky: "#4D8BFF",
  green: "#34d399",
  text: "#e6eef7",
  muted: "#8aa0b4",
};

const BRAIN = { x: 64, y: 50 };

const CHANNELS = [
  { name: "WhatsApp", x: 13, y: 22, color: "#25D366", Icon: WhatsAppIcon },
  { name: "Instagram", x: 10, y: 50, color: "#E1306C", Icon: InstagramIcon },
  { name: "Facebook", x: 13, y: 78, color: "#1877F2", Icon: FacebookIcon },
];

const CYCLE = 3; // segundos por ciclo de cada canal

export function ServiceAutomationVisual() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? 1284 : 1247);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setCount((n) => n + 1), 1500);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-[460px] rounded-3xl border border-white/10 p-4"
      style={{
        background: `radial-gradient(120% 100% at 70% 30%, #102a40, ${C.base})`,
        boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7)",
      }}
    >
      {/* Estado */}
      <div
        className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1"
        style={{ background: "rgba(242,169,59,0.12)", border: "1px solid rgba(242,169,59,0.3)" }}
      >
        <span className="relative flex h-2 w-2">
          {!reduce && (
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: C.amber }}
            />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: C.amber }} />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.amber }}>
          Respondiendo en automático
        </span>
      </div>

      {/* Capa SVG: líneas + paquetes (mensajes y respuestas) */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {CHANNELS.map((ch) => (
          <line
            key={ch.name}
            x1={ch.x}
            y1={ch.y}
            x2={BRAIN.x}
            y2={BRAIN.y}
            stroke="rgba(111,160,255,0.18)"
            strokeWidth="0.5"
            strokeDasharray="1.5 2"
          />
        ))}

        {CHANNELS.map((ch, i) => (
          <g key={ch.name}>
            {/* Mensaje entrante (canal → cerebro) */}
            <motion.circle
              r="1.7"
              fill={ch.color}
              initial={false}
              animate={
                reduce
                  ? { cx: (ch.x + BRAIN.x) / 2, cy: (ch.y + BRAIN.y) / 2, opacity: 0.7 }
                  : { cx: [ch.x, BRAIN.x], cy: [ch.y, BRAIN.y], opacity: [0, 1, 1, 0] }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: CYCLE * 0.5,
                      repeat: Infinity,
                      repeatDelay: CYCLE * 0.5,
                      delay: i * 0.5,
                      ease: "easeInOut",
                      times: [0, 0.15, 0.85, 1],
                    }
              }
            />
            {/* Respuesta automática (cerebro → canal) */}
            <motion.circle
              r="1.7"
              fill={C.amber}
              initial={false}
              animate={
                reduce
                  ? { cx: ch.x, cy: ch.y, opacity: 0 }
                  : { cx: [BRAIN.x, ch.x], cy: [BRAIN.y, ch.y], opacity: [0, 1, 1, 0] }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: CYCLE * 0.5,
                      repeat: Infinity,
                      repeatDelay: CYCLE * 0.5,
                      delay: i * 0.5 + CYCLE * 0.5,
                      ease: "easeInOut",
                      times: [0, 0.15, 0.85, 1],
                    }
              }
            />
          </g>
        ))}
      </svg>

      {/* Chips de canales */}
      {CHANNELS.map((ch) => (
        <div
          key={ch.name}
          className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-xl border border-white/10 px-2 py-1.5"
          style={{ left: `${ch.x}%`, top: `${ch.y}%`, background: C.panel }}
        >
          <span style={{ color: ch.color }}>
            <ch.Icon className="h-4 w-4" />
          </span>
          <span className="hidden text-[10px] font-medium sm:inline" style={{ color: C.text }}>
            {ch.name}
          </span>
        </div>
      ))}

      {/* Cerebro de IA central */}
      <div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${BRAIN.x}%`, top: `${BRAIN.y}%` }}
      >
        {!reduce &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ border: `1px solid ${C.amber}` }}
              initial={{ width: 56, height: 56, opacity: 0.5 }}
              animate={{ width: 110, height: 110, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
            />
          ))}
        <motion.div
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background: `linear-gradient(150deg, ${C.amber}, #d98a1f)`,
            boxShadow: `0 0 28px -4px ${C.amber}`,
          }}
          animate={reduce ? {} : { scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
            <path
              d="M12 3l1.6 4.2L18 9l-4.4 1.8L12 15l-1.6-4.2L6 9l4.4-1.8z"
              fill="#0b1b2b"
            />
            <circle cx="18.5" cy="5.5" r="1.4" fill="#0b1b2b" />
            <circle cx="5.5" cy="17.5" r="1.1" fill="#0b1b2b" />
          </svg>
        </motion.div>
        <span
          className="mt-2 block text-center text-[10px] font-semibold"
          style={{ color: C.text }}
        >
          IA
        </span>
      </div>

      {/* Contador */}
      <div
        className="absolute bottom-4 right-4 z-20 rounded-xl border border-white/10 px-3 py-2"
        style={{ background: C.panel }}
      >
        <p className="text-[9px] uppercase tracking-wide" style={{ color: C.muted }}>
          Conversaciones atendidas
        </p>
        <div className="flex items-center gap-1.5">
          <motion.span
            key={count}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-display text-lg font-bold"
            style={{ color: C.amber }}
          >
            {count.toLocaleString("es-MX")}
          </motion.span>
          <span className="text-[9px]" style={{ color: C.green }}>
            ▲
          </span>
        </div>
      </div>
    </div>
  );
}
