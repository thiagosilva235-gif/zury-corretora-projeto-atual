import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { leadRepository } from "../../src/server/leads/repository.ts";
import { validateLead } from "../../src/server/leads/validation.ts";
import { validSubmission } from "./submission-fixture.mjs";

test("unit transaction boundary: a rejected duplicate cannot undo committed abuse accounting", async () => {
  const outcomes = [];
  let hits = 0;
  const transact = async (work) => {
    try {
      const value = await work({
        query: async (sql) => {
          if (sql.includes("INSERT INTO lead_rate_limits"))
            return { rows: [{ hits: ++hits }], rowCount: 1 };
          if (sql.includes("SELECT protocol,fingerprint")) return { rows: [], rowCount: 0 };
          if (sql.includes("SELECT 1 FROM lead_requests")) return { rows: [{}], rowCount: 1 };
          return { rows: [], rowCount: 0 };
        },
      });
      outcomes.push("commit");
      return value;
    } catch (error) {
      outcomes.push("rollback");
      throw error;
    }
  };
  const repo = leadRepository(
    { encryptionKey: randomBytes(32).toString("hex"), hashKey: randomBytes(32).toString("hex") },
    transact,
  );
  const lead = validateLead(validSubmission());
  for (let n = 0; n < 10; n++)
    await assert.rejects(repo.create(lead, randomUUID(), "ip"), { status: 409 });
  assert.deepEqual(outcomes.slice(0, 2), ["commit", "rollback"]);
  await assert.rejects(repo.create(lead, randomUUID(), "ip"), { status: 429 });
  assert.equal(hits, 11);
});
