"use client";

import Reveal from "./Reveal";
import StoreButtons from "./StoreButtons";
import { MapPinIcon, CheckIcon } from "./Icons";

/**
 * Fechamento da página: um grande momento editorial com o mesmo material do
 * hero (verde profundo, luz quente, grão) e os botões de download das lojas.
 * O id `baixar` é o destino dos CTAs "Baixar o app" do header e das cidades.
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
              Baixe o app e comece agora a colecionar marcos, medalhas e
              memórias por Cataguases, Leopoldina e Piacatuba/Itamarati.
            </p>

            <div className="mt-10 flex justify-center">
              <StoreButtons variant="light" />
            </div>

            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              {["Download gratuito", "Disponível para iOS e Android"].map((item) => (
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
