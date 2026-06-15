import StoreButtons from "./StoreButtons";
import Reveal from "./Reveal";
import { MapPinIcon } from "./Icons";

export default function FinalCTA() {
  return (
    <section id="baixar" className="container-page py-20 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-blue via-brand-dark to-brand-darker px-6 py-14 text-center text-white shadow-soft sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-orange/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-brand-blue/40 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold">
              <MapPinIcon className="h-4 w-4 text-brand-orange" />
              Circuito Luz de Minas
            </span>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              A história da Zona da Mata cabe no seu bolso
            </h2>
            <p className="mt-4 text-lg text-white/85">
              Baixe gratuitamente e comece a colecionar marcos, medalhas e
              memórias por Cataguases, Leopoldina e Piacatuba/Itamarati.
            </p>
            <div className="mt-9 flex justify-center">
              <StoreButtons variant="light" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
