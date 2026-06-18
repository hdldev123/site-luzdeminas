import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Carousel from "./Carousel";
import { RouteIcon, MapPinIcon, QrIcon } from "./Icons";

const STEPS = [
  {
    icon: RouteIcon,
    title: "Escolha uma rota",
    text: "Selecione uma rota curada por cidade ou macrorregião e veja os marcos históricos no mapa.",
  },
  {
    icon: MapPinIcon,
    title: "Visite os marcos",
    text: "Caminhe até cada ponto e ouça a história no áudio-guia narrativo enquanto explora.",
  },
  {
    icon: QrIcon,
    title: "Escaneie o QR e ganhe conquistas",
    text: "Valide sua presença lendo o QR Code no local e desbloqueie medalhas a cada descoberta.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="container-page py-20 sm:py-24">
      <SectionHeading
        eyebrow="Simples assim"
        title="Como funciona"
        description="Três passos para transformar seu passeio numa jornada guiada e gamificada."
      />

      <ol className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal as="li" key={step.title} delay={i * 120}>
              <div className="relative h-full rounded-2xl bg-white p-7 shadow-card dark:bg-night-card dark:ring-1 dark:ring-white/10">
                <span className="absolute right-6 top-6 text-5xl font-black text-brand-blue/10 dark:text-brand-sky/20">
                  {i + 1}
                </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue dark:bg-brand-sky/10 dark:text-brand-sky">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/70 dark:text-slate-300">
                  {step.text}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ol>

      {/* Carrossel de telas do app */}
      <Reveal className="mt-20">
        <h3 className="text-center text-2xl font-extrabold tracking-tight text-ink dark:text-white sm:text-3xl">
          Veja o app em ação
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink/70 dark:text-slate-300">
          Um passeio pelas telas do Luz de Minas — das rotas guiadas às conquistas
          que você desbloqueia pelo caminho.
        </p>
        <div className="mt-10">
          <Carousel />
        </div>
      </Reveal>
    </section>
  );
}
