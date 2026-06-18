"use client";

import { openModal } from "@/lib/modal";

type StoreButtonsProps = {
  /** "light" usa botões claros (bom sobre o azul); "dark" usa botões escuros */
  variant?: "light" | "dark";
  className?: string;
  /**
   * Quando true (padrão), os botões abrem o popup "em breve".
   * Use false para exibir apenas como ilustração (ex.: dentro do próprio modal).
   */
  interactive?: boolean;
};

function AppleGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.7c0-2 1.6-3 1.7-3.1-.9-1.3-2.3-1.5-2.8-1.5-1.2-.1-2.3.7-2.9.7-.6 0-1.5-.7-2.5-.7-1.3 0-2.5.7-3.1 1.9-1.3 2.3-.3 5.7.9 7.6.6.9 1.4 1.9 2.3 1.9.9 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6 1 0 1.6-.9 2.2-1.8.7-1 1-2 1-2-.1 0-1.9-.8-1.9-2.6ZM14.6 5.5c.5-.6.9-1.5.8-2.4-.8 0-1.7.5-2.3 1.2-.5.5-.9 1.4-.8 2.3.9 0 1.7-.5 2.3-1.1Z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.6 2.6 13 12l-9.4 9.4c-.4-.2-.6-.6-.6-1.1V3.7c0-.5.2-.9.6-1.1Z" fill="#34A853" />
      <path d="M16.8 8.8 13 12l3.8 3.2 3.4-1.9c.7-.4.7-1.4 0-1.8l-3.4-1.7Z" fill="#FBBC04" />
      <path d="m13 12-9.4 9.4c.4.3 1 .3 1.5 0l11.7-6.6L13 12Z" fill="#EA4335" />
      <path d="M3.6 2.6 13 12l3.8-3.2L5.1 2.2c-.5-.3-1.1-.3-1.5.4Z" fill="#4285F4" />
    </svg>
  );
}

export default function StoreButtons({
  variant = "dark",
  className = "",
  interactive = true,
}: StoreButtonsProps) {
  const styles =
    variant === "light"
      ? "bg-white text-brand-darker hover:bg-white/90"
      : "bg-brand-darker text-white hover:bg-black";

  const base = `flex items-center gap-3 rounded-xl px-5 py-3 font-semibold shadow-soft transition ${styles}`;

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <button
        type="button"
        onClick={interactive ? () => openModal("coming-soon") : undefined}
        aria-haspopup={interactive ? "dialog" : undefined}
        aria-disabled={interactive ? undefined : true}
        tabIndex={interactive ? 0 : -1}
        className={`${base} text-left ${interactive ? "" : "cursor-default"}`}
        aria-label="Baixar na App Store — em breve"
      >
        <AppleGlyph />
        <span className="flex flex-col leading-tight">
          <span className="text-[0.65rem] font-medium opacity-70">Baixe na</span>
          <span className="text-base">App Store</span>
        </span>
      </button>
      <button
        type="button"
        onClick={interactive ? () => openModal("coming-soon") : undefined}
        aria-haspopup={interactive ? "dialog" : undefined}
        aria-disabled={interactive ? undefined : true}
        tabIndex={interactive ? 0 : -1}
        className={`${base} text-left ${interactive ? "" : "cursor-default"}`}
        aria-label="Baixar no Google Play — em breve"
      >
        <PlayGlyph />
        <span className="flex flex-col leading-tight">
          <span className="text-[0.65rem] font-medium opacity-70">
            Disponível no
          </span>
          <span className="text-base">Google Play</span>
        </span>
      </button>
    </div>
  );
}
