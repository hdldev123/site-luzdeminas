"use client";

import { useEffect, useState } from "react";
import { TypeIcon, MoonIcon, SunIcon } from "./Icons";

/**
 * Widget funcional de acessibilidade: ajuste de tamanho de fonte e modo escuro.
 * As preferências são aplicadas no <html> e persistidas no localStorage.
 * Não é só descrição — funciona de verdade na própria landing.
 */
const SCALES = [
  { label: "A", value: 1, title: "Fonte padrão" },
  { label: "A+", value: 1.12, title: "Fonte maior" },
  { label: "A++", value: 1.25, title: "Fonte ainda maior" },
];

export default function AccessibilityControls({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [scale, setScale] = useState(1);
  const [dark, setDark] = useState(false);

  // Restaura preferências salvas (ou segue a preferência do sistema no 1º acesso)
  useEffect(() => {
    const savedScale = Number(localStorage.getItem("ldm-font-scale"));
    if (savedScale) setScale(savedScale);

    const savedTheme = localStorage.getItem("ldm-theme");
    if (savedTheme) {
      setDark(savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDark(true);
    }
  }, []);

  // Aplica e persiste o tamanho da fonte
  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(scale));
    localStorage.setItem("ldm-font-scale", String(scale));
  }, [scale]);

  // Aplica e persiste o tema
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("ldm-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div
      className={`flex items-center gap-1.5 ${
        compact ? "" : "rounded-full bg-white/10 p-1 dark:bg-white/10"
      }`}
      role="group"
      aria-label="Opções de acessibilidade"
    >
      <span className="sr-only">Tamanho da fonte</span>
      <TypeIcon className="ml-1 h-4 w-4 text-current opacity-70" />
      {SCALES.map((s) => (
        <button
          key={s.value}
          type="button"
          onClick={() => setScale(s.value)}
          title={s.title}
          aria-pressed={scale === s.value}
          className={`min-w-[2rem] rounded-full px-2 py-1 text-xs font-bold transition ${
            scale === s.value
              ? "bg-brand-orange text-white"
              : "text-current hover:bg-white/20"
          }`}
        >
          {s.label}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setDark((v) => !v)}
        aria-pressed={dark}
        title={dark ? "Voltar ao modo claro" : "Ativar modo escuro"}
        className={`ml-1 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition ${
          dark
            ? "bg-brand-orange text-white"
            : "text-current hover:bg-white/20"
        }`}
      >
        {dark ? (
          <SunIcon className="h-4 w-4" />
        ) : (
          <MoonIcon className="h-4 w-4" />
        )}
        <span className="sr-only sm:not-sr-only">
          {dark ? "Claro" : "Escuro"}
        </span>
      </button>
    </div>
  );
}
