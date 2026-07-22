import { NextResponse } from "next/server";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Recebe as inscrições de e-mail do modal "Chegando muito em breve".
 *
 * Destino do e-mail (nesta ordem):
 * 1. `FORMSPREE_ENDPOINT` — se definida, a inscrição é enviada ao Formspree.
 *    Aceita a URL completa (`https://formspree.io/f/abcdwxyz`) ou só o ID do
 *    formulário (`abcdwxyz`).
 * 2. Fallback local: grava em `data/inscricoes.csv` na raiz do projeto.
 *    Funciona em dev e em servidor próprio; em hospedagem serverless (Vercel,
 *    Netlify) o disco é efêmero — nesse caso o Formspree é obrigatório.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LENGTH = 254;

const CSV_PATH = path.join(process.cwd(), "data", "inscricoes.csv");
const CSV_HEADER = "email,data,origem\n";

/* Rate limit simples em memória: 5 envios por IP a cada 10 minutos. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "desconhecido";
}

async function saveToCsv(email: string, origem: string) {
  await mkdir(path.dirname(CSV_PATH), { recursive: true });

  // Evita duplicar o mesmo e-mail no arquivo.
  const existing = await readFile(CSV_PATH, "utf8").catch(() => "");
  if (existing.includes(`${email},`)) return { duplicated: true };

  const header = existing ? "" : CSV_HEADER;
  await appendFile(
    CSV_PATH,
    `${header}${email},${new Date().toISOString()},${origem}\n`,
    "utf8"
  );
  return { duplicated: false };
}

/** Aceita a URL completa ou apenas o ID do formulário Formspree. */
function formspreeUrl(value: string) {
  const v = value.trim();
  return v.startsWith("http") ? v : `https://formspree.io/f/${v}`;
}

/** Extrai a mensagem de erro do formato de resposta do Formspree. */
function formspreeError(data: unknown, status: number) {
  const d = data as {
    error?: string;
    errors?: Array<{ message?: string; field?: string }>;
  } | null;
  const fromList = d?.errors?.map((e) => e.message).filter(Boolean).join("; ");
  return fromList || d?.error || `Formspree respondeu ${status}`;
}

async function sendToFormspree(endpoint: string, email: string, origem: string) {
  const res = await fetch(formspreeUrl(endpoint), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      // `email` é campo especial do Formspree (vira o reply-to da notificação).
      email,
      // `_subject` define o assunto do e-mail de notificação.
      _subject: "Nova inscrição — Luz de Minas",
      origem,
      data: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(formspreeError(data, res.status));
  }
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Requisição inválida." },
      { status: 400 }
    );
  }

  const payload = body as { email?: unknown; _gotcha?: unknown } | null;

  // Honeypot: campo invisível no formulário. Se veio preenchido, é bot —
  // respondemos "sucesso" sem registrar nada.
  if (typeof payload?._gotcha === "string" && payload._gotcha.trim() !== "") {
    return NextResponse.json({
      message: "Pronto! Avisaremos você assim que o app for lançado.",
    });
  }

  const raw = payload?.email;
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Digite um e-mail válido para continuar." },
      { status: 400 }
    );
  }

  const origem = "landing-modal";

  try {
    const endpoint = process.env.FORMSPREE_ENDPOINT;

    if (endpoint) {
      await sendToFormspree(endpoint, email, origem);
    } else {
      const { duplicated } = await saveToCsv(email, origem);
      if (duplicated) {
        return NextResponse.json({
          message: "Este e-mail já está na lista. Avisaremos no lançamento!",
        });
      }
    }

    return NextResponse.json({
      message: "Pronto! Avisaremos você assim que o app for lançado.",
    });
  } catch (err) {
    console.error("[inscrever] falha ao registrar e-mail:", err);
    return NextResponse.json(
      { error: "Não foi possível concluir agora. Tente novamente." },
      { status: 500 }
    );
  }
}
