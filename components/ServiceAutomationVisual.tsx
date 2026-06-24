"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from "@/components/icons";

// Motion graphics del hero de "Automatización con IA".
// En lugar de un diagrama plano, cuenta el FLUJO por etapas para que se entienda
// cómo trabaja la automatización:
//   1) Llega un mensaje de un canal (WhatsApp/Instagram/Facebook).
//   2) La IA lo procesa: lee, entiende, decide.
//   3) Responde al instante y agenda la cita.
// Tres canales arriba; el activo se ilumina cada ciclo. Profundidad con paneles
// en capas, glow y leve perspectiva. Solo transform/opacity. Respeta reduced-motion.

const C = {
  base: "#0b1b2b",
  panel: "#0f2438",
  card: "#12283d",
  amber: "#f2a93b",
  sky: "#4D8BFF",
  green: "#34d399",
  text: "#e6eef7",
  muted: "#8aa0b4",
};

const CHANNELS = [
  { name: "WhatsApp", color: "#25D366", Icon: WhatsAppIcon, msg: "¿Tienen cita mañana?" },
  { name: "Instagram", color: "#E1306C", Icon: InstagramIcon, msg: "¿Cuánto cuesta?" },
  { name: "Facebook", color: "#1877F2", Icon: FacebookIcon, msg: "Quiero info 🙌" },
];

// Etapas que rotan en bucle. Cada una dura STAGE_MS.
const STAGES = [
  { key: "in", label: "Mensaje recibido", color: C.sky },
  { key: "think", label: "La IA entiende y decide", color: C.amber },
  { key: "reply", label: "Responde y agenda solo", color: C.green },
] as const;

const STAGE_MS = 1900;

export function ServiceAutomationVisual() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [ch, setCh] = useState(0);
  const [count, setCount] = useState(1247);

  useEffect(() => {
    if (reduce) {
      setStage(2);
      setCount(1284);
      return;
    }
    const id = setInterval(() => {
      setStage((s) => {
        const next = (s + 1) % STAGES.length;
        if (next === 0) setCh((c) => (c + 1) % CHANNELS.length);
        if (next === 0) setCount((n) => n + 1);
        return next;
      });
    }, STAGE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const channel = CHANNELS[ch];
  const current = STAGES[stage];

  return (
    <div
      aria-hidden="true"
      className="relative w-full max-w-[460px]"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 p-4 sm:p-5"
        style={{
          background: `radial-gradient(130% 110% at 72% 18%, #133250, ${C.base})`,
          boxShadow: "0 40px 90px -35px rgba(0,0,0,0.75)",
          transformStyle: "preserve-3d",
        }}
        animate={reduce ? {} : { rotateY: [-3, 3, -3], rotateX: [2, -1, 2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glow ambiental que late con la etapa */}
        <motion.div
          className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl"
          style={{ background: current.color }}
          animate={{ opacity: reduce ? 0.18 : [0.12, 0.26, 0.12] }}
          transition={{ duration: STAGE_MS / 1000, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Etiqueta de etapa (lo que está pasando ahora mismo) */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            {!reduce && (
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full"
                style={{ background: current.color }}
                animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: current.color }} />
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={current.key}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: current.color }}
            >
              {current.label}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Canales (arriba). El activo se resalta. */}
        <div className="relative z-10 mt-5 flex items-center justify-between gap-2">
          {CHANNELS.map((c, i) => {
            const active = i === ch;
            return (
              <motion.div
                key={c.name}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-2 py-2"
                style={{
                  background: C.panel,
                  borderColor: active ? c.color : "rgba(255,255,255,0.08)",
                }}
                animate={{
                  opacity: active ? 1 : 0.45,
                  scale: active && !reduce ? 1.04 : 1,
                  boxShadow: active ? `0 0 22px -6px ${c.color}` : "none",
                }}
                transition={{ duration: 0.4 }}
              >
                <span style={{ color: c.color }}>
                  <c.Icon className="h-4 w-4" />
                </span>
                <span className="hidden text-[10px] font-medium sm:inline" style={{ color: C.text }}>
                  {c.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Burbuja del mensaje entrante del cliente */}
        <div className="relative z-10 mt-4 h-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${ch}-${stage >= 0}`}
              initial={reduce ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.35 }}
              className="inline-flex max-w-[80%] items-center gap-2 rounded-2xl rounded-bl-md px-3 py-1.5"
              style={{ background: C.card, border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span style={{ color: channel.color }}>
                <channel.Icon className="h-3.5 w-3.5" />
              </span>
              <span className="text-[11px]" style={{ color: C.text }}>
                {channel.msg}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Conexión animada hacia el núcleo de IA */}
        <div className="relative z-0 my-1 flex h-7 items-center justify-center">
          {!reduce &&
            [0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full"
                style={{ background: current.color }}
                animate={{ y: [-10, 14], opacity: [0, 1, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.32, ease: "easeIn" }}
              />
            ))}
        </div>

        {/* Núcleo de IA */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            {/* Anillos orbitando */}
            {!reduce &&
              [0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full border"
                  style={{
                    width: 80 - i * 18,
                    height: 80 - i * 18,
                    borderColor: current.color,
                    opacity: 0.35,
                  }}
                  animate={{ rotate: i === 0 ? 360 : -360 }}
                  transition={{ duration: 6 + i * 3, repeat: Infinity, ease: "linear" }}
                />
              ))}
            {/* Pulso */}
            {!reduce && (
              <motion.span
                className="absolute rounded-full"
                style={{ border: `1px solid ${current.color}` }}
                initial={{ width: 56, height: 56, opacity: 0.5 }}
                animate={{ width: 96, height: 96, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            {/* Orbe */}
            <motion.div
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background: `linear-gradient(150deg, ${current.color}, ${C.base})`,
                boxShadow: `0 0 34px -6px ${current.color}`,
              }}
              animate={reduce ? {} : { scale: [1, 1.07, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                <path d="M12 3l1.6 4.2L18 9l-4.4 1.8L12 15l-1.6-4.2L6 9l4.4-1.8z" fill="#0b1b2b" />
                <circle cx="18.5" cy="5.5" r="1.4" fill="#0b1b2b" />
                <circle cx="5.5" cy="17.5" r="1.1" fill="#0b1b2b" />
              </svg>
            </motion.div>
          </div>
          <span className="mt-2 text-[11px] font-semibold" style={{ color: C.text }}>
            Tu asistente IA
          </span>
        </div>

        {/* Resultado: respuesta enviada + cita agendada (aparece en etapa "reply") */}
        <div className="relative z-10 mt-3 flex justify-end">
          <AnimatePresence>
            {(stage === 2 || reduce) && (
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 16, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35 }}
                className="inline-flex max-w-[82%] flex-col gap-1.5 rounded-2xl rounded-br-md px-3 py-2"
                style={{ background: "#114d2c", border: "1px solid rgba(52,211,153,0.35)" }}
              >
                <span className="text-[11px] leading-snug" style={{ color: "#d6ffe6" }}>
                  ¡Hola! 👋 Sí, tengo mañana a las 10:00. ¿Te la agendo?
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-semibold" style={{ color: C.green }}>
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke={C.green} strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Cita agendada · respuesta en segundos
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contador de conversaciones atendidas */}
        <div
          className="absolute bottom-4 left-4 z-20 rounded-xl border border-white/10 px-3 py-2"
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
            <span className="text-[9px]" style={{ color: C.green }}>▲</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
