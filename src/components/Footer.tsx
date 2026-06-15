import Logo from "./Logo";
import { siteConfig } from "@/lib/config";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./Icons";

const SOCIAL = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
] as const;

export default function Footer() {
  return (
    <footer className="bg-brand-darker text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
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
              <a href={siteConfig.legal.privacy} className="hover:text-brand-orange">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href={siteConfig.legal.terms} className="hover:text-brand-orange">
                Termos de Uso
              </a>
            </li>
            <li>
              <a href={siteConfig.legal.contact} className="hover:text-brand-orange">
                Contato
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Realização e parceiros
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {siteConfig.partners.map((partner) => (
              <li key={partner.name}>
                <a href={partner.url} className="hover:text-brand-orange">
                  {partner.name}
                </a>
              </li>
            ))}
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
