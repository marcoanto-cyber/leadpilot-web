"use client";

import dynamic from "next/dynamic";

// Carga diferida: ogl no entra en el bundle inicial.
const Strands = dynamic(() => import("./Strands"), { ssr: false });

/**
 * Strands como fondo full-bleed (no encerrado en un cuadro), pensado para
 * usarse detrás del título de un PageHero. Sutil para no tapar el texto.
 */
export function StrandsBackdrop() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Strands
        colors={["#FF7849", "#4D8BFF", "#FFC56E"]}
        count={3}
        speed={0.5}
        amplitude={1}
        waviness={1}
        thickness={0.7}
        glow={2.4}
        taper={2.4}
        spread={1}
        intensity={0.6}
        saturation={1.4}
        opacity={0.65}
        scale={1.6}
      />
    </div>
  );
}
