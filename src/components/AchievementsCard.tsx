"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { MedalIcon } from "./Icons";

const BADGES = [
  "Explorador Modernista",
  "Caminhante da Mata",
  "Guardião do Patrimônio",
  "Rota Completa",
];

const COLLECTED = 12;
const TOTAL = 20;

/**
 * Cartão-vitrine da gamificação: quando entra na tela, o contador de marcos
 * sobe de 0, as medalhas "assentam" com mola uma a uma e a barra de progresso
 * preenche. Com prefers-reduced-motion tudo aparece já no estado final.
 */
export default function AchievementsCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  const count = useMotionValue(reduce ? COLLECTED : 0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(count, COLLECTED, { duration: 1.4, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, reduce, count]);

  const show = inView || Boolean(reduce);

  return (
    <div
      ref={ref}
      className="rounded-[1.75rem] border border-white/15 bg-white/5 p-6 backdrop-blur"
    >
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-semibold">Suas conquistas</p>
        <span className="rounded-full bg-brand-orange px-3 py-1 text-xs font-bold tabular-nums">
          <motion.span>{rounded}</motion.span> / {TOTAL} marcos
        </span>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-4">
        {BADGES.map((badge, i) => {
          const unlocked = i < 3;
          return (
            <div key={badge} className="flex flex-col items-center gap-2 text-center">
              <motion.span
                initial={reduce ? false : { scale: 0, rotate: -14, opacity: 0 }}
                animate={show ? { scale: 1, rotate: 0, opacity: 1 } : undefined}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 17,
                  delay: reduce ? 0 : 0.25 + i * 0.14,
                }}
                className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${
                  unlocked
                    ? "border-brand-orange bg-brand-orange/15 text-brand-orange"
                    : "border-white/20 bg-white/5 text-white/30"
                }`}
              >
                <MedalIcon className="h-8 w-8" />
              </motion.span>
              <span className="text-[0.65rem] leading-tight text-white/70">
                {badge}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="h-2 overflow-hidden rounded-full bg-white/15">
          <motion.div
            initial={reduce ? false : { width: "0%" }}
            animate={show ? { width: `${(COLLECTED / TOTAL) * 100}%` } : undefined}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={reduce ? { width: `${(COLLECTED / TOTAL) * 100}%` } : undefined}
            className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-leaf"
          />
        </div>
        <p className="mt-2 text-xs text-white/60">
          Faltam {TOTAL - COLLECTED} marcos para concluir o Circuito Luz de Minas
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
          <Image
            src="/cataguases.png"
            alt="Marco histórico em Cataguases"
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="text-sm">
          <p className="font-semibold">Escaneie para coletar</p>
          <p className="text-white/60">Estação Ferroviária · Cataguases</p>
        </div>
      </div>
    </div>
  );
}
