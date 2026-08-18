"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AccessibilityControls from "./AccessibilityControls";
import { openModal } from "@/lib/modal";
import { ArrowRightIcon } from "./Icons";

type NavItem = { href: string; label: string; external?: boolean };

const NAV: NavItem[] = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#cidades", label: "Cidades" },
  { href: "#guia-local", label: "Guia Local" },
  { href: "/historia", label: "História" },
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
          ? "border-b border-black/5 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:border-white/10 dark:bg-night/85 dark:supports-[backdrop-filter]:bg-night/70"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex min-h-16 items-center justify-between gap-4 py-2">
        <a href="#hero" aria-label="Luz de Minas — início">
          <Image
            src="/logo.svg"
            alt="Luz de Minas"
            width={1440}
            height={810}
            priority
            className="h-20 w-auto sm:h-24"
          />
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`group relative text-sm font-semibold transition hover:text-brand-orange ${
                scrolled ? "text-ink dark:text-slate-200" : "text-white"
              }`}
            >
              {item.label}
              {/* filete que cresce da esquerda no hover */}
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-orange transition-transform duration-300 group-hover:scale-x-100"
              />
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
            className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-brand-orange-dark sm:inline-flex"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            <span className="relative">Inscreva-se</span>
            <ArrowRightIcon className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
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
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-surface dark:text-slate-200 dark:hover:bg-white/5"
              >
                {item.label}
                {item.external && (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                    className="text-ink/40 dark:text-slate-500"
                  >
                    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
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
              Inscreva-se
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
