import test from "node:test";
import assert from "node:assert/strict";
import { validateLead, unfilledQuoteFields } from "../../src/server/leads/validation.ts";
import { validateUpdate } from "../../src/server/leads/http.ts";
import { quoteReceiptWhatsAppHref, saveQuote } from "../../src/lib/quote-submission.ts";
import { validSubmission } from "./submission-fixture.mjs";
test("server accepts optional complement/email but independently rejects invalid data, consent and unknown products", () => {
  assert.equal(validateLead(validSubmission()).data.complement, "");
  for (const data of [
    { document: "11111111111" },
    { phone: "123" },
    { email: "bad@" },
    { name: "1234" },
    { cep: "00000000" },
    { plate: "BAD" },
    { name: "a".repeat(121) },
    { solution: "Produto inventado" },
    { address: { street: "Rua", district: "", city: "Teste", state: "XX" } },
  ])
    assert.throws(
      () => validateLead({ ...validSubmission(), data: { ...validSubmission().data, ...data } }),
      { status: 422 },
    );
  assert.throws(() => validateLead({ ...validSubmission(), consent: false }), { status: 422 });
  assert.throws(() => validateLead({ ...validSubmission(), privacyVersion: "old" }), {
    status: 422,
  });
});
test("staff updates require version, action and bounded structured data", () => {
  for (const value of [
    { version: 0, action: "update" },
    { version: 1, action: "status", status: "aprovado" },
    { version: 1, action: "result", result: "" },
    { version: 1, action: "update" },
    { version: 1, action: "status", status: "cotando", missingFields: ["unknown"] },
  ])
    assert.throws(() => validateUpdate(value), { status: 422 });
});
test("WhatsApp URL contains only product and protocol, no document, name, address, phone or email", () => {
  const receipt = {
    product: "Automóveis",
    protocol: "ZURY-" + "A".repeat(32),
    persisted: true,
    status: "recebido",
  };
  const href = quoteReceiptWhatsAppHref("https://wa.me/5538999608455", receipt);
  const url = new URL(href);
  assert.equal(url.searchParams.size, 1);
  const message = url.searchParams.get("text");
  assert.ok(message.includes(receipt.product) && message.includes(receipt.protocol));
  for (const value of ["Pessoa de teste", "52998224725", "39400000", "120", "38999608455"])
    assert.ok(!message.includes(value));
});
test("client does not accept false persistence or open WhatsApp after API errors", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (url) =>
      url.endsWith("session")
        ? Response.json({ csrf: "test" })
        : Response.json({
            persisted: false,
            protocol: "ZURY-" + "A".repeat(32),
            product: "Automóveis",
            status: "recebido",
          });
    await assert.rejects(saveQuote(validSubmission(), crypto.randomUUID()), /não confirmou/);
    globalThis.fetch = async () =>
      Response.json({ message: "Serviço indisponível" }, { status: 503 });
    await assert.rejects(saveQuote(validSubmission(), crypto.randomUUID()), /indisponível/);
  } finally {
    globalThis.fetch = original;
  }
});

test("receipt enables a short handoff only after confirmed API persistence; informational gaps stay separate", async () => {
  const original = globalThis.fetch;
  const receipt = {
    persisted: true,
    status: "recebido",
    product: "Automóveis",
    protocol: "ZURY-" + "B".repeat(32),
  };
  const calls = [];
  try {
    globalThis.fetch = async (url, options) => {
      calls.push([url, options]);
      return Response.json(url.endsWith("session") ? { csrf: "test" } : receipt);
    };
    assert.deepEqual(await saveQuote(validSubmission(), crypto.randomUUID()), receipt);
    assert.equal(calls[1][0], "/api/leads");
    assert.ok(!calls.some(([url]) => url.includes("52998224725") || url.includes("wa.me")));
    assert.ok(unfilledQuoteFields(validateLead(validSubmission()).data).includes("city"));
  } finally {
    globalThis.fetch = original;
  }
});
