import Logo from "./Logo";
import { siteConfig } from "@/lib/config";
import { InstagramIcon } from "./Icons";
import ModalTrigger from "./ModalTrigger";

const SOCIAL = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
] as const;

export default function Footer() {
  return (
    <footer className="bg-brand-darker text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Turismo histórico e cultural da Zona da Mata mineira. Explore o
            Circuito Luz de Minas e descubra o modernismo brasileiro a cada passo.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIAL.map(({ key, label, Icon }) => (
              <a
                key={key}
                href={siteConfig.social[key]}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand-orange"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Institucional">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Institucional
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <ModalTrigger
                kind="privacy"
                className="text-left transition hover:text-brand-orange"
              >
                Política de Privacidade
              </ModalTrigger>
            </li>
            <li>
              <ModalTrigger
                kind="terms"
                className="text-left transition hover:text-brand-orange"
              >
                Termos de Uso
              </ModalTrigger>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Contato
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="transition hover:text-brand-orange"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="transition hover:text-brand-orange"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row">
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
