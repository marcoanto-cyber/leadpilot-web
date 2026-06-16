/* eslint-disable react/no-unknown-property */
"use client";

// FluidGlass de React Bits (https://www.reactbits.dev), modo "lens".
// Adaptación Lead Pilot:
//  - El canvas cubre TODO el hero; la lente recorre el hero completo.
//  - El titular se renderiza en WebGL y se ancla a un elemento del DOM
//    (#hero-headline-anchor) midiendo su posición/tamaño reales, así escala
//    y se alinea solo en cualquier breakpoint.
//  - Doble buffer: el plano visible muestra solo el texto (fondo limpio),
//    mientras la lente refracta texto + un degradado de marca, para que el
//    vidrio se vea por todo el hero sin lavar el diseño.
//  - En táctil la lente deriva sola (no hay cursor). pointer-events:none
//    para no bloquear nunca los botones.

import * as THREE from "three";
import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { useFBO, MeshTransmissionMaterial, Text, Preload } from "@react-three/drei";
import { easing } from "maath";

const FONT_URL = "/fonts/SpaceGrotesk.ttf";
const clamp = (n: number, min = -1.15, max = 1.15) => Math.max(min, Math.min(max, n));

export type GlassLine = { text: string; color?: string };

type LensProps = {
  scale?: number;
  ior?: number;
  thickness?: number;
  anisotropy?: number;
  chromaticAberration?: number;
};

type Layout = { leftX: number; midY: number; fontSize: number };

