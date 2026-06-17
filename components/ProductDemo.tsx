"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

// ── Motion graphics 100% en código que muestra el producto trabajando solo.
// Estética Lead Pilot: azul profundo #0b1b2b, paneles #0f2438, acento ámbar #f2a93b.
// Solo anima transform/opacity. Respeta prefers-reduced-motion (estado final
// estático) y se reordena en vertical en móvil.

const PALETTE = {
  base: "#0b1b2b",
  panel: "#0f2438",
  card: "#12283d",
  amber: "#f2a93b",
  sky: "#4D8BFF",
  green: "#34d399",
  text: "#e6eef7",
  muted: "#8aa0b4",
};

type Lead = { name: string; reason: string };

const POOL: Lead[] = [
  { name: "María G.", reason: "Cotización" },
  { name: "Carlos R.", reason: "Demo producto" },
  { name: "Lucía M.", reason: "Soporte" },
  { name: "Diego A.", reason: "Precios" },
  { name: "Sofía T.", reason: "Agendar visita" },
  { name: "Andrés P.", reason: "Mayoreo" },
  { name: "Renata V.", reason: "Catálogo" },
];

const COLUMNS = ["Nuevo lead", "Contactado por IA", "Cita agendada"];
const STAGE_COLOR = [PALETTE.sky, PALETTE.amber, PALETTE.green];

type Card = Lead & { key: number; stage: number };

const CHAT = [
  { from: "them", text: "Hola, ¿tienen disponibilidad esta semana?" },
  { from: "me", text: "¡Hola! 🙌 Sí. ¿Te late mañana a las 10:00?" },
  { from: "them", text: "Sí, perfecto" },
  { from: "me", text: "Listo, agendé tu cita ✅" },
] as const;

