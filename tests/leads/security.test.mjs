import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes, createHash } from "node:crypto";
import {
  encrypt,
  decrypt,
  protocol,
  authenticate,
  secrets,
} from "../../src/server/leads/security.ts";
import { authorizeTransition } from "../../src/server/leads/repository.ts";
import { ticket, verifyTicket, readJson, handleLeadApi } from "../../src/server/leads/http.ts";
const key = randomBytes(32).toString("hex");
test("protocols are random 128-bit references, unique in a sample, not sequential", () => {
  const values = Array.from({ length: 2000 }, protocol);
  assert.equal(new Set(values).size, 2000);
  assert.ok(values.every((v) => /^ZURY-[A-F0-9]{32}$/.test(v)));
});
test("authenticated encryption rejects tampering, wrong key and wrong record context", () => {
  const data = { name: "Pessoa de teste", document: "52998224725" };
  const a = encrypt(data, key, "record-a");
  assert.notEqual(a, encrypt(data, key, "record-a"));
  assert.ok(!a.includes(data.name) && !a.includes(data.document));
  assert.deepEqual(decrypt(a, key, "record-a"), data);
  assert.throws(() => decrypt(a, key, "record-b"));
  assert.throws(() => decrypt(a, randomBytes(32).toString("hex"), "record-a"));
  const parts = a.split(".");
  parts[2] = Buffer.alloc(16).toString("base64url");
  assert.throws(() => decrypt(parts.join("."), key, "record-a"));
});
test("internal authentication fails closed and assigns roles only from server configuration", () => {
  const token = randomBytes(32).toString("base64url");
  const config = JSON.stringify([
    { id: "worker-01", role: "agent", tokenHash: createHash("sha256").update(token).digest("hex") },
  ]);
  assert.deepEqual(authenticate(`Bearer ${token}`, config), { id: "worker-01", role: "agent" });
  assert.throws(() => authenticate(null, config), { status: 401 });
  assert.throws(() => authenticate(`Bearer ${randomBytes(32).toString("base64url")}`, config), {
    status: 401,
  });
  assert.throws(() => authenticate(`Bearer ${token}`, "broken"), { status: 503 });
  assert.throws(() => secrets({}), { status: 503 });
});
test("agent cannot approve/send, and no role can skip human approval or reopen sent proposals", () => {
  const agent = { id: "agent", role: "agent" };
  const human = { id: "human", role: "reviewer" };
  assert.throws(() => authorizeTransition(agent, "aguardando_aprovacao", "aprovado"), {
    status: 403,
  });
  assert.throws(() => authorizeTransition(agent, "aprovado", "enviado"), { status: 403 });
  assert.throws(() => authorizeTransition(human, "recebido", "enviado"), { status: 403 });
  assert.throws(() => authorizeTransition(human, "enviado", "cotando"), { status: 403 });
  assert.doesNotThrow(() => authorizeTransition(human, "aguardando_aprovacao", "aprovado"));
});
test("submission tickets expire, cannot be forged and body size is bounded", async () => {
  const t = ticket(key, 1700000000000);
  assert.equal(verifyTicket(t, key, 1700000000001), true);
  assert.equal(verifyTicket(t, key, 1700001800000), false);
  assert.equal(verifyTicket(t.replace(/^./, "2"), key, 1700000000001), false);
  await assert.rejects(
    readJson(
      new Request("https://example.test", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ large: "x".repeat(17000) }),
      }),
    ),
    { status: 413 },
  );
});
test("API denies public reads, cross-origin and unauthenticated internal access; no database means no success", async () => {
  process.env.LEADS_ENABLED = "true";
  process.env.LEADS_RETENTION_DAYS = "30";
  process.env.APP_ORIGIN = "http://127.0.0.1:5173";
  process.env.LEADS_ENCRYPTION_KEY = key;
  process.env.LEADS_HASH_KEY = randomBytes(32).toString("hex");
  process.env.LEADS_SERVICE_ACCOUNTS = "[]";
  delete process.env.DATABASE_URL;
  const get = await handleLeadApi(new Request("http://127.0.0.1:5173/api/leads/ZURY-0123456789"));
  assert.equal(get.status, 404);
  const internal = await handleLeadApi(
    new Request("http://127.0.0.1:5173/api/internal/leads/12345678-1234-4234-8234-123456789012"),
  );
  assert.equal(internal.status, 401);
  const cross = await handleLeadApi(
    new Request("http://127.0.0.1:5173/api/leads/session", {
      method: "POST",
      headers: { origin: "https://evil.test" },
    }),
  );
  assert.equal(cross.status, 403);
  const query = await handleLeadApi(
    new Request("http://127.0.0.1:5173/api/leads?cpf=52998224725", { method: "POST" }),
  );
  assert.equal(query.status, 400);
  const { validSubmission } = await import("./submission-fixture.mjs");
  const csrf = ticket(process.env.LEADS_HASH_KEY);
  const failed = await handleLeadApi(
    new Request("http://127.0.0.1:5173/api/leads", {
      method: "POST",
      headers: {
        origin: process.env.APP_ORIGIN,
        "content-type": "application/json",
        "idempotency-key": crypto.randomUUID(),
        "x-quote-csrf": csrf,
        cookie: `zury_quote=${csrf}`,
      },
      body: JSON.stringify(validSubmission()),
    }),
  );
  assert.equal(failed.status, 503);
  assert.equal(failed.headers.get("cache-control"), "no-store");
  const body = await failed.text();
  assert.ok(!body.includes("52998224725"));
  assert.ok(!body.includes("persisted"));
});

test("authenticated agent cannot use the human approval API even if it supplies a reviewer role", async () => {
  const token = randomBytes(32).toString("base64url");
  process.env.LEADS_SERVICE_ACCOUNTS = JSON.stringify([
    {
      id: "agent-test",
      role: "agent",
      tokenHash: createHash("sha256").update(token).digest("hex"),
    },
  ]);
  const result = await handleLeadApi(
    new Request("http://127.0.0.1:5173/api/internal/leads/12345678-1234-4234-8234-123456789012", {
      method: "PATCH",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ version: 1, action: "approve", role: "reviewer" }),
    }),
  );
  assert.equal(result.status, 403);
});
