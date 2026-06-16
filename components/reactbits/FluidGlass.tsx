/* eslint-disable react/no-unknown-property */
"use client";

// FluidGlass de React Bits (https://www.reactbits.dev), modo "lens".
// Adaptación para Lead Pilot:
//  - Solo la lente (sin ScrollControls, imágenes demo ni tipografía "React Bits").
//  - Fondo transparente (sin el fondo morado original) para integrarse al hero navy.
//  - La lente sigue el cursor vía listener global y refracta un degradado de marca.
//  - El <Canvas> es pointer-events:none, así que NUNCA bloquea los botones.

import * as THREE from "three";
import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { useFBO, useGLTF, MeshTransmissionMaterial, Preload } from "@react-three/drei";
import { easing } from "maath";

useGLTF.preload("/assets/3d/lens.glb");

type Pointer = { x: number; y: number };

type LensProps = {
  scale?: number;
  ior?: number;
  thickness?: number;
  anisotropy?: number;
  chromaticAberration?: number;
};

/** Textura de degradado "amanecer" (azul instrumento → coral → ámbar) para refractar. */
function useBrandGradientTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#0B1437";
    ctx.fillRect(0, 0, size, size);

    const blobs: [number, number, number, string][] = [
      [size * 0.3, size * 0.35, size * 0.5, "#3D7EFF"],
      [size * 0.72, size * 0.4, size * 0.45, "#FF7849"],
      [size * 0.55, size * 0.75, size * 0.5, "#FFC56E"],
      [size * 0.2, size * 0.8, size * 0.4, "#6FA0FF"],
    ];
    for (const [x, y, r, color] of blobs) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(11,20,55,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Lens({
  pointerRef,
  lensProps,
}: {
  pointerRef: React.MutableRefObject<Pointer>;
  lensProps: LensProps;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF("/assets/3d/lens.glb") as unknown as {
    nodes: Record<string, THREE.Mesh>;
  };
  const buffer = useFBO();
  const [scene] = useState(() => new THREE.Scene());
  const gradient = useBrandGradientTexture();

  const geometry = nodes.Cylinder?.geometry;

  const {
    scale = 0.22,
    ior = 1.15,
    thickness = 5,
    anisotropy = 0.01,
    chromaticAberration = 0.1,
  } = lensProps;

  useFrame((state, delta) => {
    if (!ref.current) return;
    const { gl, viewport, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const p = pointerRef.current;
    const destX = (p.x * v.width) / 2;
    const destY = (p.y * v.height) / 2;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    // Renderiza el degradado de marca al buffer que la lente va a refractar.
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(
        <mesh scale={[18, 18, 1]} position={[0, 0, 0]}>
          <planeGeometry />
          {gradient ? (
            <meshBasicMaterial map={gradient} toneMapped={false} />
          ) : (
            <meshBasicMaterial color="#1a2a6b" />
          )}
        </mesh>,
        scene
      )}

      {geometry && (
        <mesh
          ref={ref}
          scale={scale}
          rotation-x={Math.PI / 2}
          geometry={geometry}
        >
          <MeshTransmissionMaterial
            buffer={buffer.texture}
            ior={ior}
            thickness={thickness}
            anisotropy={anisotropy}
            chromaticAberration={chromaticAberration}
          />
        </mesh>
      )}
    </>
  );
}

export default function FluidGlass({ lensProps = {} }: { lensProps?: LensProps }) {
  const pointerRef = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: "none" }}
      frameloop="always"
    >
      <Lens pointerRef={pointerRef} lensProps={lensProps} />
      <Preload all />
    </Canvas>
  );
}
