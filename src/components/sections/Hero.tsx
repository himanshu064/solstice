"use client";

import { motion } from "motion/react";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-xl max-lg:rounded-3xl max-lg:bg-porcelain/75 max-lg:p-8 max-lg:backdrop-blur-md">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-mono text-[11px] tracking-[0.35em] text-copper uppercase"
          >
            Object Nº 01 · Levitating Light
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-6 text-[clamp(3.2rem,9vw,6.5rem)] leading-[0.95] tracking-tight"
          >
            Light,
            <br />
            <em className="text-copper">suspended.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-8 max-w-md text-lg leading-relaxed text-cocoa"
          >
            Halo One holds a hand-blown glass orb twelve millimetres above its
            base. No strings, no stand, just a magnetic field and three copper
            halos. Drag it. Scroll, and watch it come apart.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#reserve"
              className="rounded-full bg-copper px-7 py-3.5 font-mono text-xs tracking-[0.2em] text-porcelain uppercase transition-colors hover:bg-ink"
            >
              Reserve · $1,450
            </a>
            <a
              href="#craft"
              className="rounded-full border border-ink/25 px-7 py-3.5 font-mono text-xs tracking-[0.2em] text-ink uppercase transition-colors hover:border-copper hover:text-copper"
            >
              See the craft
            </a>
          </motion.div>
        </div>

        {/* baseline ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute inset-x-0 bottom-8"
        >
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 font-mono text-[10px] tracking-[0.25em] text-cocoa/70 uppercase">
            <span>2,200K – 5,600K</span>
            <span className="hidden sm:inline">850 lm · CRI 97</span>
            <span className="hidden md:inline">14 h untethered</span>
            <span className="flex items-center gap-2">
              Scroll
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              >
                ↓
              </motion.span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
