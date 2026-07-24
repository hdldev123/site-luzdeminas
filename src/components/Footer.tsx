import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { InstagramIcon } from "./Icons";
import ModalTrigger from "./ModalTrigger";

const SOCIAL = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-darker text-white/80">
      {/* Mesma matéria das outras superfícies escuras: grão + luz quente */}
      <div aria-hidden="true" className="grain-overlay absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 rounded-full bg-brand-orange/12 blur-3xl"
      />

      <div className="container-page relative">
        {/* Faixa editorial de abertura */}
        <div className="border-b border-white/10 py-14 sm:py-16">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">
            <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
            Rota Luz de Minas
          </span>
          <p className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-[-0.01em] text-white sm:text-4xl">
            Caminhos da Zona da Mata mineira,{" "}
            <span className="italic text-brand-orange">guardados em luz</span>.
          </p>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Image
              src="/logo.svg"
              alt="Luz de Minas"
              width={1440}
              height={810}
              className="h-16 w-auto sm:h-20"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Turismo histórico e cultural da Zona da Mata mineira. Explore a
              Rota Luz de Minas e descubra o modernismo brasileiro a cada passo.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={siteConfig.social[key]}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-brand-orange"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Institucional">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Institucional
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <ModalTrigger
                  kind="privacy"
                  className="text-left text-white/80 transition hover:text-brand-orange"
                >
                  Política de Privacidade
                </ModalTrigger>
              </li>
              <li>
                <ModalTrigger
                  kind="terms"
                  className="text-left text-white/80 transition hover:text-brand-orange"
                >
                  Termos de Uso
                </ModalTrigger>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Contato
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-white/80 transition hover:text-brand-orange"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="text-white/80 transition hover:text-brand-orange"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Luz de Minas. Todos os direitos
            reservados.
          </p>
          <p>Feito com orgulho mineiro · Zona da Mata, MG</p>
        </div>
      </div>
    </footer>
  );
}
