import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { siteConfig } from "@/lib/config";
import { TagIcon, MapPinIcon, WhatsAppIcon, ArrowRightIcon } from "./Icons";

const FOR_TOURISTS = [
  { icon: MapPinIcon, text: "Restaurantes, hotéis, farmácias e lojas com “Como Chegar”." },
  { icon: WhatsAppIcon, text: "Contato direto via WhatsApp com cada parceiro." },
  { icon: TagIcon, text: "Cupons de desconto exclusivos para quem explora o circuito." },
];

export default function LocalGuide() {
  return (
    <section id="guia-local" className="container-page py-20 sm:py-24">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Para turistas */}
        <Reveal>
          <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-card dark:bg-night-card dark:ring-1 dark:ring-white/10 sm:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-1.5 text-sm font-bold text-brand-blue dark:bg-brand-sky/10 dark:text-brand-sky">
              <TagIcon className="h-4 w-4" />
              Para turistas
            </span>
            <h2 className="mt-5 text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">
              Guia Local com cupons de desconto
            </h2>
            <p className="mt-3 leading-relaxed text-ink/70 dark:text-slate-300">
              Descubra onde comer, dormir e se virar na cidade — e ainda economize.
              O Guia Local conecta você aos melhores parceiros de cada destino.
            </p>
            <ul className="mt-6 space-y-3">
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
          <div className="flex h-full flex-col justify-between rounded-3xl bg-gradient-to-br from-brand-blue to-brand-darker p-8 text-white shadow-soft sm:p-10">
            <div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold">
                Para o comércio local
              </span>
              <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">
                Seja um parceiro do Luz de Minas
              </h2>
              <p className="mt-3 leading-relaxed text-white/85">
                Coloque seu negócio no mapa do circuito, alcance turistas que já
                estão na sua cidade e atraia visitas com cupons. Cadastre seu
                restaurante, hotel, farmácia ou loja.
              </p>
            </div>
            <a
              href={siteConfig.links.partnerForm}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand-orange px-6 py-3.5 font-bold text-white shadow-soft transition hover:bg-brand-orange-dark"
            >
              Seja um parceiro
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
