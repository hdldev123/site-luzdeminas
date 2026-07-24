import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Ponto único de registro do GSAP + ScrollTrigger.
 * O registro só acontece no navegador (client components também passam pelo
 * SSR); importe `gsap`/`ScrollTrigger` sempre daqui.
 *
 * Convenção de uso nos componentes:
 *   const mm = gsap.matchMedia();
 *   mm.add("(prefers-reduced-motion: no-preference)", () => { ...animações });
 *   return () => mm.revert();
 * Assim quem prefere menos movimento recebe o layout final estático.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
