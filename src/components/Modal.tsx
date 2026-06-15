"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** largura máxima do diálogo */
  size?: "sm" | "lg";
};

/**
 * Diálogo modal acessível e reutilizável.
 * - role="dialog" + aria-modal, rótulo via aria-labelledby
 * - fecha com ESC, clique no overlay e botão de fechar
 * - trava o scroll do body e devolve o foco ao fechar
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "sm",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // Move o foco para o painel ao abrir
    requestAnimationFrame(() => panelRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* overlay */}
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-sm"
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative w-full overflow-hidden rounded-2xl bg-white text-ink shadow-soft outline-none dark:bg-night-card dark:text-slate-200 dark:ring-1 dark:ring-white/10 ${
          size === "lg" ? "max-w-2xl" : "max-w-md"
        } animate-fade-up`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/5 px-6 py-4 dark:border-white/10">
          <h2 id="modal-title" className="text-lg font-bold dark:text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="-mr-1 rounded-full p-1.5 text-ink/60 transition hover:bg-black/5 dark:text-slate-400 dark:hover:bg-white/10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div
          className={`px-6 py-5 ${
            size === "lg" ? "max-h-[70vh] overflow-y-auto" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
