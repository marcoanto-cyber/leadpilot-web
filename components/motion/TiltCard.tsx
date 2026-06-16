"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Intensidad máxima de la inclinación en grados */
  max?: number;
};

/**
 * Tarjeta con leve tilt 3D al pasar el cursor.
 * - Se desactiva con prefers-reduced-motion y en dispositivos táctiles
 *   (el tilt solo se aplica con eventos de mouse fino).
 */
export function TiltCard({ children, className, max = 7 }: TiltCardProps) {
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), {
    stiffness: 200,
    damping: 18,
  });

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 900,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
