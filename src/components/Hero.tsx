"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import HeroCanvas from "./HeroCanvas";
import MagneticButton from "./MagneticButton";
import { openModal } from "@/lib/modal";
import { CheckIcon, ArrowRightIcon } from "./Icons";

const HEADLINE = "Explore a história, a arquitetura e o modernismo da Zona da Mata";
const HIGHLIGHT = "modernismo";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

// Palavra sobe por trás de uma máscara (overflow-hidden do wrapper).
const rise: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-gradient-to-b from-brand-dark via-brand-dark to-brand-darker text-white"
    >
      {/* Luz viva (Three.js) — atrás de tudo; cai no gradiente se não montar */}
      <HeroCanvas />

      {/* Scrim para legibilidade do texto sobre a luz animada */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-darker/85 via-brand-darker/45 to-transparent"
      />
      {/* Grão: aquece a imagem e tira o "digital demais" */}
      <div aria-hidden="true" className="grain-overlay absolute inset-0" />

      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="container-page relative grid gap-14 pb-24 pt-32 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:pb-32 lg:pt-40"
      >
        <div>
          {/* Kicker editorial: filete + label espaçado (sem pílula genérica) */}
          <motion.div variants={fade} className="flex items-center gap-3">
            <span className="h-px w-10 bg-brand-orange" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">
              Rota Luz de Minas
            </span>
          </motion.div>

          <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.01em] sm:text-6xl lg:text-[4.1rem]">
            {HEADLINE.split(" ").map((word, i) => {
              const highlight = word === HIGHLIGHT;
              return (
                <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    variants={rise}
                    className={`inline-block ${
                      highlight ? "italic text-brand-orange" : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                  {" "}
                </span>
              );
            })}
          </h1>

          <motion.p
            variants={fade}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
          >
            Rotas guiadas, áudio-guia narrativo e recompensas a cada marco que
            você descobre. Uma jornada por Cataguases, Leopoldina/Piacatuba e
            Itamarati — que cabe no seu bolso.
          </motion.p>

          <motion.div variants={fade} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <MagneticButton
              onClick={() => openModal("coming-soon")}
              aria-haspopup="dialog"
              aria-label="Inscreva-se para o lançamento"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-brand-orange px-8 py-4 text-base font-bold text-white shadow-[0_18px_40px_-12px_rgba(255,107,53,0.6)]"
            >
              {/* brilho que cruza no hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Inscreva-se</span>
              <ArrowRightIcon className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>

            <a
              href="#como-funciona"
              className="group inline-flex items-center gap-2 text-base font-semibold text-white/85 transition hover:text-white"
            >
              <span className="border-b border-white/30 pb-0.5 transition group-hover:border-brand-orange">
                Conhecer o APP
              </span>
            </a>
          </motion.div>

          <motion.ul
            variants={fade}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70"
          >
            {["Pré-cadastro gratuito", "Chega em iOS e Android"].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckIcon className="h-4 w-4 text-brand-orange" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Mockup do app com halo de luz quente */}
        <motion.div
          variants={fade}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/20 blur-3xl"
          />
          <div className={reduce ? "" : "animate-float"}>
            <div className="mx-auto w-[260px] rounded-[2.6rem] border-[10px] border-black/85 bg-black shadow-[0_40px_80px_-24px_rgba(0,0,0,0.7)] sm:w-[300px]">
              <div className="relative aspect-[9/19] overflow-hidden rounded-[1.9rem]">
                <Image
                  src="/inicio.jpeg"
                  alt="Tela inicial do app Luz de Minas"
                  fill
                  sizes="(max-width: 640px) 240px, 300px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Transição para o fundo claro */}
      <div
        className="relative h-14 bg-surface dark:bg-night [clip-path:ellipse(78%_100%_at_50%_100%)]"
        aria-hidden="true"
      />
    </section>
  );
}
