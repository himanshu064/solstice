"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { measureMarks, scrollState } from "@/lib/scroll";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true });

    lenis.on("scroll", (e: Lenis) => {
      scrollState.progress = e.progress;
      scrollState.velocity = e.velocity;
    });

    let raf = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    /* Keep the 3D choreography anchored to where the sections really are —
       re-measure whenever layout can shift (load, resize, font swap). */
    measureMarks();
    const ro = new ResizeObserver(measureMarks);
    ro.observe(document.body);
    window.addEventListener("resize", measureMarks);
    document.fonts?.ready.then(measureMarks);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measureMarks);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
