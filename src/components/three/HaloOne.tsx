"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { marks, scrollState, track } from "@/lib/scroll";

/* Halo One, built entirely from primitives — no external model files.
   From bottom to top:
     · walnut maglev base with a copper trim ring
     · a levitating assembly: hand-blown glass orb, an emissive filament
       core, and three copper halos that fly apart in the Craft section.

   Scroll choreography, anchored to the measured centre of each DOM section
   (see marks/measureMarks in lib/scroll.ts) so it survives any viewport
   width, browser zoom, or text wrap:
     hero   — assembled, parked beside the headline
     craft  — drifts to the opposite side, halos separate (exploded view)
     modes  — reassembles, filament sweeps 2,200K→5,600K
     specs  — shrinks to centre behind the spec plate
     coda   — returns full-size, warm ember glow                        */

const EMBER = new THREE.Color("#ff9440");
const GALLERY = new THREE.Color("#ffd9a0");
const ZENITH = new THREE.Color("#dcecff");

const copperProps = {
  color: "#c46a2e",
  metalness: 1,
  roughness: 0.24,
} as const;

export default function HaloOne() {
  const root = useRef<THREE.Group>(null!);
  const spinner = useRef<THREE.Group>(null!);
  const haloTop = useRef<THREE.Group>(null!);
  const haloMid = useRef<THREE.Group>(null!);
  const haloLow = useRef<THREE.Group>(null!);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null!);
  const lamp = useRef<THREE.PointLight>(null!);

  const glowColor = useMemo(() => new THREE.Color("#ff9440"), []);

  useFrame((state, dt) => {
    const p = scrollState.progress;
    const t = state.clock.elapsedTime;
    const m = marks;

    // Which side of the screen the lamp occupies (-1 left … +1 right),
    // scaled to the visible world width so it hugs the free column
    // instead of a fixed spot that narrow viewports don't have.
    const lane = track(p, [
      [m.hero, 1], [m.craft, -1], [m.modes, 1], [m.specs, 0], [m.coda, 0],
    ]);
    const laneWidth = Math.min(1.85, Math.max(0.85, state.viewport.width * 0.24));
    const x = lane * laneWidth;

    // Narrow viewports also get a smaller lamp so it stays clear of copy
    const fit = Math.min(1, Math.max(0.55, state.viewport.width / 7.5));

    const y = track(p, [
      [m.modes, 0], [m.specs, 0.1], [(m.specs + m.coda) / 2, 0.1], [m.coda, -0.05],
    ]);
    const s =
      fit *
      track(p, [
        [m.modes, 1], [m.specs, 0.7], [(m.specs + m.coda) / 2, 0.7], [m.coda, 1.08],
      ]);
    // Exploded view, peaking as the Craft section is centred
    const spread = track(p, [
      [(m.hero + m.craft) / 2, 0], [m.craft, 1],
      [(m.craft + m.modes) / 2, 0],
    ]);
    // Colour temperature sweep across Modes
    const heat = track(p, [
      [(m.craft + m.modes) / 2, 0], [m.modes, 0.85],
      [(m.modes + m.specs) / 2, 1], [m.specs, 0.25], [m.coda, 0],
    ]);

    const k = 1 - Math.exp(-4.5 * dt); // frame-rate independent damping
    root.current.position.x += (x - root.current.position.x) * k;
    root.current.position.y += (y - root.current.position.y) * k;
    const sc = root.current.scale.x + (s - root.current.scale.x) * k;
    root.current.scale.setScalar(sc);

    // Slow idle spin + a scroll-driven turn, on top of the user's drag
    spinner.current.rotation.y = t * 0.12 + p * Math.PI * 2.5;

    // Halos fly apart along the axis and flatten out
    haloTop.current.position.y = spread * 0.95;
    haloLow.current.position.y = -spread * 0.95;
    haloTop.current.rotation.x = THREE.MathUtils.lerp(0.42, 0, spread);
    haloLow.current.rotation.x = THREE.MathUtils.lerp(-0.42, 0, spread);
    haloMid.current.scale.setScalar(1 + spread * 0.28);

    // Filament: kelvin sweep + candle-like flicker, livelier while scrolling
    glowColor
      .copy(heat < 0.5 ? EMBER : GALLERY)
      .lerp(heat < 0.5 ? GALLERY : ZENITH, (heat % 0.5) * 2);
    coreMat.current.emissive.lerp(glowColor, k);
    lamp.current.color.lerp(glowColor, k);
    const flicker = 1 + Math.sin(t * 2.3) * 0.08 + Math.sin(t * 7.1) * 0.03;
    coreMat.current.emissiveIntensity =
      (2.4 + Math.min(Math.abs(scrollState.velocity) * 0.02, 1.2)) * flicker;
    lamp.current.intensity = 6 * flicker;
  });

  return (
    <group ref={root} position={[1.7, 0, 0]}>
      {/* ----- levitating assembly ----- */}
      <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.55}>
        <group ref={spinner}>
          {/* glass orb */}
          <mesh>
            <sphereGeometry args={[0.78, 64, 64]} />
            <MeshTransmissionMaterial
              transmission={1}
              thickness={0.55}
              roughness={0.07}
              ior={1.45}
              chromaticAberration={0.05}
              anisotropicBlur={0.2}
              samples={8}
              resolution={512}
            />
          </mesh>

          {/* filament core */}
          <mesh>
            <icosahedronGeometry args={[0.3, 1]} />
            <meshStandardMaterial
              ref={coreMat}
              color="#2a1408"
              emissive="#ff9440"
              emissiveIntensity={2.4}
              flatShading
            />
          </mesh>
          <pointLight ref={lamp} color="#ff9440" intensity={6} distance={9} decay={2} />

          {/* three copper halos */}
          <group ref={haloTop} rotation={[0.42, 0, 0]}>
            <mesh>
              <torusGeometry args={[1.02, 0.032, 24, 128]} />
              <meshStandardMaterial {...copperProps} />
            </mesh>
          </group>
          <group ref={haloMid}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.18, 0.045, 24, 128]} />
              <meshStandardMaterial {...copperProps} />
            </mesh>
          </group>
          <group ref={haloLow} rotation={[-0.42, 0, 0]}>
            <mesh>
              <torusGeometry args={[1.02, 0.032, 24, 128]} />
              <meshStandardMaterial {...copperProps} roughness={0.35} />
            </mesh>
          </group>
        </group>

        {/* dust motes caught in the lamp light */}
        <Sparkles count={50} scale={4.5} size={2.2} speed={0.35} color="#e8a25c" />
      </Float>

      {/* ----- maglev base ----- */}
      <group position={[0, -1.62, 0]}>
        <mesh>
          <cylinderGeometry args={[0.92, 1.02, 0.16, 64]} />
          <meshStandardMaterial color="#2e2118" roughness={0.55} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.085, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.62, 0.022, 16, 96]} />
          <meshStandardMaterial {...copperProps} />
        </mesh>
      </group>

      <ContactShadows
        position={[0, -1.72, 0]}
        opacity={0.3}
        scale={5.5}
        blur={3}
        far={2.4}
        color="#4a2c14"
      />
    </group>
  );
}
