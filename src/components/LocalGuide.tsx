import Reveal from "./Reveal";
import ModalTrigger from "./ModalTrigger";
import { TagIcon, MapPinIcon, WhatsAppIcon, ArrowRightIcon } from "./Icons";

const FOR_TOURISTS = [
  { icon: MapPinIcon, text: "Restaurantes, hotéis, farmácias e lojas com “Como Chegar”." },
  { icon: WhatsAppIcon, text: "Contato direto via WhatsApp com cada parceiro." },
  { icon: TagIcon, text: "Cupons de desconto exclusivos para quem explora o circuito." },
];

/** Kicker editorial: filete + label espaçado (consistente com o resto do site). */
function Kicker({ children, invert = false }: { children: string; invert?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
        invert ? "text-brand-orange" : "text-brand-green dark:text-brand-leaf"
      }`}
    >
      <span
        className={`h-px w-8 ${invert ? "bg-brand-orange" : "bg-brand-green/60 dark:bg-brand-leaf/60"}`}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

export default function LocalGuide() {
  return (
    <section id="guia-local" className="container-page py-20 sm:py-28">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Para turistas */}
        <Reveal>
          <div className="flex h-full flex-col rounded-[1.75rem] bg-white p-8 shadow-card dark:bg-night-card dark:ring-1 dark:ring-white/10 sm:p-10">
            <Kicker>Para turistas</Kicker>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.01em] text-ink dark:text-white sm:text-[2.1rem]">
              Guia Local com cupons de desconto
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70 dark:text-slate-300">
              Descubra onde comer, dormir e se virar na cidade — e ainda economize.
              O Guia Local conecta você aos melhores parceiros de cada destino.
            </p>
            <ul className="mt-7 space-y-3">
              {FOR_TOURISTS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-orange/12 text-brand-orange">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-ink/80 dark:text-slate-300">
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        {/* Para parceiros */}
        <Reveal delay={120}>
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand-dark to-brand-darker p-8 text-white shadow-soft sm:p-10">
            <div aria-hidden="true" className="grain-overlay absolute inset-0" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-orange/20 blur-3xl"
            />
            <div className="relative">
              <Kicker invert>Para o comércio local</Kicker>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.01em] sm:text-[2.1rem]">
                Seja um parceiro do Luz de Minas
              </h2>
              <p className="mt-4 leading-relaxed text-white/80">
                Coloque seu negócio no mapa do circuito, alcance turistas que já
                estão na sua cidade e atraia visitas com cupons. Cadastre seu
                restaurante, hotel, farmácia ou loja.
              </p>
            </div>
            <ModalTrigger
              kind="partner"
              className="group relative mt-9 inline-flex w-fit items-center gap-2 overflow-hidden rounded-full bg-brand-orange px-7 py-3.5 font-bold text-white shadow-[0_18px_40px_-14px_rgba(255,107,53,0.6)] transition hover:bg-brand-orange-dark"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Seja um parceiro</span>
              <ArrowRightIcon className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </ModalTrigger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
