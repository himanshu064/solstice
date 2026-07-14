import Reveal from "@/components/Reveal";

const specs: [string, string][] = [
  ["Orb", "Ø 180 mm, hand-blown borosilicate"],
  ["Halos", "C11000 copper, CNC-milled, raw finish"],
  ["Base", "American black walnut, Ø 200 mm"],
  ["Levitation gap", "12 mm, sensor-stabilised maglev"],
  ["Output", "850 lm · CRI 97"],
  ["Temperature", "2,200 – 5,600 K, continuous"],
  ["Untethered", "14 h (orb lifts off, base-free)"],
  ["Charging", "Contactless, through the field"],
  ["Weight", "2.4 kg complete"],
  ["Control", "Rotate the top halo · app optional"],
];

export default function Specs() {
  return (
    <section id="specs" className="relative flex min-h-screen items-center py-32">
      <div className="mx-auto w-full max-w-3xl px-6">
        <Reveal>
          <div className="rounded-3xl border border-husk bg-sand/75 p-8 backdrop-blur-md sm:p-12">
            <p className="font-mono text-[11px] tracking-[0.35em] text-copper uppercase">
              Object record
            </p>
            <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] tracking-tight">
              Halo One, <em className="text-copper">on record.</em>
            </h2>

            <dl className="mt-10 grid gap-x-10 sm:grid-cols-2">
              {specs.map(([k, v]) => (
                <div
                  key={k}
                  className="flex flex-col border-t border-husk py-4"
                >
                  <dt className="font-mono text-[10px] tracking-[0.25em] text-cocoa/70 uppercase">
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-[15px] leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
