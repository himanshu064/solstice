"use client";

import { motion } from "motion/react";

const links = [
  { href: "#craft", label: "Craft" },
  { href: "#modes", label: "Modes" },
  { href: "#specs", label: "Specs" },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto fixed inset-x-0 top-0 z-50 border-b border-husk/60 bg-porcelain/70 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-xl tracking-tight">
          SOLSTICE<span className="text-copper">*</span>
        </a>

        <div className="hidden gap-8 font-mono text-[11px] tracking-[0.25em] uppercase sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-cocoa transition-colors hover:text-copper"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#reserve"
          className="rounded-full bg-ink px-5 py-2 font-mono text-[11px] tracking-[0.2em] text-porcelain uppercase transition-colors hover:bg-copper"
        >
          Reserve
        </a>
      </nav>
    </motion.header>
  );
}
