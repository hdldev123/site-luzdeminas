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
    text: "Roteiros organizados por macrorregião e cidade, com marcos históricos geolocalizados no mapa — a espinha dorsal de toda a experiência.",
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
    text: "Ajuste de tamanho de fonte e ajustes de acessibilidade nativos para todo mundo aproveitar o passeio.",
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

        {/* Grid assimétrico: o primeiro recurso é o card-líder, escuro e
            maior — quebra a uniformidade de template. */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            const lead = i === 0;
            return (
              <Reveal
                key={feature.title}
                delay={(i % 3) * 100}
                className={lead ? "sm:col-span-2" : ""}
              >
                {lead ? (
                  <article className="relative h-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-brand-dark to-brand-darker p-8 text-white shadow-soft sm:p-10">
                    <div aria-hidden="true" className="grain-overlay absolute inset-0" />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-orange/20 blur-3xl"
                    />
                    <div className="relative">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange text-white">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">
                        {feature.title}
                      </h3>
                      <p className="mt-3 max-w-lg leading-relaxed text-white/80">
                        {feature.text}
                      </p>
                    </div>
                  </article>
                ) : (
                  <article className="group h-full rounded-[1.5rem] border border-transparent bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-green/20 hover:shadow-card dark:border-white/10 dark:bg-night-card dark:hover:border-brand-leaf/30">
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
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
