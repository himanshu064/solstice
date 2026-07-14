import Reveal from "@/components/Reveal";

const modes = [
  {
    name: "Ember",
    kelvin: "2,200 K",
    swatch: "#ff9440",
    body: "Candlelight without the candle. For the last hour of the evening.",
  },
  {
    name: "Gallery",
    kelvin: "4,000 K",
    swatch: "#ffd9a0",
    body: "Neutral and honest. The light your paintings and plants were made for.",
  },
  {
    name: "Zenith",
    kelvin: "5,600 K",
    swatch: "#dcecff",
    body: "Noon on demand. Full-spectrum clarity for desks and dark winters.",
  },
];

export default function Modes() {
  return (
    <section id="modes" className="relative min-h-[130vh] py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-lg max-lg:rounded-3xl max-lg:bg-porcelain/75 max-lg:p-8 max-lg:backdrop-blur-md">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.35em] text-copper uppercase">
              Three suns. Keep scrolling
            </p>
            <h2 className="font-display mt-5 text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-tight">
              One lamp,
              <br />
              every <em className="text-copper">hour of day.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-cocoa">
              The filament sweeps a continuous 2,200 to 5,600 K range. As you
              scroll this page, the orb walks the whole spectrum, from ember
              to gallery to zenith and back.
            </p>
          </Reveal>

          <div className="mt-14 space-y-6">
            {modes.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.12}>
                <div className="flex items-center gap-6 rounded-2xl border border-husk bg-sand/60 p-6 backdrop-blur-sm">
                  <span
                    className="h-10 w-10 shrink-0 rounded-full shadow-[0_0_24px_6px_rgba(224,138,44,0.25)]"
                    style={{ background: m.swatch }}
                  />
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-2xl">{m.name}</h3>
                      <span className="font-mono text-[11px] tracking-[0.2em] text-copper">
                        {m.kelvin}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-cocoa">
                      {m.body}
                    </p>
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
