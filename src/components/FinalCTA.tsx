"use client";

import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { openModal } from "@/lib/modal";
import { MapPinIcon, ArrowRightIcon, CheckIcon } from "./Icons";

/**
 * Fechamento da página: um grande momento editorial com o mesmo material do
 * hero (verde profundo, luz quente, grão) e o CTA de inscrição magnético.
 */
export default function FinalCTA() {
  return (
    <section id="baixar" className="container-page py-20 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-dark via-brand-dark to-brand-darker px-6 py-16 text-center text-white shadow-soft sm:px-12 sm:py-24">
          {/* Luz quente assimétrica + grão, como no hero */}
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-28 right-[-10%] h-80 w-80 rounded-full bg-brand-leaf/15 blur-3xl"
            aria-hidden="true"
          />
          <div aria-hidden="true" className="grain-overlay absolute inset-0" />

          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              <MapPinIcon className="h-4 w-4" />
              Circuito Luz de Minas
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
            </span>

            <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
              A história da Zona da Mata{" "}
              <span className="italic text-brand-orange">cabe no seu bolso</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Deixe seu e-mail e seja avisado no lançamento — e comece a
              colecionar marcos, medalhas e memórias por Cataguases, Leopoldina e
              Piacatuba/Itamarati.
            </p>

            <div className="mt-10 flex justify-center">
              <MagneticButton
                onClick={() => openModal("coming-soon")}
                aria-haspopup="dialog"
                aria-label="Inscreva-se para o lançamento"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-brand-orange px-9 py-4 text-lg font-bold text-white shadow-[0_18px_40px_-12px_rgba(255,107,53,0.6)] sm:px-10 sm:py-5"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">Inscreva-se</span>
                <ArrowRightIcon className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
            </div>

            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              {["Pré-cadastro gratuito", "Chega em iOS e Android"].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4 text-brand-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
