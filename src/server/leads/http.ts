import { randomBytes, timingSafeEqual } from "node:crypto";
import { authenticate, fingerprint, LeadError, secrets } from "./security.ts";
import { leadRepository, statuses, type LeadUpdate } from "./repository.ts";
import { validateLead } from "./validation.ts";
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const response = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      ...headers,
    },
  });
export async function readJson(request: Request) {
  if (!(request.headers.get("content-type") ?? "").match(/^application\/json(?:;|$)/i))
    throw new LeadError(415, "content_type", "Use JSON.");
  if (Number(request.headers.get("content-length")) > 16384)
    throw new LeadError(413, "too_large", "Solicitação muito grande.");
  const reader = request.body?.getReader();
  if (!reader) throw new LeadError(400, "invalid_json", "Solicitação inválida.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.length;
      if (size > 16384) {
        await reader.cancel();
        throw new LeadError(413, "too_large", "Solicitação muito grande.");
      }
      chunks.push(chunk.value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } catch (error) {
    if (error instanceof LeadError) throw error;
    throw new LeadError(400, "invalid_json", "JSON inválido.");
  } finally {
    reader.releaseLock();
  }
}
function checkOrigin(request: Request) {
  const expected = process.env["APP_ORIGIN"];
  if (
    process.env["LEADS_ENABLED"] !== "true" ||
    !/^[1-9][0-9]{0,3}$/.test(process.env["LEADS_RETENTION_DAYS"] ?? "")
  )
    throw new LeadError(
      503,
      "unavailable",
      "Captação ainda não ativada. Seus dados continuam no formulário.",
    );
  if (!expected) throw new LeadError(503, "unavailable", "Captação temporariamente indisponível.");
  if (
    new URL(expected).origin !== expected ||
    (!expected.startsWith("https://") &&
      !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(expected))
  )
    throw new Error("Invalid origin configuration");
  if (
    request.headers.get("origin") !== expected ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    throw new LeadError(403, "origin", "Origem não permitida.");
}
export function ticket(hashKey: string, now = Date.now()) {
  const value = `${now}.${randomBytes(24).toString("base64url")}`;
  return `${value}.${fingerprint(`session:${value}`, hashKey)}`;
}
export function verifyTicket(value: string, hashKey: string, now = Date.now()) {
  const parts = value.split(".");
  if (
    parts.length !== 3 ||
    !/^\d{13}$/.test(parts[0]!) ||
    !/^[A-Za-z0-9_-]{32}$/.test(parts[1]!) ||
    !/^[a-f0-9]{64}$/.test(parts[2]!)
  )
    return false;
  const age = now - Number(parts[0]);
  return (
    age >= 0 &&
    age < 1800000 &&
    timingSafeEqual(
      Buffer.from(parts[2]!),
      Buffer.from(fingerprint(`session:${parts[0]}.${parts[1]}`, hashKey)),
    )
  );
}
function checkSession(request: Request, key: string) {
  const csrf = request.headers.get("x-quote-csrf") ?? "";
  const cookie = /(?:^|;\s*)zury_quote=([^;]+)/.exec(request.headers.get("cookie") ?? "")?.[1];
  if (!cookie || csrf !== cookie || !verifyTicket(csrf, key))
    throw new LeadError(403, "session", "Atualize a sessão e tente novamente.");
}
function abuseKey(request: Request) {
  // Never trust a public x-forwarded-for automatically. Vercel overwrites its own header.
  const header = process.env["VERCEL"]
    ? "x-vercel-forwarded-for"
    : process.env["LEADS_TRUSTED_IP_HEADER"];
  const ip = header ? request.headers.get(header)?.split(",")[0]?.trim() : undefined;
  return `create:${ip && /^[a-f0-9:.]{3,64}$/i.test(ip) ? ip : "shared-unconfigured-proxy"}`;
}
export function validateUpdate(input: unknown): LeadUpdate {
  if (!input || typeof input !== "object")
    throw new LeadError(422, "invalid", "Atualização inválida.");
  const u = input as LeadUpdate;
  if (
    !Number.isSafeInteger(u.version) ||
    u.version < 1 ||
    !["update", "result", "status", "approve", "sent"].includes(u.action)
  )
    throw new LeadError(422, "invalid", "Atualização inválida.");
  if (
    u.action === "status" &&
    (!statuses.includes(u.status!) || ["aprovado", "enviado"].includes(u.status!))
  )
    throw new LeadError(422, "invalid", "Use a ação de aprovação humana.");
  if (
    u.action === "result" &&
    (typeof u.result !== "string" || !u.result.trim() || u.result.length > 4000)
  )
    throw new LeadError(422, "invalid", "Resultado inválido.");
  const fields = [
    "name",
    "document",
    "phone",
    "email",
    "cep",
    "number",
    "complement",
    "plate",
    "street",
    "district",
    "city",
    "state",
  ];
  if (
    u.missingFields !== undefined &&
    (!Array.isArray(u.missingFields) ||
      u.missingFields.length > fields.length ||
      u.missingFields.some((x) => !fields.includes(x)))
  )
    throw new LeadError(422, "invalid", "Campos pendentes inválidos.");
  if (u.action === "update" && !u.data)
    throw new LeadError(422, "invalid", "Informe os dados revisados.");
  return {
    version: u.version,
    action: u.action,
    ...(u.status ? { status: u.status } : {}),
    ...(u.result ? { result: u.result } : {}),
    ...(u.missingFields ? { missingFields: [...new Set(u.missingFields)] } : {}),
    ...(u.data ? { data: u.data } : {}),
  };
}
/** Server entry dispatch; no public GET of a quote, even with a valid protocol. */
export async function handleLeadApi(request: Request): Promise<Response> {
  try {
    const path = new URL(request.url).pathname;
    if (new URL(request.url).search)
      throw new LeadError(400, "query_not_allowed", "Parâmetros de URL não são permitidos.");
    if (path === "/api/leads/session" && request.method === "POST") {
      checkOrigin(request);
      const value = ticket(secrets().hashKey);
      const secure = process.env["APP_ORIGIN"]?.startsWith("https://") ? "; Secure" : "";
      return response({ csrf: value }, 200, {
        "Set-Cookie": `zury_quote=${value}; Path=/api/leads; HttpOnly; SameSite=Strict; Max-Age=1800${secure}`,
      });
    }
    if (path === "/api/leads" && request.method === "POST") {
      checkOrigin(request);
      const keys = secrets();
      checkSession(request, keys.hashKey);
      const key = request.headers.get("idempotency-key") ?? "";
      if (!uuid.test(key))
        throw new LeadError(422, "invalid", "Identificador de tentativa inválido.");
      const lead = validateLead(await readJson(request));
      const receipt = await leadRepository(keys).create(lead, key, abuseKey(request));
      return response(receipt, 201);
    }
    const match = /^\/api\/internal\/leads\/([a-f0-9-]+)$/i.exec(path);
    if (match && ["GET", "PATCH"].includes(request.method)) {
      const actor = authenticate(request.headers.get("authorization"));
      if (!uuid.test(match[1]!))
        throw new LeadError(404, "not_found", "Solicitação não encontrada.");
      if (request.method === "GET")
        return response(await leadRepository(secrets()).get(match[1]!, actor));
      const update = validateUpdate(await readJson(request));
      if (["approve", "sent"].includes(update.action) && actor.role !== "reviewer")
        throw new LeadError(403, "forbidden", "Aprovação humana obrigatória.");
      const revised = update.action === "update" ? validateLead(update.data) : undefined;
      return response(await leadRepository(secrets()).update(match[1]!, actor, update, revised));
    }
    return response({ error: "not_found", message: "Recurso não disponível." }, 404);
  } catch (error) {
    if (error instanceof LeadError)
      return response(
        { error: error.code, message: error.message },
        error.status,
        error.status === 429 ? { "Retry-After": "60" } : {},
      );
    // Do not log input, URLs, connection strings, SQL parameters, tokens or decrypted data.
    console.error("lead_api_unavailable");
    return response(
      {
        error: "unavailable",
        message:
          "Não foi possível salvar a cotação. Seus dados continuam no formulário; tente novamente.",
      },
      503,
    );
  }
}
