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
 * Recebe as inscrições de e-mail do modal "Chegando muito em breve".
 *
 * Destino do e-mail (nesta ordem):
 * 1. `FORMSPREE_ENDPOINT` — se definida, envia ao Formspree. Aceita a URL
 *    completa (`https://formspree.io/f/abcdwxyz`) ou só o ID (`abcdwxyz`).
 * 2. Fallback local: grava em `data/inscricoes.csv` na raiz do projeto.
 *    Funciona em dev e em servidor próprio; em hospedagem serverless (Vercel,
 *    Netlify) o disco é efêmero — nesse caso o Formspree é obrigatório.
 */

const CSV_ARQUIVO = "inscricoes.csv";
const CSV_HEADER = "email,cidade,origem,data\n";

const MAX_CIDADE = 80;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_JANELA_MS = 10 * 60 * 1000;

const SUCESSO = "Pronto! Avisaremos você assim que o app for lançado.";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const payload = body as
    | { email?: unknown; cidade?: unknown; _gotcha?: unknown }
    | null;

  // Honeypot: campo invisível no formulário. Se veio preenchido, é bot —
  // respondemos "sucesso" sem registrar nada.
  if (typeof payload?._gotcha === "string" && payload._gotcha.trim() !== "") {
    return NextResponse.json({ message: SUCESSO });
  }

  const raw = payload?.email;
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  const cidade =
    typeof payload?.cidade === "string" ? payload.cidade.trim() : "";

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Digite um e-mail válido para continuar." },
      { status: 400 }
    );
  }
  if (cidade.length < 2 || cidade.length > MAX_CIDADE) {
    return NextResponse.json(
      { error: "Informe a sua cidade." },
      { status: 400 }
    );
  }

  const origem = "landing-modal";

  // Só envios válidos contam para o rate limit: quem digita o e-mail errado
  // não deve ficar travado. As tentativas inválidas param antes daqui, sem I/O.
  if (isRateLimited("inscrever", clientIp(req), RATE_LIMIT_MAX, RATE_LIMIT_JANELA_MS)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 }
    );
  }

  try {
    const endpoint = process.env.FORMSPREE_ENDPOINT;

    if (endpoint) {
      await sendToFormspree(endpoint, {
        email,
        cidade,
        _subject: `Nova inscrição — ${cidade}`,
        origem,
      });
    } else {
      const { duplicado } = await appendCsv(
        CSV_ARQUIVO,
        CSV_HEADER,
        [email, cidade, origem],
        email
      );
      if (duplicado) {
        return NextResponse.json({
          message: "Este e-mail já está na lista. Avisaremos no lançamento!",
        });
      }
    }

    return NextResponse.json({ message: SUCESSO });
  } catch (err) {
    console.error("[inscrever] falha ao registrar e-mail:", err);
    return NextResponse.json(
      { error: "Não foi possível concluir agora. Tente novamente." },
      { status: 500 }
    );
  }
}
