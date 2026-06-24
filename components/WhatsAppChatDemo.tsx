"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Demo de chat estilo WhatsApp que vive DENTRO del mockup del teléfono en la
 * página de "Automatización con IA". Simula, en tiempo real, cómo la IA atiende
 * y agenda una conversación sola: el cliente escribe, aparece "escribiendo…" y
 * la IA responde al instante. ~10 mensajes en bucle continuo.
 *
 * Solo anima opacity/transform. Respeta prefers-reduced-motion (muestra toda la
 * conversación estática). Pensado para un ancho ~250–270px.
 */

type Who = "them" | "ai";
type Msg = { who: Who; text: string };

// Conversación: cliente (them) ↔ IA del negocio (ai). 10 mensajes.
const SCRIPT: Msg[] = [
  { who: "them", text: "Hola, vi su anuncio 👀" },
  { who: "ai", text: "¡Hola! 👋 Bienvenido. ¿En qué te puedo ayudar?" },
  { who: "them", text: "¿Cuánto cuesta el servicio?" },
  { who: "ai", text: "Tenemos planes desde $1,500. ¿Te paso el catálogo? 📋" },
  { who: "them", text: "Sí, porfa" },
  { who: "ai", text: "¡Listo! 👉 ¿Quieres agendar una cita sin costo?" },
  { who: "them", text: "Me interesa, mañana" },
  { who: "ai", text: "Perfecto ✨ Tengo 10:00 o 12:00. ¿Cuál prefieres?" },
  { who: "them", text: "Las 10 está bien" },
  { who: "ai", text: "¡Agendado! ✅ Te llega la confirmación por aquí. 🙌" },
];

const GREEN_HEADER = "#075E54";
const GREEN_BUBBLE = "#DCF8C6";
const CHAT_BG = "#ECE5DD";

function Ticks() {
  // Doble palomita azul (leído) de WhatsApp.
  return (
    <svg viewBox="0 0 18 12" width="15" height="10" className="ml-1 inline-block align-middle">
      <path
        d="M1 6.5 L4 9.5 L9.5 3"
        fill="none"
        stroke="#53BDEB"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 6.5 L10 9.5 L15.5 3"
        fill="none"
        stroke="#53BDEB"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TypingDots() {
  return (
    <div
      className="flex w-fit items-center gap-1 self-start rounded-2xl rounded-bl-md bg-white px-3 py-2.5 shadow-sm"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-gray-400"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export function WhatsAppChatDemo() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? SCRIPT.length : 0);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Máquina de estados: revela un mensaje a la vez. Antes de cada mensaje de la
  // IA muestra "escribiendo…". Al terminar, pausa y reinicia (bucle).
  useEffect(() => {
    if (reduce) return;
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;

    const step = () => {
      if (i >= SCRIPT.length) {
        // Pausa al final y reinicia el bucle.
        timer = setTimeout(() => {
          setCount(0);
          setTyping(false);
          i = 0;
          timer = setTimeout(step, 700);
        }, 2600);
        return;
      }

      const msg = SCRIPT[i];
      if (msg.who === "ai") {
        setTyping(true);
        timer = setTimeout(() => {
          setTyping(false);
          setCount(i + 1);
          i += 1;
          timer = setTimeout(step, 850);
        }, 1100);
      } else {
        setCount(i + 1);
        i += 1;
        timer = setTimeout(step, 1100);
      }
    };

    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, [reduce]);

  // Auto-scroll al último mensaje.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [count, typing]);

  return (
    <div className="flex h-full w-full flex-col" style={{ background: CHAT_BG }}>
      {/* Barra superior estilo WhatsApp */}
      <div
        className="flex items-center gap-2 px-3 pb-2 pt-3 text-white"
        style={{ background: GREEN_HEADER }}
      >
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none" className="shrink-0">
          <path d="M8 1 L1 8 L8 15" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/25 text-xs font-bold">
          IA
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[12px] font-semibold">Asistente IA</p>
          <p className="truncate text-[9px] text-white/80">en línea</p>
        </div>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white" className="shrink-0 opacity-90">
          <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
        </svg>
      </div>

      {/* Hilo de mensajes */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-1.5 overflow-hidden px-2.5 py-2.5"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.025) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      >
        {/* Etiqueta de fecha tipo WhatsApp */}
        <span className="mx-auto mb-1 rounded-md bg-white/70 px-2 py-0.5 text-[8px] font-medium text-gray-500 shadow-sm">
          HOY
        </span>

        {SCRIPT.slice(0, count).map((m, i) => {
          const mine = m.who === "ai";
          return (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`max-w-[82%] rounded-2xl px-2.5 py-1.5 text-[11px] leading-snug shadow-sm ${
                mine ? "self-end rounded-br-md" : "self-start rounded-bl-md bg-white"
              }`}
              style={mine ? { background: GREEN_BUBBLE } : undefined}
            >
              <span className="text-gray-800">{m.text}</span>
              {mine && (
                <span className="ml-1 inline-flex items-center text-[8px] text-gray-500">
                  10:24
                  <Ticks />
                </span>
              )}
            </motion.div>
          );
        })}

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="self-start"
            >
              <TypingDots />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Barra de entrada (decorativa) */}
      <div className="flex items-center gap-2 px-2 pb-2.5 pt-1.5" style={{ background: CHAT_BG }}>
        <div className="flex flex-1 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
          <span className="text-[10px] text-gray-400">Escribe un mensaje…</span>
        </div>
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full text-white shadow"
          style={{ background: "#25D366" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