export function ProductDemo() {
  const reduce = useReducedMotion();

  const [cards, setCards] = useState<Card[]>([]);
  const [leadsToday, setLeadsToday] = useState(18);
  const [chatStep, setChatStep] = useState(0);
  const [eqTick, setEqTick] = useState(0);

  const keyRef = useRef(0);
  const poolRef = useRef(0);

  const advance = useCallback(() => {
    setCards((prev) => {
      const completing = prev.filter((c) => c.stage === 1).length;
      if (completing > 0) setLeadsToday((n) => n + completing);

      const next = prev
        .map((c) => ({ ...c, stage: c.stage + 1 }))
        .filter((c) => c.stage <= 2);

      const lead = POOL[poolRef.current % POOL.length];
      poolRef.current += 1;
      next.push({ key: keyRef.current++, ...lead, stage: 0 });
      return next;
    });
  }, []);

  // Pipeline
  useEffect(() => {
    if (reduce) {
      setCards([
        { key: 0, ...POOL[0], stage: 0 },
        { key: 1, ...POOL[1], stage: 1 },
        { key: 2, ...POOL[2], stage: 2 },
      ]);
      setLeadsToday(42);
      return;
    }
    keyRef.current = 1;
    poolRef.current = 1;
    setCards([{ key: 0, ...POOL[0], stage: 0 }]);
    const id = setInterval(advance, 2200);
    return () => clearInterval(id);
  }, [reduce, advance]);

  // Chat
  useEffect(() => {
    if (reduce) {
      setChatStep(CHAT.length);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    let step = 0;
    const tick = () => {
      step = step > CHAT.length ? 0 : step + 1;
      setChatStep(step);
      const delay =
        step === 0
          ? 700
          : step > CHAT.length
            ? 2000
            : CHAT[step - 1].from === "me"
              ? 1000
              : 1200;
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, [reduce]);

  // Ecualizador "vivo" del tiempo de respuesta
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setEqTick((t) => t + 1), 520);
    return () => clearInterval(id);
  }, [reduce]);

  const showTyping =
    !reduce &&
    chatStep > 0 &&
    chatStep < CHAT.length &&
    CHAT[chatStep - 1].from === "them" &&
    CHAT[chatStep].from === "me";

  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[560px] rounded-3xl border border-white/10 p-3 shadow-2xl sm:p-4"
      style={{
        background: `linear-gradient(160deg, ${PALETTE.base}, #081521)`,
        boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7)",
      }}
    >
      {/* Barra superior */}
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <PilotBadge reduce={!!reduce} />
      </div>

      {/* Pipeline */}
      <Panel>
        <div className="mb-3 grid grid-cols-3 gap-2">
          {COLUMNS.map((c, i) => (
            <div
              key={c}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: STAGE_COLOR[i] }}
              />
              <span
                className="truncate text-[10px] font-semibold uppercase tracking-wide"
                style={{ color: PALETTE.muted }}
              >
                {c}
              </span>
            </div>
          ))}
        </div>

        {/* Track de tarjetas */}
        <div className="relative h-[60px]">
          <AnimatePresence>
            {cards.map((c) => (
              <motion.div
                key={c.key}
                className="absolute top-0 w-1/3 px-1"
                initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1, x: `${c.stage * 100}%` }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 240, damping: 28 }
                }
              >
                <div
                  className="rounded-xl border border-white/10 p-2"
                  style={{ background: PALETTE.card }}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: STAGE_COLOR[c.stage] }}
                    />
                    <span
                      className="truncate text-xs font-semibold"
                      style={{ color: PALETTE.text }}
                    >
                      {c.name}
                    </span>
                  </div>
                  <p
                    className="mt-0.5 truncate text-[10px]"
                    style={{ color: PALETTE.muted }}
                  >
                    {c.reason}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Panel>

      {/* Chat + métricas */}
      <div className="mt-3 grid gap-3 sm:grid-cols-[1.25fr_1fr]">
        {/* Mini WhatsApp */}
        <Panel className="flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-[11px]"
              style={{ background: "#25D366", color: "#06270f" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 1 1 4.319 4.243L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.512 5.26l-.999 3.648 3.985-1.04z" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="text-xs font-semibold" style={{ color: PALETTE.text }}>
                WhatsApp · Bot IA
              </p>
              <p className="text-[10px]" style={{ color: PALETTE.green }}>
                en línea
              </p>
            </div>
          </div>

          <div className="flex min-h-[118px] flex-1 flex-col justify-end gap-1.5">
            {CHAT.slice(0, chatStep).map((m, i) => (
              <motion.div
                key={`${m.from}-${i}`}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={`max-w-[85%] rounded-2xl px-2.5 py-1.5 text-[11px] leading-snug ${
                  m.from === "me" ? "self-end" : "self-start"
                }`}
                style={{
                  background: m.from === "me" ? "#114d2c" : PALETTE.card,
                  color: m.from === "me" ? "#d6ffe6" : PALETTE.text,
                  borderBottomRightRadius: m.from === "me" ? 4 : undefined,
                  borderBottomLeftRadius: m.from === "me" ? undefined : 4,
                }}
              >
                {m.text}
              </motion.div>
            ))}
            {showTyping && <TypingBubble />}
          </div>
        </Panel>

        {/* Métricas */}
        <div className="grid gap-3">
          <Panel>
            <p className="text-[10px] uppercase tracking-wide" style={{ color: PALETTE.muted }}>
              Tiempo de respuesta
            </p>
            <div className="mt-1 flex items-end justify-between">
              <span className="font-display text-2xl font-bold" style={{ color: PALETTE.text }}>
                ~30<span className="text-base">s</span>
              </span>
              <Equalizer reduce={!!reduce} tick={eqTick} />
            </div>
          </Panel>

          <Panel>
            <p className="text-[10px] uppercase tracking-wide" style={{ color: PALETTE.muted }}>
              Leads atendidos hoy
            </p>
            <div className="mt-1 flex items-center gap-2">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={leadsToday}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-2xl font-bold"
                  style={{ color: PALETTE.amber }}
                >
                  {leadsToday}
                </motion.span>
              </AnimatePresence>
              <span className="text-[10px]" style={{ color: PALETTE.green }}>
                ▲ en vivo
              </span>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/8 p-3 ${className}`}
      style={{ background: PALETTE.panel }}
    >
      {children}
    </div>
  );
}

function PilotBadge({ reduce }: { reduce: boolean }) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
      style={{ background: "rgba(242,169,59,0.12)", border: "1px solid rgba(242,169,59,0.3)" }}
    >
      <span className="relative flex h-2 w-2">
        {!reduce && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ background: PALETTE.amber }}
          />
        )}
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ background: PALETTE.amber }}
        />
      </span>
      <span
        className="text-[10px] font-bold uppercase tracking-wider"
        style={{ color: PALETTE.amber }}
      >
        En piloto automático
      </span>
    </div>
  );
}

function TypingBubble() {
  return (
    <div
      className="flex w-fit items-center gap-1 self-start rounded-2xl px-3 py-2"
      style={{ background: PALETTE.card, borderBottomLeftRadius: 4 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: PALETTE.muted }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function Equalizer({ reduce, tick }: { reduce: boolean; tick: number }) {
  // Alturas pseudoaleatorias deterministas según el tick.
  const bars = [0, 1, 2, 3].map((i) => {
    if (reduce) return 0.5;
    const v = Math.abs(Math.sin((tick + i * 1.7) * 1.3));
    return 0.35 + v * 0.65;
  });
  return (
    <div className="flex h-6 items-end gap-1">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="h-6 w-1 rounded-full"
          style={{ background: PALETTE.sky, transformOrigin: "bottom" }}
          animate={{ scaleY: h }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
