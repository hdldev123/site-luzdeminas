import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historia de Cataguases",
  description:
    "Experiencia digital interativa sobre a eletrificacao, o modernismo e o patrimonio de Cataguases, agora dentro do site Luz de Minas.",
  alternates: { canonical: "/historia" },
};

export default function HistoriaPage() {
  return (
    <main id="conteudo" className="min-h-screen bg-night">
      <h1 className="sr-only">Historia de Cataguases</h1>
      <Link
        href="/"
        aria-label="Voltar ao Rota Luz de Minas"
        className="fixed left-3 top-20 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-night/70 px-3 py-3 text-xs font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:bg-night/85 sm:left-4 sm:top-24"
      >
        <span aria-hidden="true" className="text-sm leading-none">←</span>
        <span className="hidden sm:inline">Voltar</span>
      </Link>
      <iframe
        title="Historia de Cataguases"
        src="/historia-cataguases/index.html"
        className="block h-[100dvh] w-full border-0"
      />
      <noscript>
        <p className="px-4 py-6 text-sm text-slate-200">
          Ative o JavaScript para carregar a experiencia completa ou acesse
          {" "}
          <a className="underline" href="/historia-cataguases/index.html">
            a versao estatica
          </a>
          .
        </p>
      </noscript>
    </main>
  );
}
