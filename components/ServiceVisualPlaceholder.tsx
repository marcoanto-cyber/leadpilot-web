"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Motion graphics genérico para el hero de una página de servicio.
 * Es un placeholder on-brand: cuando tengas el definitivo por servicio,
 * pásalo como prop `visual` a <ServicePage /> y este no se usará.
 * Solo anima transform/opacity y respeta prefers-reduced-motion.
 */
export function ServiceVisualPlaceholder({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative aspect-square w-full max-w-[460px]">
      <div className="sunrise-glow pointer-events-none absolute inset-0 rounded-full blur-2xl" />

      {/* Anillos */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky/15"
          style={{ width: `${42 + i * 20}%`, height: `${42 + i * 20}%` }}
        />
      ))}

      {/* Núcleo con el ícono del servicio */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-white/10 bg-navy-700 text-sky shadow-glow"
        animate={reduce ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>

      {/* Tarjetas flotantes */}
      <motion.div
        className="absolute left-2 top-8 rounded-2xl border border-white/10 bg-navy-700/80 px-4 py-3 backdrop-blur-sm"
        animate={reduce ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="font-display text-sm font-semibold text-white">Automático</p>
        <p className="text-xs text-sky-soft">{label}</p>
      </motion.div>

      <motion.div
        className="absolute -bottom-1 right-2 rounded-2xl border border-white/10 bg-navy-700/80 px-4 py-3 backdrop-blur-sm"
        animate={reduce ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="font-display text-2xl font-bold text-amber">24/7</p>
        <p className="text-xs text-sky-soft">sin que tú estés</p>
      </motion.div>
    </div>
  );
}
