"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import ModalTrigger from "./ModalTrigger";
import { ArrowRightIcon } from "./Icons";
import { gsap } from "@/lib/gsapSetup";

const CITIES = [
  {
    stop: "01",
    name: "Cataguases",
    src: "/cataguases.png",
    alt: "Arquitetura modernista de Cataguases",
    text: "Berço do modernismo brasileiro: obras de Niemeyer, Portinari, Burle Marx e Paulo Werneck.",
  },
  {
    stop: "02",
    name: "Leopoldina / Piacatuba",
    src: "/leopoldina.jpg",
    alt: "Centro histórico de Leopoldina",
    text: "Tradição cafeeira, casario histórico e a hospitalidade que define a Zona da Mata.",
  },
  {
    stop: "03",
    name: "Itamarati de Minas",
    src: "/itamarati.png",
    alt: "Distrito de Itamarati de Minas",
    text: "Distritos de charme interiorano, memória ferroviária e paisagens que pedem uma boa caminhada.",
  },
];

/**
 * Cidades como paradas de uma rota. Uma linha vertical (o percurso) atravessa
 * a seção e se "preenche" conforme o usuário rola — como se ele viajasse o
 * circuito. Cada cidade alterna de lado (ritmo editorial), com foto em
 * parallax sutil e número de parada gigante ao fundo.
 *
 * Com prefers-reduced-motion: linha completa, sem parallax, tudo visível.
 */
export default function Cities() {
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const list = listRef.current;
      if (!list) return;

      // O traço da rota se desenha com o scroll.
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 72%",
            end: "bottom 58%",
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-city-row]", list).forEach((row) => {
        // Entrada dos elementos da parada.
        gsap.from(row.querySelectorAll("[data-reveal]"), {
          opacity: 0,
          y: 34,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: row, start: "top 78%" },
        });

        // Parallax sutil da foto (a imagem interna tem folga de escala).
        const img = row.querySelector("[data-parallax]");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        }
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="cidades" className="container-page py-20 sm:py-28">
      <SectionHeading
        eyebrow="A rota"
        title="Três paradas, uma viagem"
        description="Siga a linha do circuito: cada cidade é uma parada com história, arte e natureza no coração da Zona da Mata."
      />

      <div ref={listRef} className="relative mt-16 sm:mt-20">
        {/* Trilho da rota (fundo) */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[1.05rem] top-0 w-px bg-ink/10 dark:bg-white/10 lg:left-1/2 lg:-translate-x-1/2"
        />
        {/* Percurso já "viajado" — preenchido pelo scroll */}
        <div
          ref={fillRef}
          aria-hidden="true"
          style={{ transformOrigin: "top center" }}
          className="absolute bottom-0 left-[1.05rem] top-0 w-[3px] -translate-x-[1px] rounded-full bg-gradient-to-b from-brand-orange via-brand-orange to-brand-leaf lg:left-1/2 lg:-translate-x-1/2"
        />

        <div className="space-y-20 sm:space-y-28">
          {CITIES.map((city, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={city.name}
                data-city-row
                className="relative grid items-center gap-8 pl-12 lg:grid-cols-[1fr_5rem_1fr] lg:pl-0"
              >
                {/* Marcador da parada sobre a linha */}
                <span
                  aria-hidden="true"
                  className="absolute left-[1.05rem] top-3 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
                >
                  <span className="absolute h-5 w-5 rounded-full bg-brand-orange/25" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-brand-orange ring-4 ring-surface dark:ring-night" />
                </span>

                {/* Foto */}
                <div
                  data-reveal
                  className={`group relative lg:col-start-1 ${
                    flip ? "lg:col-start-3" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-card">
                    <div data-parallax className="absolute inset-[-8%]">
                      <Image
                        src={city.src}
                        alt={city.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 520px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    {/* véu inferior para ancorar a foto na página */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-darker/45 to-transparent"
                    />
                  </div>
                </div>

                {/* Texto */}
                <div
                  className={`relative lg:row-start-1 ${
                    flip ? "lg:col-start-1 lg:text-right" : "lg:col-start-3"
                  }`}
                >
                  {/* Número de parada gigante ao fundo */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-12 select-none font-display text-[6rem] italic leading-none text-brand-green/[0.08] dark:text-brand-leaf/[0.07] sm:text-[7.5rem] ${
                      flip ? "left-0" : "right-0"
                    }`}
                  >
                    {city.stop}
                  </span>

                  <div
                    data-reveal
                    className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange ${
                      flip ? "lg:justify-end" : ""
                    }`}
                  >
                    <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
                    Parada {city.stop}
                  </div>

                  <h3
                    data-reveal
                    className="mt-3 font-display text-3xl font-semibold tracking-[-0.01em] text-ink dark:text-white sm:text-4xl"
                  >
                    {city.name}
                  </h3>

                  <p
                    data-reveal
                    className={`mt-4 max-w-md leading-relaxed text-ink/70 dark:text-slate-300 ${
                      flip ? "lg:ml-auto" : ""
                    }`}
                  >
                    {city.text}
                  </p>

                  <div data-reveal className="mt-5">
                    <ModalTrigger
                      kind="coming-soon"
                      className="group/link inline-flex items-center gap-1.5 text-sm font-bold text-brand-green transition hover:gap-2.5 dark:text-brand-leaf"
                    >
                      Explorar no app
                      <ArrowRightIcon className="h-4 w-4 transition group-hover/link:translate-x-1" />
                    </ModalTrigger>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
