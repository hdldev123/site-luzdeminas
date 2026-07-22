"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

/** Validação leve no cliente — a validação de verdade acontece na API. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Captura de e-mails para avisar sobre o lançamento do app.
 * Substitui os botões das lojas dentro do modal "Chegando muito em breve".
 */
export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [gotcha, setGotcha] = useState(""); // honeypot anti-spam
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const loading = status === "loading";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("Digite um e-mail válido para continuar.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/inscrever", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, _gotcha: gotcha }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setMessage(
          data.error ?? "Não foi possível concluir agora. Tente novamente."
        );
        return;
      }

      setStatus("success");
      setMessage(
        data.message ?? "Pronto! Avisaremos você assim que o app for lançado."
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(
        "Falha de conexão. Verifique sua internet e tente novamente em instantes."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-xl bg-brand-orange/10 p-4 text-sm font-semibold text-ink dark:text-slate-100"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
          className="mt-px shrink-0 text-brand-orange"
        >
          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot: invisível para pessoas, atrativo para bots. Fora da ordem
          de tabulação e escondido de leitores de tela. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="inscricao-gotcha">Não preencha este campo</label>
        <input
          id="inscricao-gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={gotcha}
          onChange={(e) => setGotcha(e.target.value)}
        />
      </div>

      <label
        htmlFor="inscricao-email"
        className="block text-sm font-semibold text-ink/70 dark:text-slate-300"
      >
        Deixe seu e-mail e avisamos no lançamento:
      </label>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id="inscricao-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="seu@email.com"
          value={email}
          disabled={loading}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          aria-invalid={status === "error" || undefined}
          aria-describedby="inscricao-feedback"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/40 disabled:opacity-60 dark:border-white/15 dark:bg-night-soft dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 rounded-xl bg-brand-orange px-6 py-3 font-bold text-white shadow-soft transition hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Enviando…" : "Inscrever-se"}
        </button>
      </div>

      <p
        id="inscricao-feedback"
        role="status"
        aria-live="polite"
        className={`mt-2 text-sm ${
          status === "error"
            ? "font-semibold text-brand-orange"
            : "text-ink/55 dark:text-slate-400"
        }`}
      >
        {status === "error"
          ? message
          : "Usamos seu e-mail só para avisar do lançamento. Sem spam."}
      </p>
    </form>
  );
}
