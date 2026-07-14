import Reveal from "@/components/Reveal";

const materials = [
  {
    n: "01",
    title: "Borosilicate orb",
    body: "Hand-blown in a single gather, then annealed for nine hours. Each orb carries the faint seam of the blower's turn, so no two refract alike.",
  },
  {
    n: "02",
    title: "Copper halos",
    body: "Three rings, CNC-milled from solid C11000 copper and left unlacquered. They will darken with your room, year by year.",
  },
  {
    n: "03",
    title: "Maglev walnut base",
    body: "American black walnut over a sensor-driven electromagnet array. It holds the orb at a constant 12 mm gap, silently, for as long as it is powered.",
  },
];

export default function Craft() {
  return (
    <section id="craft" className="relative min-h-[130vh] py-40">
      <div className="mx-auto flex max-w-6xl justify-end px-6">
        <div className="w-full max-w-lg max-lg:rounded-3xl max-lg:bg-porcelain/75 max-lg:p-8 max-lg:backdrop-blur-md">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.35em] text-copper uppercase">
              The craft, exploded
            </p>
            <h2 className="font-display mt-5 text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-tight">
              Three honest
              <br />
              materials, <em className="text-copper">apart.</em>
            </h2>
          </Reveal>

          <div className="mt-14 space-y-10">
            {materials.map((m, i) => (
              <Reveal key={m.n} delay={i * 0.12}>
                <div className="flex gap-6 border-t border-husk pt-8">
                  <span className="font-mono text-xs text-copper">{m.n}</span>
                  <div>
                    <h3 className="font-display text-2xl">{m.title}</h3>
                    <p className="mt-3 leading-relaxed text-cocoa">{m.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
