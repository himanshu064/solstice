# SOLSTICE — Halo One

**Mockup 2** in the client-demos series (sibling of `pelagic/`): a single-page
product site with a **true WebGL 3D scene** — a levitating sculptural lamp you
can drag to orbit, whose choreography (exploded view, colour-temperature sweep)
is driven by scroll.

Deliberately the opposite of Pelagic's dark abyss: warm porcelain/copper
palette, light theme, and the classic "contemporary luxury" type pairing —
Playfair Display headlines over Inter body, DM Mono for labels.

## Stack (latest versions from npmjs.com at build time, 2026-07-14)

| Library | Version | Role |
|---|---|---|
| next | 16.2.10 | App Router, TypeScript, Turbopack |
| react / react-dom | 19.2.x | UI runtime |
| tailwindcss | 4.x | Styling (`@theme` tokens in `globals.css`) |
| three | 0.185.1 | WebGL |
| @react-three/fiber | 9.6.1 | React renderer for three.js |
| @react-three/drei | 10.7.7 | Float, MeshTransmissionMaterial, Environment/Lightformer, ContactShadows, Sparkles, PresentationControls |
| motion | 12.42.2 | DOM reveal animations (`motion/react`) |

Fonts (next/font/google): Playfair Display · Inter · DM Mono.
| lenis | 1.3.25 | Smooth scroll + scroll progress feed |

## Run

```bash
npm install
npm run dev   # http://localhost:3000
```

## How the 3D works

- `src/components/three/Scene.tsx` — fixed full-viewport `<Canvas>` behind the
  DOM. Procedural studio lighting via `<Environment>` + `<Lightformer>` (no
  runtime HDR downloads). `PresentationControls` gives drag-to-orbit.
- `src/components/three/HaloOne.tsx` — the product, built entirely from
  primitives: transmission-glass orb, emissive filament core, three copper
  torus halos, walnut maglev base. A `useFrame` loop reads scroll progress and
  drives position/exploded-view/colour-temperature through keyframe tracks.
- `src/lib/scroll.ts` — mutable scroll store written by Lenis, read at 60 fps
  by the render loop (no React re-renders), plus the `track()` keyframe helper.
- DOM sections scroll over the canvas with `pointer-events: none` (links opt
  back in), so drags fall through to the 3D scene.

Scroll choreography: hero (assembled, right) → craft (drifts left, halos fly
apart) → modes (reassembles, filament sweeps 2,200 K → 5,600 K) → specs
(shrinks behind frosted plate) → coda (returns, ember glow).
