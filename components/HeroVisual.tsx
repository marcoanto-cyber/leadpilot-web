"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Elemento visual de firma: el "plan de vuelo".
 * Una ruta de navegación SVG que se dibuja sola, con waypoints luminosos
 * y un avión que recorre la trayectoria sobre un glow de amanecer.
 *
 * Pensado para ser barato de renderizar (solo transform/opacity y un
 * stroke-dashoffset animado) y no trabar el scroll. Si más adelante se
 * quiere un hero con Three.js, se sustituye solo este componente.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();

  // Trayectoria de la ruta (coordenadas en el viewBox 0 0 520 420)
  const path =
    "M30 360 C 120 360, 150 250, 230 240 S 360 210, 410 120 S 470 50, 500 40";
  const waypoints = [
    { x: 30, y: 360 },
    { x: 230, y: 240 },
    { x: 410, y: 120 },
    { x: 500, y: 40 },
  ];

  return (
    <div className="relative aspect-square w-full max-w-[520px]">
      {/* Glow de amanecer */}
      <div className="sunrise-glow absolute inset-0 rounded-full blur-2xl" />

      {/* Anillos de radar */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-sky/15"
            style={{
              width: `${45 + i * 22}%`,
              height: `${45 + i * 22}%`,
            }}
          />
        ))}
      </div>

      <svg
        viewBox="0 0 520 420"
        className="relative h-full w-full"
        role="img"
        aria-label="Ruta de plan de vuelo que conecta el inicio con el despegue"
      >
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#3D7EFF" />
            <stop offset="60%" stopColor="#FFC56E" />
            <stop offset="100%" stopColor="#FF7849" />
          </linearGradient>
        </defs>

        {/* Ruta base tenue */}
        <path
          d={path}
          fill="none"
          stroke="rgba(111,160,255,0.18)"
          strokeWidth="2"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />

        {/* Ruta animada que se dibuja */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 2.4, ease: "easeInOut" }}
        />

        {/* Waypoints */}
        {waypoints.map((w, i) => (
          <g key={i}>
            <circle cx={w.x} cy={w.y} r="9" fill="#3D7EFF" opacity="0.18" />
            <circle
              cx={w.x}
              cy={w.y}
              r="4.5"
              fill={i === waypoints.length - 1 ? "#FF7849" : "#3D7EFF"}
              className={reduce ? "" : "animate-pulse-dot"}
              style={{ transformOrigin: `${w.x}px ${w.y}px` }}
            />
          </g>
        ))}

        {/* Avión que recorre la ruta */}
        {!reduce && (
          <motion.g
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
            style={{ offsetPath: `path("${path}")`, offsetRotate: "auto" }}
          >
            <path
              d="M-9 0 L9 -5 L4 0 L9 5 Z"
              fill="#FF7849"
              stroke="white"
              strokeWidth="0.8"
            />
          </motion.g>
        )}
      </svg>

      {/* Tarjeta flotante: métrica de ejemplo */}
      <motion.div
        className="absolute -bottom-2 left-2 rounded-2xl border border-white/10 bg-navy-700/80 px-4 py-3 backdrop-blur-sm sm:left-6"
        animate={reduce ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="font-display text-2xl font-bold text-white">{"< 30s"}</p>
        <p className="text-xs text-sky-soft">tiempo de respuesta</p>
      </motion.div>

      <motion.div
        className="absolute right-0 top-6 rounded-2xl border border-white/10 bg-navy-700/80 px-4 py-3 backdrop-blur-sm"
        animate={reduce ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="font-display text-2xl font-bold text-amber">24/7</p>
        <p className="text-xs text-sky-soft">siempre en curso</p>
      </motion.div>
    </div>
  );
}
