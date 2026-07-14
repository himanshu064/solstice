/* Shared mutable scroll state. Written by the Lenis loop on the DOM side,
   read every frame inside the R3F render loop — a ref-style store avoids
   re-rendering React for a value that changes 60×/second. */
export const scrollState = {
  progress: 0, // 0 at top of page → 1 at bottom
  velocity: 0,
};

/* Normalised scroll positions (0..1) at which each section's centre crosses
   the middle of the viewport. Measured from the real DOM so the 3D
   choreography stays in sync at any viewport width, zoom level, or text
   wrap. Defaults approximate a desktop layout until measure() runs. */
export const marks = {
  hero: 0.0,
  craft: 0.28,
  modes: 0.52,
  specs: 0.75,
  coda: 0.96,
};

const sectionIds: Record<keyof typeof marks, string> = {
  hero: "top",
  craft: "craft",
  modes: "modes",
  specs: "specs",
  coda: "reserve",
};

export function measureMarks() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  if (range <= 0) return;
  for (const key of Object.keys(marks) as (keyof typeof marks)[]) {
    const el = document.getElementById(sectionIds[key]);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const centre =
      rect.top + window.scrollY + rect.height / 2 - window.innerHeight / 2;
    marks[key] = Math.min(Math.max(centre / range, 0), 1);
  }
}

type Stop = [at: number, value: number];

/* Piecewise keyframe track: returns the value at progress `p`,
   smoothstepped between stops. */
export function track(p: number, stops: Stop[]): number {
  if (p <= stops[0][0]) return stops[0][1];
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, v0] = stops[i];
    const [t1, v1] = stops[i + 1];
    if (p <= t1) {
      const k = (p - t0) / (t1 - t0);
      const e = k * k * (3 - 2 * k);
      return v0 + (v1 - v0) * e;
    }
  }
  return stops[stops.length - 1][1];
}
