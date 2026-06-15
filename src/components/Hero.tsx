import StoreButtons from "./StoreButtons";
import Placeholder from "./Placeholder";
import { MapPinIcon, CheckIcon } from "./Icons";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-brand-blue via-brand-dark to-brand-darker text-white"
    >
      {/* brilho decorativo */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand-orange/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-brand-blue/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative grid gap-12 pb-20 pt-28 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:pb-28 lg:pt-36">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
            <MapPinIcon className="h-4 w-4 text-brand-orange" />
            Circuito Luz de Minas
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Explore a história, a arquitetura e o{" "}
            <span className="text-brand-orange">modernismo</span> da Zona da Mata
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Rotas guiadas, áudio-guia narrativo e recompensas a cada marco que
            você descobre. Caminhe por Cataguases, Leopoldina e
            Piacatuba/Itamarati numa jornada cultural que cabe no seu bolso.
          </p>

          <div className="mt-8">
            <StoreButtons variant="light" />
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {[
              "Grátis para baixar",
              "Funciona em iOS e Android",
              "Conteúdo em português",
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckIcon className="h-4 w-4 text-brand-orange" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mockup do app */}
        <div className="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:150ms]">
          <div className="animate-float">
            <div className="mx-auto w-[260px] rounded-[2.5rem] border-[10px] border-black/80 bg-black shadow-2xl sm:w-[300px]">
              <Placeholder
                label="<<screenshot-hero>>"
                alt="Tela do app Luz de Minas mostrando uma rota guiada com marcos históricos"
                variant="screenshot"
                className="aspect-[9/19] rounded-[1.8rem]"
              />
            </div>
          </div>

          {/* card flutuante de conquista */}
          <div className="absolute -left-2 bottom-10 hidden rounded-2xl bg-white p-3 text-ink shadow-soft sm:block">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                <CheckIcon className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="text-xs font-bold">Marco coletado!</p>
                <p className="text-[0.7rem] text-ink/60">+1 medalha</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* onda de transição para o fundo claro */}
      <div className="h-12 bg-surface dark:bg-night [clip-path:ellipse(75%_100%_at_50%_100%)]" aria-hidden="true" />
    </section>
  );
}
