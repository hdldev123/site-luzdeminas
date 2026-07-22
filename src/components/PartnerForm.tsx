"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

/** Validação leve no cliente — a validação de verdade acontece na API. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const CAMPO =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/40 disabled:opacity-60 dark:border-white/15 dark:bg-night-soft dark:text-slate-100 dark:placeholder:text-slate-500";

const ROTULO = "block text-sm font-semibold text-ink/70 dark:text-slate-300";

/**
 * Cadastro de parceiros do Guia Local (nome, e-mail, telefone e mensagem).
 * Exibido no modal aberto pelo botão "Seja um parceiro".
 */
export default function PartnerForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [gotcha, setGotcha] = useState(""); // honeypot anti-spam
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const loading = status === "loading";

  function limparErro() {
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  }

  function falhar(texto: string) {
    setStatus("error");
    setMessage(texto);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const dados = {
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
      mensagem: mensagem.trim(),
    };

    if (dados.nome.length < 2) {
      return falhar("Informe o nome do seu negócio ou responsável.");
    }
    if (!EMAIL_RE.test(dados.email)) {
      return falhar("Digite um e-mail válido para continuar.");
    }
    if (dados.telefone.replace(/\D/g, "").length < 10) {
      return falhar("Informe um telefone com DDD.");
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/parceiro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, _gotcha: gotcha }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        return falhar(
          data.error ?? "Não foi possível concluir agora. Tente novamente."
        );
      }

      setStatus("success");
      setMessage(data.message ?? "Cadastro recebido!");
      setNome("");
      setEmail("");
      setTelefone("");
      setMensagem("");
    } catch {
      falhar(
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
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot: invisível para pessoas, atrativo para bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="parceiro-gotcha">Não preencha este campo</label>
        <input
          id="parceiro-gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={gotcha}
          onChange={(e) => setGotcha(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="parceiro-nome" className={ROTULO}>
          Nome do negócio ou responsável
        </label>
        <input
          id="parceiro-nome"
          name="nome"
          type="text"
          autoComplete="organization"
          required
          placeholder="Ex.: Restaurante Sabor de Minas"
          value={nome}
          disabled={loading}
          onChange={(e) => {
            setNome(e.target.value);
            limparErro();
          }}
          className={`mt-1.5 ${CAMPO}`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="parceiro-email" className={ROTULO}>
            E-mail
          </label>
          <input
            id="parceiro-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="contato@seunegocio.com"
            value={email}
            disabled={loading}
            onChange={(e) => {
              setEmail(e.target.value);
              limparErro();
            }}
            className={`mt-1.5 ${CAMPO}`}
          />
        </div>

        <div>
          <label htmlFor="parceiro-telefone" className={ROTULO}>
            Telefone / WhatsApp
          </label>
          <input
            id="parceiro-telefone"
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="(32) 99999-9999"
            value={telefone}
            disabled={loading}
            onChange={(e) => {
              setTelefone(e.target.value);
              limparErro();
            }}
            className={`mt-1.5 ${CAMPO}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="parceiro-mensagem" className={ROTULO}>
          Mensagem{" "}
          <span className="font-normal text-ink/45 dark:text-slate-500">
            (opcional)
          </span>
        </label>
        <textarea
          id="parceiro-mensagem"
          name="mensagem"
          rows={4}
          maxLength={2000}
          placeholder="Conte um pouco sobre seu negócio, a cidade e o que gostaria de oferecer aos turistas."
          value={mensagem}
          disabled={loading}
          onChange={(e) => {
            setMensagem(e.target.value);
            limparErro();
          }}
          className={`mt-1.5 resize-y ${CAMPO}`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand-orange px-6 py-3 font-bold text-white shadow-soft transition hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Enviando…" : "Enviar cadastro"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`text-sm ${
          status === "error"
            ? "font-semibold text-brand-orange"
            : "text-ink/55 dark:text-slate-400"
        }`}
      >
        {status === "error"
          ? message
          : "Usamos seus dados apenas para entrar em contato sobre a parceria."}
      </p>
    </form>
  );
}
