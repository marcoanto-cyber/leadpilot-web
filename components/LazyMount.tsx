"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Monta a sus hijos solo cuando el contenedor está por entrar en pantalla
 * (IntersectionObserver). Sirve para diferir animaciones/timers pesados que
 * viven debajo del primer pliegue: no consumen CPU ni datos hasta que el
 * usuario realmente los va a ver. Reserva una altura (minHeight) para que el
 * scroll no salte mientras se monta.
 */
export function LazyMount({
  children,
  minHeight = 480,
  rootMargin = "300px",
  className,
}: {
  children: ReactNode;
  minHeight?: number;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  );
}
