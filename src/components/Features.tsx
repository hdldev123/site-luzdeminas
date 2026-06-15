import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import {
  RouteIcon,
  AudioIcon,
  QrIcon,
  MedalIcon,
  TagIcon,
  HeartPulseIcon,
  AccessibilityIcon,
} from "./Icons";

const FEATURES = [
  {
    icon: RouteIcon,
    title: "Rotas turísticas curadas",
    text: "Roteiros organizados por macrorregião e cidade, com marcos históricos geolocalizados no mapa.",
  },
  {
    icon: AudioIcon,
    title: "Áudio-guia narrativo",
    text: "A história de cada marco contada em áudio enquanto você caminha — como ter um guia no bolso.",
  },
  {
    icon: QrIcon,
    title: "Colete marcos via QR Code",
    text: "Gamificação com validação de presença: você precisa estar lá de verdade para registrar o marco.",
  },
  {
    icon: MedalIcon,
    title: "Conquistas e medalhas",
    text: "Desbloqueie badges ao completar rotas e descobrir novos pontos. Colecione sua jornada.",
  },
  {
    icon: TagIcon,
    title: "Guia Local com cupons",
    text: "Restaurantes, hotéis, farmácias e lojas parceiras com “Como Chegar”, WhatsApp e descontos.",
  },
  {
    icon: HeartPulseIcon,
    title: "Rotas de saúde",
    text: "Percursos de caminhada e corrida por cidade, que abrem o trajeto direto no seu app de mapas.",
  },
  {
    icon: AccessibilityIcon,
    title: "Acessibilidade de verdade",
    text: "Ajuste de tamanho de fonte e modo de alto contraste para todo mundo aproveitar o passeio.",
  },
];

export default function Features() {
  return (
    <section
      id="funcionalidades"
      className="bg-white py-20 dark:bg-night-soft sm:py-24"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Tudo num só app"
          title="Funcionalidades pensadas para explorar"
          description="Do primeiro marco à última medalha, cada recurso aproxima você da história viva da Zona da Mata."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={(i % 3) * 100}>
                <article className="group h-full rounded-2xl border border-transparent bg-surface p-7 transition hover:border-brand-blue/20 hover:shadow-card dark:border-white/10 dark:bg-night-card dark:hover:border-brand-sky/30">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/12 text-brand-orange transition group-hover:bg-brand-orange group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70 dark:text-slate-300">
                    {feature.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
