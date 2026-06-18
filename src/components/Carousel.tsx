"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Placeholder from "./Placeholder";

/** Telas do app exibidas no carrossel. Troque os placeholders por imagens reais. */
const SLIDES = [
  { label: "<<screenshot-rotas>>", caption: "Rotas guiadas no mapa" },
  { label: "<<screenshot-audioguia>>", caption: "Áudio-guia em cada marco" },
  { label: "<<screenshot-qrcode>>", caption: "Coleta por QR Code" },
  { label: "<<screenshot-conquistas>>", caption: "Conquistas e medalhas" },
  { label: "<<screenshot-guia-local>>", caption: "Guia Local com cupons" },
];

const AUTOPLAY_MS = 3500;

/**
 * Carrossel "coverflow" 3D — autorrotativo, com profundidade e rotação suave,
 * dando a sensação de uma galeria em movimento (obra de arte).
 * Acessível: setas, indicadores, navegação por teclado e pausa no hover/foco.
 * Respeita prefers-reduced-motion (sem autoplay).
 */
export default function Carousel() {
  const n = SLIDES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (dir: number) => setActive((a) => (a + dir + n) % n),
    [n]
  );
  const goTo = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);

  // Autoplay (desativado se o usuário prefere menos movimento)
  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, go]);

  // Calcula o deslocamento "circular" mais curto entre o slide e o ativo
  const offsetOf = (i: number) => {
    let off = i - active;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;
    return off;
  };

  const styleFor = (off: number) => {
    const abs = Math.abs(off);
    // Base centraliza o slide no palco; o coverflow é aplicado em seguida.
    // (precisa estar no transform inline, senão sobrescreveria as classes utilitárias)
    const center = "translate(-50%, -50%)";
    if (abs > 2) {
      return {
        transform: `${center} translateX(${off > 0 ? 160 : -160}%) scale(0.5)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as const,
      };
    }
    const translate = off * 52; // % de deslocamento lateral
    const rotate = off * -22; // graus de rotação em Y (efeito coverflow)
    const scale = 1 - abs * 0.16;
    const opacity = off === 0 ? 1 : abs === 1 ? 0.7 : 0.35;
    return {
      transform: `${center} translateX(${translate}%) rotateY(${rotate}deg) scale(${scale})`,
      opacity,
      zIndex: 30 - abs,
    };
  };

  return (
    <div
      ref={regionRef}
      role="group"
      aria-roledescription="carrossel"
      aria-label="Telas do app Luz de Minas"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      {/* Palco 3D */}
      <div
        className="relative mx-auto h-[480px] w-full max-w-3xl [perspective:1200px] sm:h-[540px]"
        aria-live="polite"
      >
        {SLIDES.map((slide, i) => {
          const off = offsetOf(i);
          const isActive = off === 0;
          return (
            <div
              key={slide.label}
              className="absolute left-1/2 top-1/2 transition-all duration-700 ease-out [transform-style:preserve-3d]"
              style={styleFor(off)}
              aria-hidden={!isActive}
            >
              <button
                type="button"
                tabIndex={isActive ? 0 : -1}
                onClick={() => (isActive ? undefined : goTo(i))}
                aria-label={
                  isActive ? slide.caption : `Ir para: ${slide.caption}`
                }
                className="block cursor-pointer rounded-[2.2rem] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/60"
              >
                {/* Moldura de celular */}
                <div className="w-[210px] rounded-[2.2rem] border-[9px] border-black/80 bg-black shadow-2xl sm:w-[235px]">
                  <Placeholder
                    label={slide.label}
                    alt={`Tela do app: ${slide.caption}`}
                    variant="screenshot"
                    className="aspect-[9/19] rounded-[1.6rem]"
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Legenda do slide ativo */}
      <p className="mt-2 text-center text-sm font-semibold text-ink/70 dark:text-slate-300">
        {SLIDES[active].caption}
      </p>

      {/* Controles */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Slide anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-blue shadow-card transition hover:bg-brand-blue hover:text-white dark:bg-night-card dark:text-brand-sky dark:ring-1 dark:ring-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Indicadores */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar slide">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={slide.caption}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === active
                  ? "w-6 bg-brand-orange"
                  : "w-2.5 bg-brand-blue/25 hover:bg-brand-blue/50 dark:bg-white/25 dark:hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próximo slide"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-blue shadow-card transition hover:bg-brand-blue hover:text-white dark:bg-night-card dark:text-brand-sky dark:ring-1 dark:ring-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
