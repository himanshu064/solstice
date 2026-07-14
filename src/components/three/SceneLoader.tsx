"use client";

import dynamic from "next/dynamic";

/* WebGL must never render on the server; this client wrapper is the only
   place `ssr: false` is allowed in the App Router. */
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 grid place-items-center" aria-hidden>
      <p className="font-mono text-xs tracking-[0.3em] text-cocoa/60 animate-pulse">
        WARMING THE FILAMENT…
      </p>
    </div>
  ),
});

export default function SceneLoader() {
  return <Scene />;
}
