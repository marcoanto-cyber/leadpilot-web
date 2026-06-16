"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Retraso en segundos para escalonar elementos */
  delay?: number;
  /** Etiqueta HTML a renderizar */
  as?: "div" | "li" | "span";
  className?: string;
};

/**
 * Scroll-reveal fade-and-rise.
 * - Respeta prefers-reduced-motion (aparece sin desplazamiento).
 * - Aislado a propósito: si luego migramos a GSAP/ScrollTrigger,
 *   solo se cambia este componente, no cada sección.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </MotionTag>
  );
}
