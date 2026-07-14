"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  PresentationControls,
} from "@react-three/drei";
import HaloOne from "./HaloOne";

/* Fixed full-viewport WebGL stage. The DOM sections scroll on top of it
   (pointer-events: none), so drags anywhere on open canvas rotate the lamp
   via PresentationControls while scroll drives the choreography. */

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 8.6], fov: 32 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#f5eee2"]} />
        <fog attach="fog" args={["#f5eee2", 10, 18]} />

        <ambientLight intensity={0.5} color="#fff3e2" />
        <directionalLight position={[4, 6, 3]} intensity={1.1} color="#fff1dd" />

        {/* Procedural studio — no HDR downloads, warm key / cool rim */}
        <Environment resolution={256} frames={1}>
          <Lightformer
            intensity={2.2}
            position={[0, 5, -9]}
            scale={[10, 6, 1]}
            color="#fff6e8"
          />
          <Lightformer
            intensity={3}
            position={[-5, 1, 2]}
            scale={[3, 6, 1]}
            color="#ffc78a"
          />
          <Lightformer
            intensity={1.6}
            position={[5, 2, 1]}
            scale={[3, 6, 1]}
            color="#dfe8ff"
          />
          <Lightformer
            intensity={1}
            position={[0, -4, 4]}
            scale={[12, 3, 1]}
            color="#f0e4cf"
          />
        </Environment>

        <PresentationControls
          global
          cursor
          speed={1.4}
          polar={[-0.25, 0.35]}
          azimuth={[-Infinity, Infinity]}
          snap
        >
          <HaloOne />
        </PresentationControls>
      </Canvas>
    </div>
  );
}
