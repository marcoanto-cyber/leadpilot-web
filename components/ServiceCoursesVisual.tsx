"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Motion graphics del hero de "Cursos y Membresías".
// Una mini-pantalla de curso con lista de lecciones que se marcan completadas
// solas; un alumno (avatar) se inscribe y aparece un check de "acceso
// concedido"; las métricas "Alumnos inscritos" y "Ventas" suben. Bucle.
// Etiqueta "Inscripción y pago automáticos". Estética Lead Pilot.
// Solo transform/opacity. Respeta prefers-reduced-motion.

const C = {
  base: "#0b1b2b",
  panel: "#0f2438",
  card: "#16314a",
  amber: "#f2a93b",
  sky: "#4D8BFF",
  green: "#34d399",
  text: "#e6eef7",
  muted: "#8aa0b4",
};

const LESSONS = ["Bienvenida", "Fundamentos", "Plantillas listas", "Caso práctico"];
const STUDENTS = [
  { initials: "MG", color: "#4D8BFF" },
  { initials: "CR", color: "#f2a93b" },
  { initials: "LM", color: "#E1306C" },
  { initials: "DA", color: "#34d399" },
];

const STEP_MS = 1100;

export function ServiceCoursesVisual() {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  const [students, setStudents] = useState(1284);
  const [sales, setSales] = useState(96400);
  const [enroll, setEnroll] = useState(0); // índice de alumno para el toast

  useEffect(() => {
    if (reduce) {
      setTick(LESSONS.length);
      return;
    }
    const id = setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => clearInterval(id);
  }, [reduce]);

  // Lecciones completadas en este ciclo.
  const done = reduce ? LESSONS.length : tick % (LESSONS.length + 1);

  // Cada vez que se completa el curso (done vuelve a 0), se inscribe un alumno
  // nuevo: sube "Alumnos" y "Ventas", y aparece el toast de acceso concedido.
  useEffect(() => {
    if (reduce || tick === 0) return;
    if (tick % (LESSONS.length + 1) === 0) {
      setStudents((n) => n + 1);
      setSales((n) => n + 690);
      setEnroll((e) => (e + 1) % STUDENTS.length);
    }
  }, [tick, reduce]);

  const student = STUDENTS[enroll];
  const showToast = reduce || (tick > 0 && tick % (LESSONS.length + 1) === 0);

  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-[460px] overflow-hidden rounded-3xl border border-white/10 p-4 sm:p-5"
      style={{
        background: `radial-gradient(130% 110% at 78% 16%, #133250, ${C.base})`,
        boxShadow: "0 40px 90px -35px rgba(0,0,0,0.75)",
      }}
    >
      {/* Etiqueta */}
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
          Inscripción y pago automáticos
        </span>
      </div>

      {/* Mini-pantalla del curso */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10" style={{ background: C.panel }}>
        {/* "Video" del curso con barra de progreso */}
        <div
          className="relative flex h-20 items-center justify-center"
          style={{ background: `linear-gradient(135deg, #16314a, ${C.base})` }}
        >
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: "rgba(242,169,59,0.15)", border: `1px solid ${C.amber}` }}
            animate={reduce ? {} : { scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill={C.amber}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.span>
          {/* Barra de progreso del módulo */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
            <motion.div
              className="h-full"
              style={{ background: C.amber }}
              initial={false}
              animate={{ width: `${(done / LESSONS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Lista de lecciones que se marcan solas */}
        <div className="flex flex-col gap-1.5 p-2.5">
          {LESSONS.map((lesson, i) => {
            const complete = i < done;
            return (
              <div key={lesson} className="flex items-center gap-2">
                <motion.span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: complete ? C.green : "transparent",
                    border: complete ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                  }}
                  animate={complete && !reduce ? { scale: [0.7, 1] } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 16 }}
                >
                  {complete && (
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#0b1b2b" strokeWidth="3.5">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </motion.span>
                <span
                  className="text-[11px]"
                  style={{ color: complete ? C.muted : C.text, textDecoration: complete ? "line-through" : "none" }}
                >
                  {lesson}
                </span>
                {i === done && !reduce && (
                  <span className="ml-auto text-[8px] font-bold uppercase tracking-wide" style={{ color: C.amber }}>
                    En curso
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast: alumno inscrito + acceso concedido */}
      <div className="relative mt-2.5 h-9">
        <AnimatePresence>
          {showToast && (
            <motion.div
              key={`${enroll}-${tick}`}
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-x-0 flex items-center gap-2 rounded-xl border px-2.5 py-1.5"
              style={{ background: C.card, borderColor: C.green }}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                style={{ background: `${student.color}22`, color: student.color }}
              >
                {student.initials}
              </span>
              <span className="text-[10px] font-medium" style={{ color: C.text }}>
                Nuevo alumno inscrito
              </span>
              <span
                className="ml-auto flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-bold"
                style={{ background: "rgba(52,211,153,0.15)", color: C.green }}
              >
                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke={C.green} strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Acceso concedido
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Métricas */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-2 sm:left-5 sm:right-5">
        <div className="flex-1 rounded-xl border border-white/10 px-3 py-2" style={{ background: C.panel }}>
          <p className="text-[9px] uppercase tracking-wide" style={{ color: C.muted }}>
            Alumnos inscritos
          </p>
          <div className="flex items-center gap-1">
            <motion.span
              key={students}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display text-base font-bold"
              style={{ color: C.text }}
            >
              {students.toLocaleString("es-MX")}
            </motion.span>
            <span className="text-[9px]" style={{ color: C.sky }}>▲</span>
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-white/10 px-3 py-2" style={{ background: C.panel }}>
          <p className="text-[9px] uppercase tracking-wide" style={{ color: C.muted }}>
            Ventas
          </p>
          <div className="flex items-center gap-1">
            <motion.span
              key={sales}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display text-base font-bold"
              style={{ color: C.amber }}
            >
              ${sales.toLocaleString("es-MX")}
            </motion.span>
            <span className="text-[9px]" style={{ color: C.green }}>▲</span>
          </div>
        </div>
      </div>
    </div>
  );
}
