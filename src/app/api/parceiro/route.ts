import { NextResponse } from "next/server";
import {
  EMAIL_RE,
  MAX_EMAIL_LENGTH,
  appendCsv,
  clientIp,
  isRateLimited,
  sendToFormspree,
} from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Recebe os cadastros do modal "Seja um parceiro" (Guia Local).
 *
 * Destino (nesta ordem):
 * 1. `FORMSPREE_PARCEIRO_ENDPOINT` — se definida, envia ao Formspree.
 * 2. Fallback local: grava em `data/parceiros.csv`.
 *    Em hospedagem serverless o disco é efêmero — lá o Formspree é obrigatório.
 */

const CSV_ARQUIVO = "parceiros.csv";
const CSV_HEADER = "nome,email,telefone,mensagem,data\n";

/**
 * Mais restrito que a inscrição, mas ainda folgado: num evento vários
 * comerciantes podem se cadastrar pelo mesmo Wi-Fi, saindo pelo mesmo IP.
 */
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_JANELA_MS = 10 * 60 * 1000;

const LIMITES = {
  nome: 120,
  telefone: 32,
  mensagem: 2000,
};

const SUCESSO =
  "Cadastro recebido! Nossa equipe entra em contato em breve pelo e-mail informado.";

/** Extrai um campo de texto do corpo, já aparado. */
function texto(payload: Record<string, unknown> | null, campo: string) {
  const v = payload?.[campo];
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const payload = body as Record<string, unknown> | null;

  // Honeypot — bot: responde "sucesso" sem registrar nada.
  if (texto(payload, "_gotcha") !== "") {
    return NextResponse.json({ message: SUCESSO });
  }

  const nome = texto(payload, "nome");
  const email = texto(payload, "email").toLowerCase();
  const telefone = texto(payload, "telefone");
  const mensagem = texto(payload, "mensagem");

  if (nome.length < 2 || nome.length > LIMITES.nome) {
    return NextResponse.json(
      { error: "Informe o nome do seu negócio ou responsável." },
      { status: 400 }
    );
  }
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Digite um e-mail válido para continuar." },
      { status: 400 }
    );
  }
  // Aceita formatos variados; exige apenas dígitos suficientes para um contato.
  const digitos = telefone.replace(/\D/g, "");
  if (digitos.length < 10 || telefone.length > LIMITES.telefone) {
    return NextResponse.json(
      { error: "Informe um telefone com DDD." },
      { status: 400 }
    );
  }
  if (mensagem.length > LIMITES.mensagem) {
    return NextResponse.json(
      { error: "Mensagem muito longa. Resuma em até 2000 caracteres." },
      { status: 400 }
    );
  }

  // Só envios válidos contam para o rate limit: quem erra o preenchimento não
  // deve ficar travado. As tentativas inválidas param antes daqui, sem I/O.
  if (isRateLimited("parceiro", clientIp(req), RATE_LIMIT_MAX, RATE_LIMIT_JANELA_MS)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 }
    );
  }

  try {
    const endpoint = process.env.FORMSPREE_PARCEIRO_ENDPOINT;

    if (endpoint) {
      await sendToFormspree(endpoint, {
        nome,
        email,
        telefone,
        mensagem: mensagem || "(sem mensagem)",
        _subject: `Novo parceiro — ${nome}`,
        origem: "landing-guia-local",
      });
    } else {
      await appendCsv(CSV_ARQUIVO, CSV_HEADER, [
        nome,
        email,
        telefone,
        mensagem,
      ]);
    }

    return NextResponse.json({ message: SUCESSO });
  } catch (err) {
    console.error("[parceiro] falha ao registrar cadastro:", err);
    return NextResponse.json(
      { error: "Não foi possível concluir agora. Tente novamente." },
      { status: 500 }
    );
  }
}
