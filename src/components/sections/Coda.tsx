import Reveal from "@/components/Reveal";

export default function Coda() {
  return (
    <section
      id="reserve"
      className="relative flex min-h-screen flex-col justify-between pt-48 pb-10"
    >
      <div className="mx-auto w-full max-w-2xl px-6 text-center">
        <Reveal className="rounded-3xl bg-porcelain/65 p-10 backdrop-blur-md sm:p-14">
          <p className="font-mono text-[11px] tracking-[0.35em] text-copper uppercase">
            First light: Spring 2027
          </p>
          <h2 className="font-display mt-6 text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight">
            Own a
            <br />
            <em className="text-copper">small sun.</em>
          </h2>
          <p className="mx-auto mt-8 max-w-md leading-relaxed text-cocoa">
            Edition of 500, numbered on the underside of the base. A fully
            refundable deposit holds yours.
          </p>
          <div className="pointer-events-auto mt-10">
            <a
              href="#top"
              className="inline-block rounded-full bg-copper px-9 py-4 font-mono text-xs tracking-[0.2em] text-porcelain uppercase transition-colors hover:bg-ink"
            >
              Reserve Halo One · $1,450
            </a>
          </div>
        </Reveal>
      </div>

      <footer className="mx-auto mt-32 w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-husk pt-6 font-mono text-[10px] tracking-[0.25em] text-cocoa/70 uppercase">
          <span>© 2026 Solstice Object Works</span>
          <span className="hidden sm:inline">Built with React Three Fiber</span>
          <span>Est. 51.48° N, where light is scarce</span>
        </div>
      </footer>
    </section>
  );
}
