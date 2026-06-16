/* eslint-disable react/no-unknown-property */
"use client";

// FluidGlass de React Bits (https://www.reactbits.dev), modo "lens".
// Adaptación Lead Pilot: la lente refracta el TITULAR del hero, que se
// renderiza dentro del canvas (drei <Text>) y se muestra sobre un plano.
//  - Sin ScrollControls / imágenes demo / fondo morado: canvas transparente.
//  - La lente sigue el cursor (relativo al canvas) y deforma el texto debajo.
//  - pointer-events:none → nunca bloquea los botones del hero.
//  - El SEO/accesibilidad se conserva con un <h1> sr-only en el HTML (ver Hero).

import * as THREE from "three";
import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { useFBO, MeshTransmissionMaterial, Text, Preload } from "@react-three/drei";
import { easing } from "maath";

const FONT_URL = "/fonts/SpaceGrotesk.ttf";

export type GlassLine = { text: string; color?: string };

type LensProps = {
  scale?: number;
  ior?: number;
  thickness?: number;
  anisotropy?: number;
  chromaticAberration?: number;
};

type Pointer = { x: number; y: number };

function useDevice() {
  const get = () => {
    if (typeof window === "undefined") return "desktop" as const;
    const w = window.innerWidth;
    return w <= 639 ? ("mobile" as const) : w <= 1023 ? ("tablet" as const) : ("desktop" as const);
  };
  const [device, setDevice] = useState(get);
  useEffect(() => {
    const onResize = () => setDevice(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return device;
}

function Headline({ lines, fontSize }: { lines: GlassLine[]; fontSize: number }) {
  const lineHeight = fontSize * 1.16;
  const start = ((lines.length - 1) / 2) * lineHeight;
  return (
    <group position={[0, 0, 12]}>
      {lines.map((line, i) => (
        <Text
          key={i}
          font={FONT_URL}
          fontSize={fontSize}
          position={[0, start - i * lineHeight, 0]}
          color={line.color ?? "#ffffff"}
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.04}
          textAlign="center"
          outlineWidth={0}
        >
          {line.text}
        </Text>
      ))}
    </group>
  );
}

function Lens({
  lines,
  fontSize,
  lensProps,
}: {
  lines: GlassLine[];
  fontSize: number;
  lensProps: LensProps;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const buffer = useFBO();
  const [scene] = useState(() => new THREE.Scene());
  const { viewport: vp, gl } = useThree();
  const pointerRef = useRef<Pointer>({ x: 0, y: 0 });

  // La lente sigue el cursor relativo al canvas (no a la ventana completa).
  useEffect(() => {
    const dom = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const r = dom.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = -((e.clientY - r.top) / r.height) * 2 + 1;
      pointerRef.current.x = Math.max(-1.2, Math.min(1.2, x));
      pointerRef.current.y = Math.max(-1.2, Math.min(1.2, y));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  const {
    scale = 0.3,
    ior = 1.25,
    thickness = 8,
    anisotropy = 0.02,
    chromaticAberration = 0.2,
  } = lensProps;

  useFrame((state, delta) => {
    if (!ref.current) return;
    const { gl, viewport, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const p = pointerRef.current;
    easing.damp3(
      ref.current.position,
      [(p.x * v.width) / 2, (p.y * v.height) / 2, 15],
      0.15,
      delta
    );

    // Render del titular a un buffer transparente que la lente refracta.
    gl.setRenderTarget(buffer);
    gl.setClearColor(0x000000, 0);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(<Headline lines={lines} fontSize={fontSize} />, scene)}

      {/* Plano que muestra el titular (visible normal) */}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent toneMapped={false} />
      </mesh>

      {/* Lente de vidrio que refracta el mismo titular */}
      <mesh ref={ref} scale={scale} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[1, 1, 0.18, 64]} />
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior}
          thickness={thickness}
          anisotropy={anisotropy}
          chromaticAberration={chromaticAberration}
          roughness={0}
          distortion={0.4}
          distortionScale={0.5}
          temporalDistortion={0.1}
        />
      </mesh>
    </>
  );
}

export default function FluidGlass({
  lines,
  lensProps = {},
}: {
  lines: GlassLine[];
  lensProps?: LensProps;
}) {
  const device = useDevice();
  const fontSize = device === "mobile" ? 0.26 : device === "tablet" ? 0.3 : 0.34;

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: "none" }}
      frameloop="always"
    >
      <Lens lines={lines} fontSize={fontSize} lensProps={lensProps} />
      <Preload all />
    </Canvas>
  );
}
