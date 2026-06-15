import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Placeholder from "./Placeholder";
import { MedalIcon, QrIcon, CheckIcon } from "./Icons";

const BADGES = [
  "Explorador Modernista",
  "Caminhante da Mata",
  "Guardião do Patrimônio",
  "Rota Completa",
];

export default function Gamification() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark to-brand-darker py-20 text-white sm:py-24">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl"
        aria-hidden="true"
      />
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
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="font-bold">Suas conquistas</p>
              <span className="rounded-full bg-brand-orange px-3 py-1 text-xs font-bold">
                12 / 20 marcos
              </span>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-4">
              {BADGES.map((badge, i) => (
                <div key={badge} className="flex flex-col items-center gap-2 text-center">
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${
                      i < 3
                        ? "border-brand-orange bg-brand-orange/15 text-brand-orange"
                        : "border-white/20 bg-white/5 text-white/30"
                    }`}
                  >
                    <MedalIcon className="h-8 w-8" />
                  </span>
                  <span className="text-[0.65rem] leading-tight text-white/70">
                    {badge}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="h-2 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[60%] rounded-full bg-brand-orange" />
              </div>
              <p className="mt-2 text-xs text-white/60">
                Faltam 8 marcos para concluir o Circuito Luz de Minas
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
              <Placeholder
                label="<<qr-marco>>"
                alt="QR Code de validação de um marco histórico"
                variant="screenshot"
                className="h-16 w-16 shrink-0 rounded-xl"
              />
              <div className="text-sm">
                <p className="font-semibold">Escaneie para coletar</p>
                <p className="text-white/60">Estação Ferroviária · Cataguases</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
