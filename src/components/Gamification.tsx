import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import AchievementsCard from "./AchievementsCard";
import { MedalIcon, QrIcon, CheckIcon } from "./Icons";

export default function Gamification() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark to-brand-darker py-20 text-white sm:py-24">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl"
        aria-hidden="true"
      />
      {/* Grão: mesma matéria do hero, costura as superfícies escuras */}
      <div aria-hidden="true" className="grain-overlay absolute inset-0" />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            invert
            eyebrow="Gamificação"
            title="Cada marco descoberto vira conquista"
            description="Transforme o passeio num jogo: escaneie QR Codes nos locais, valide sua presença e colecione medalhas que contam a sua jornada pela região."
          />

          <ul className="mt-8 space-y-4">
            {[
              {
                icon: QrIcon,
                text: "Coleta por QR Code com validação de presença no local.",
              },
              {
                icon: MedalIcon,
                text: "Medalhas e badges desbloqueáveis ao completar rotas.",
              },
              {
                icon: CheckIcon,
                text: "Progresso salvo: acompanhe quantos marcos faltam.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Reveal as="li" key={item.text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/20 text-brand-orange">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-white/85">{item.text}</span>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Reveal delay={120} className="relative">
          <AchievementsCard />
        </Reveal>
      </div>
    </section>
  );
}