/** Degradado "amanecer" para que la lente tenga algo de marca que refractar. */
function useBrandGradientTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const blobs: [number, number, number, string][] = [
      [size * 0.28, size * 0.3, size * 0.5, "#4D8BFF"],
      [size * 0.74, size * 0.35, size * 0.46, "#FF7849"],
      [size * 0.55, size * 0.78, size * 0.5, "#FFC56E"],
      [size * 0.18, size * 0.82, size * 0.42, "#7FB0FF"],
    ];
    for (const [x, y, r, color] of blobs) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(5,8,15,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Lens({
  lines,
  anchorId,
  lensProps,
}: {
  lines: GlassLine[];
  anchorId: string;
  lensProps: LensProps;
}) {
  const lensRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const gradientRef = useRef<THREE.Mesh>(null);
  const bufText = useFBO();
  const bufRefract = useFBO();
  const [scene] = useState(() => new THREE.Scene());
  const { gl, viewport, camera } = useThree();
  const gradient = useBrandGradientTexture();

  const pointer = useRef({ x: 0, y: 0, active: false });
  const isTouch = useRef(false);
  const [layout, setLayout] = useState<Layout>({ leftX: -1.4, midY: 0.2, fontSize: 0.4 });

  const maxChars = useMemo(
    () => lines.reduce((m, l) => Math.max(m, l.text.length), 1),
    [lines]
  );

  const {
    scale = 0.32,
    ior = 1.25,
    thickness = 8,
    anisotropy = 0.02,
    chromaticAberration = 0.22,
  } = lensProps;

  useEffect(() => {
    isTouch.current =
      typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
  }, []);

  // Cursor relativo al canvas (todo el hero).
  useEffect(() => {
    const dom = gl.domElement;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = dom.getBoundingClientRect();
      pointer.current.x = clamp(((e.clientX - r.left) / r.width) * 2 - 1);
      pointer.current.y = clamp(-((e.clientY - r.top) / r.height) * 2 + 1);
      pointer.current.active = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  // Ancla el titular al elemento DOM real (mide y mapea a coordenadas de mundo).
  useEffect(() => {
    const compute = () => {
      const anchor = document.getElementById(anchorId);
      if (!anchor) return;
      const cRect = gl.domElement.getBoundingClientRect();
      const aRect = anchor.getBoundingClientRect();
      if (cRect.width === 0 || aRect.height === 0) return;
      const v = viewport.getCurrentViewport(camera, [0, 0, 12]);
      const wppx = v.width / cRect.width;
      const wppy = v.height / cRect.height;
      const leftX = (aRect.left - (cRect.left + cRect.width / 2)) * wppx;
      const midY = -(aRect.top + aRect.height / 2 - (cRect.top + cRect.height / 2)) * wppy;
      const byHeight = (aRect.height * wppy) / (lines.length * 1.18) * 0.82;
      const byWidth = (aRect.width * wppx) / (maxChars * 0.54);
      setLayout({ leftX, midY, fontSize: Math.min(byHeight, byWidth) });
    };
    compute();
    const t = setTimeout(compute, 350);
    window.addEventListener("resize", compute);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(compute).catch(() => {});
    }
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", compute);
    };
  }, [gl, viewport, camera, anchorId, lines.length, maxChars]);

  useFrame((state, delta) => {
    const { gl, camera } = state;
    const t = state.clock.elapsedTime;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    // Posición de la lente: cursor en desktop; deriva sobre el titular en táctil.
    let tx: number;
    let ty: number;
    if (pointer.current.active && !isTouch.current) {
      tx = (pointer.current.x * v.width) / 2;
      ty = (pointer.current.y * v.height) / 2;
    } else {
      tx = Math.sin(t * 0.55) * v.width * 0.22;
      ty = layout.midY + Math.sin(t * 0.8) * 0.55;
    }
    if (lensRef.current) {
      easing.damp3(lensRef.current.position, [tx, ty, 15], 0.16, delta);
    }

    if (groupRef.current) {
      groupRef.current.position.set(layout.leftX, layout.midY, 12);
    }

    // Doble render: texto limpio (visible) y texto+degradado (refracción).
    if (gradientRef.current) gradientRef.current.visible = false;
    gl.setRenderTarget(bufText);
    gl.setClearColor(0x000000, 0);
    gl.clear();
    gl.render(scene, camera);

    if (gradientRef.current) gradientRef.current.visible = true;
    gl.setRenderTarget(bufRefract);
    gl.setClearColor(0x000000, 0);
    gl.clear();
    gl.render(scene, camera);

    gl.setRenderTarget(null);
  });

  const lineHeight = layout.fontSize * 1.18;
  const start = ((lines.length - 1) / 2) * lineHeight;

  return (
    <>
      {createPortal(
        <>
          <mesh ref={gradientRef} position={[0, 0, 10.5]} visible={false}>
            <planeGeometry args={[14, 9]} />
            {gradient ? (
              <meshBasicMaterial map={gradient} transparent opacity={0.9} toneMapped={false} />
            ) : (
              <meshBasicMaterial color="#13204a" />
            )}
          </mesh>

          <group ref={groupRef}>
            {lines.map((line, i) => (
              <Text
                key={i}
                font={FONT_URL}
                fontSize={layout.fontSize}
                position={[0, start - i * lineHeight, 0]}
                color={line.color ?? "#ffffff"}
                anchorX="left"
                anchorY="middle"
                letterSpacing={-0.04}
                outlineWidth={0}
              >
                {line.text}
              </Text>
            ))}
          </group>
        </>,
        scene
      )}

      {/* Plano visible: solo el titular, fondo limpio */}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={bufText.texture} transparent toneMapped={false} />
      </mesh>

      {/* Lente de vidrio: refracta titular + degradado de marca */}
      <mesh ref={lensRef} scale={scale} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[1, 1, 0.18, 64]} />
        <MeshTransmissionMaterial
          buffer={bufRefract.texture}
          ior={ior}
          thickness={thickness}
          anisotropy={anisotropy}
          chromaticAberration={chromaticAberration}
          roughness={0}
          distortion={0.45}
          distortionScale={0.5}
          temporalDistortion={0.1}
        />
      </mesh>
    </>
  );
}

export default function FluidGlass({
  lines,
  anchorId = "hero-headline-anchor",
  lensProps = {},
}: {
  lines: GlassLine[];
  anchorId?: string;
  lensProps?: LensProps;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: "none" }}
      frameloop="always"
    >
      <Lens lines={lines} anchorId={anchorId} lensProps={lensProps} />
      <Preload all />
    </Canvas>
  );
}
