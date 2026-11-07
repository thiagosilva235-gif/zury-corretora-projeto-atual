import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
  timingSafeEqual,
  createHash,
} from "node:crypto";

export class LeadError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
export type Actor = { id: string; role: "agent" | "reviewer" };
export type LeadSecrets = { encryptionKey: string; hashKey: string };
export function secrets(env = process.env): LeadSecrets {
  const encryptionKey = env["LEADS_ENCRYPTION_KEY"] ?? "";
  const hashKey = env["LEADS_HASH_KEY"] ?? "";
  if (
    !/^[a-f0-9]{64}$/i.test(encryptionKey) ||
    !/^[a-f0-9]{64}$/i.test(hashKey) ||
    encryptionKey === hashKey
  )
    throw new LeadError(503, "unavailable", "Captação temporariamente indisponível.");
  return { encryptionKey, hashKey };
}
export function fingerprint(value: string, key: string) {
  return createHmac("sha256", Buffer.from(key, "hex")).update(value).digest("hex");
}
export function encrypt(value: unknown, key: string, context: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", Buffer.from(key, "hex"), iv);
  cipher.setAAD(Buffer.from(context));
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  return [
    "v1",
    iv.toString("base64url"),
    cipher.getAuthTag().toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
}
export function decrypt(value: string, key: string, context: string): unknown {
  const [version, iv, tag, ciphertext] = value.split(".");
  if (version !== "v1" || !iv || !tag || !ciphertext) throw new Error("Invalid encrypted envelope");
  const cipher = createDecipheriv(
    "aes-256-gcm",
    Buffer.from(key, "hex"),
    Buffer.from(iv, "base64url"),
  );
  cipher.setAAD(Buffer.from(context));
  cipher.setAuthTag(Buffer.from(tag, "base64url"));
  return JSON.parse(
    Buffer.concat([cipher.update(Buffer.from(ciphertext, "base64url")), cipher.final()]).toString(
      "utf8",
    ),
  );
}
export function protocol() {
  return `ZURY-${randomBytes(16).toString("hex").toUpperCase()}`;
}
export function authenticate(
  header: string | null,
  rawConfig = process.env["LEADS_SERVICE_ACCOUNTS"],
): Actor {
  if (!rawConfig) throw new LeadError(503, "unavailable", "Acesso interno não configurado.");
  const token = /^Bearer ([A-Za-z0-9_-]{43,})$/.exec(header ?? "")?.[1];
  if (!token) throw new LeadError(401, "unauthorized", "Autenticação necessária.");
  let accounts: unknown;
  try {
    accounts = JSON.parse(rawConfig);
  } catch {
    throw new LeadError(503, "unavailable", "Acesso interno não configurado.");
  }
  if (!Array.isArray(accounts) || accounts.length > 20)
    throw new LeadError(503, "unavailable", "Acesso interno não configurado.");
  const digest = createHash("sha256").update(token).digest();
  for (const account of accounts) {
    if (
      typeof account?.tokenHash === "string" &&
      /^[a-f0-9]{64}$/i.test(account.tokenHash) &&
      timingSafeEqual(digest, Buffer.from(account.tokenHash, "hex")) &&
      /^[a-zA-Z0-9_-]{1,64}$/.test(account.id) &&
      ["agent", "reviewer"].includes(account.role)
    )
      return { id: account.id, role: account.role };
  }
  throw new LeadError(401, "unauthorized", "Autenticação necessária.");
}
