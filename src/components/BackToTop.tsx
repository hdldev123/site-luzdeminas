"use client";

import { useEffect, useState } from "react";

/**
 * Botão flutuante discreto para voltar ao topo.
 * Aparece após rolar a página e some perto do topo. Acessível e com
 * rolagem suave (respeita prefers-reduced-motion).
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Voltar ao topo"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white/80 text-brand-blue shadow-soft backdrop-blur transition-all duration-300 hover:bg-white hover:text-brand-orange dark:border-white/10 dark:bg-night-card/80 dark:text-brand-sky dark:hover:bg-night-card ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
