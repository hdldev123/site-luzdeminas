import Reveal from "./Reveal";
import { AccessibilityIcon, TypeIcon, MoonIcon } from "./Icons";

export default function Accessibility() {
  return (
    <section
      id="acessibilidade"
      className="bg-white py-20 dark:bg-night-soft sm:py-24"
    >
      <div className="container-page">
        <Reveal>
          <div className="grid items-center gap-10 rounded-3xl bg-surface p-8 dark:bg-night-card dark:ring-1 dark:ring-white/10 sm:p-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue dark:bg-brand-sky/10 dark:text-brand-sky">
                <AccessibilityIcon className="h-7 w-7" />
              </span>
              <h2 className="mt-5 text-3xl font-extrabold text-ink dark:text-white sm:text-4xl">
                Acessibilidade de verdade
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/70 dark:text-slate-300">
                Cultura é para todo mundo. O Luz de Minas foi construído pensando
                em quem precisa de mais conforto visual — e você pode testar isso
                aqui mesmo, no menu do topo da página.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-card dark:bg-night-soft dark:ring-1 dark:ring-white/10">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/12 text-brand-orange">
                  <TypeIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-ink dark:text-white">
                  Tamanho de fonte ajustável
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70 dark:text-slate-300">
                  Aumente o texto com um toque, sem quebrar o layout, para uma
                  leitura confortável.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-card dark:bg-night-soft dark:ring-1 dark:ring-white/10">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/12 text-brand-orange">
                  <MoonIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-ink dark:text-white">
                  Modo escuro
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70 dark:text-slate-300">
                  Alterne para um tema escuro e descanse a vista, especialmente
                  em ambientes com pouca luz.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
