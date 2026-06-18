"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import AccessibilityControls from "./AccessibilityControls";
import { openModal } from "@/lib/modal";

const NAV = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#cidades", label: "Cidades" },
  { href: "#guia-local", label: "Guia Local" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-card backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:bg-night/90 dark:supports-[backdrop-filter]:bg-night/75"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#hero" aria-label="Luz de Minas — início">
          <Logo variant={scrolled ? "dark" : "light"} />
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition hover:text-brand-orange ${
                scrolled ? "text-ink dark:text-slate-200" : "text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className={`hidden md:block ${
              scrolled ? "text-ink dark:text-slate-200" : "text-white"
            }`}
          >
            <AccessibilityControls />
          </div>
          <button
            type="button"
            onClick={() => openModal("coming-soon")}
            aria-haspopup="dialog"
            className="hidden rounded-full bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-brand-orange-dark sm:inline-block"
          >
            Baixar o app
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label="Abrir menu"
            className={`lg:hidden ${
              scrolled ? "text-ink dark:text-slate-200" : "text-white"
            }`}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div
          id="menu-mobile"
          className="container-page lg:hidden"
        >
          <nav
            aria-label="Navegação mobile"
            className="mb-4 flex flex-col gap-1 rounded-2xl bg-white p-4 shadow-soft dark:bg-night-card dark:ring-1 dark:ring-white/10"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-surface dark:text-slate-200 dark:hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openModal("coming-soon");
              }}
              aria-haspopup="dialog"
              className="mt-2 rounded-full bg-brand-orange px-5 py-3 text-center font-bold text-white"
            >
              Baixar o app
            </button>
            <div className="mt-3 text-ink dark:text-slate-200">
              <AccessibilityControls compact />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
