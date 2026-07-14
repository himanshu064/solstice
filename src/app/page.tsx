import SmoothScroll from "@/components/SmoothScroll";
import SceneLoader from "@/components/three/SceneLoader";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Craft from "@/components/sections/Craft";
import Modes from "@/components/sections/Modes";
import Specs from "@/components/sections/Specs";
import Coda from "@/components/sections/Coda";

/* The WebGL stage is fixed behind everything; the sections scroll over it.
   `pointer-events-none` on <main> lets drags fall through to the canvas —
   links and buttons opt back in with `pointer-events-auto`. */

export default function Home() {
  return (
    <SmoothScroll>
      <SceneLoader />
      <Nav />
      <main className="pointer-events-none relative z-10">
        <Hero />
        <Craft />
        <Modes />
        <Specs />
        <Coda />
      </main>
    </SmoothScroll>
  );
}
