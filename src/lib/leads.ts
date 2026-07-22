import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Utilitários compartilhados pelas rotas que recebem dados de formulário
 * (`/api/inscrever` e `/api/parceiro`): validação, rate limit, envio ao
 * Formspree e fallback em CSV local.
 *
 * Só use no servidor — depende de `node:fs`.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MAX_EMAIL_LENGTH = 254;

/* ------------------------------------------------------------------ */
/* Rate limit simples em memória, isolado por rota                     */
/* ------------------------------------------------------------------ */

const buckets = new Map<string, Map<string, number[]>>();

export function isRateLimited(
  rota: string,
  ip: string,
  max: number,
  janelaMs: number
) {
  let porIp = buckets.get(rota);
  if (!porIp) {
    porIp = new Map();
    buckets.set(rota, porIp);
  }
  const agora = Date.now();
  const recentes = (porIp.get(ip) ?? []).filter((t) => agora - t < janelaMs);
  recentes.push(agora);
  porIp.set(ip, recentes);
  return recentes.length > max;
}

export function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "desconhecido";
}

/* ------------------------------------------------------------------ */
/* Formspree                                                           */
/* ------------------------------------------------------------------ */

/** Aceita a URL completa ou apenas o ID do formulário Formspree. */
export function formspreeUrl(value: string) {
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

/**
 * Envia um payload ao Formspree. Campos especiais reconhecidos por ele:
 * `email` (vira o reply-to da notificação) e `_subject` (assunto).
 */
export async function sendToFormspree(
  endpoint: string,
  payload: Record<string, unknown>
) {
  const res = await fetch(formspreeUrl(endpoint), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...payload, data: new Date().toISOString() }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(formspreeError(data, res.status));
  }
}

/* ------------------------------------------------------------------ */
/* Fallback local em CSV                                               */
/* ------------------------------------------------------------------ */

/** Escapa um valor para CSV (aspas, vírgulas e quebras de linha). */
export function csvCell(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

/**
 * Acrescenta uma linha ao CSV em `data/<arquivo>`, criando o cabeçalho na
 * primeira gravação. Com `dedupe`, ignora a linha se o termo já existir.
 */
export async function appendCsv(
  arquivo: string,
  header: string,
  colunas: string[],
  dedupe?: string
) {
  const caminho = path.join(process.cwd(), "data", arquivo);
  await mkdir(path.dirname(caminho), { recursive: true });

  const existente = await readFile(caminho, "utf8").catch(() => "");
  if (dedupe && existente.includes(csvCell(dedupe))) {
    return { duplicado: true };
  }

  const linha = [...colunas, new Date().toISOString()].map(csvCell).join(",");
  await appendFile(caminho, `${existente ? "" : header}${linha}\n`, "utf8");
  return { duplicado: false };
}
