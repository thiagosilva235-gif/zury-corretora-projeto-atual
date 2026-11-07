import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID, randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { Pool } from "pg";
import { leadRepository } from "../../src/server/leads/repository.ts";
import { validateLead } from "../../src/server/leads/validation.ts";
import { validSubmission } from "./submission-fixture.mjs";

test(
  "PostgreSQL: real persistence, retries/concurrency, duplicates, rollback, encrypted data, approval invalidation",
  { skip: !process.env.TEST_DATABASE_URL },
  async () => {
    const connectionString = process.env.TEST_DATABASE_URL;
    const url = new URL(connectionString);
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    for (const key of ["sslmode", "sslcert", "sslkey", "sslrootcert"]) url.searchParams.delete(key);
    const pool = new Pool({
      connectionString: url.toString(),
      ssl: local ? false : { rejectUnauthorized: true },
      max: 4,
      connectionTimeoutMillis: 3000,
    });
    const schema = `lead_test_${randomBytes(8).toString("hex")}`;
    const owner = await pool.connect();
    const tx = async (work) => {
      const db = await pool.connect();
      try {
        await db.query("BEGIN");
        await db.query(`SET LOCAL search_path TO "${schema}"`);
        const result = await work(db);
        await db.query("COMMIT");
        return result;
      } catch (error) {
        await db.query("ROLLBACK");
        throw error;
      } finally {
        db.release();
      }
    };
    try {
      await owner.query(`CREATE SCHEMA "${schema}"`);
      await owner.query(`SET search_path TO "${schema}"`);
      await owner.query(
        await readFile(new URL("../../migrations/001_leads.sql", import.meta.url), "utf8"),
      );
      const repo = leadRepository(
        {
          encryptionKey: randomBytes(32).toString("hex"),
          hashKey: randomBytes(32).toString("hex"),
        },
        tx,
      );
      const lead = validateLead(validSubmission());
      const key = randomUUID();
      const [a, b] = await Promise.all([
        repo.create(lead, key, "test-ip"),
        repo.create(lead, key, "test-ip"),
      ]);
      assert.equal(a.protocol, b.protocol);
      assert.equal(a.persisted, true);
      const stored = await tx((db) => db.query("SELECT * FROM lead_requests"));
      assert.equal(stored.rowCount, 1);
      assert.ok(!stored.rows[0].encrypted_payload.includes("52998224725"));
      assert.equal(stored.rows[0].status, "recebido");
      await assert.rejects(repo.create(lead, randomUUID(), "test-ip"), { status: 409 });
      const changed = validateLead({
        ...validSubmission(),
        data: { ...validSubmission().data, name: "Outra pessoa" },
      });
      await assert.rejects(repo.create(changed, key, "test-ip"), { status: 409 });
      const id = stored.rows[0].id;
      const agent = { id: "agent", role: "agent" };
      const human = { id: "human", role: "reviewer" };
      const read = await repo.get(id, agent);
      assert.equal(read.data.document, "52998224725");
      await repo.update(id, agent, { version: 1, action: "status", status: "cotando" });
      await repo.update(id, agent, { version: 1, action: "result", result: "Resultado revisável" });
      await repo.update(id, agent, {
        version: 2,
        action: "status",
        status: "aguardando_aprovacao",
      });
      await assert.rejects(repo.update(id, agent, { version: 2, action: "approve" }), {
        status: 403,
      });
      await repo.update(id, human, { version: 2, action: "approve" });
      const approved = await repo.get(id, human);
      assert.equal(approved.approval.by, "human");
      await repo.update(id, agent, { version: 2, action: "update", data: validSubmission() }, lead);
      const revised = await repo.get(id, human);
      assert.equal(revised.status, "cotando");
      assert.equal(revised.approval, null);
      assert.equal(revised.version, 3);
      await assert.rejects(repo.update(id, human, { version: 2, action: "sent" }), { status: 409 });
      await assert.rejects(
        tx(async (db) => {
          await db.query(
            "UPDATE lead_requests SET status='aprovado',approved_by='agent',approved_version=version,approved_at=now() WHERE id=$1",
            [id],
          );
        }),
      );
      let transactionCount = 0;
      const rollbackRepo = leadRepository(
        {
          encryptionKey: randomBytes(32).toString("hex"),
          hashKey: randomBytes(32).toString("hex"),
        },
        async (work) =>
          tx(async (db) => {
            await work(db);
            transactionCount += 1;
            if (transactionCount === 2) throw new Error("forced rollback");
          }),
      );
      await assert.rejects(
        rollbackRepo.create(changed, randomUUID(), "rollback-ip"),
        /forced rollback/,
      );
      assert.equal(
        (await tx((db) => db.query("SELECT count(*) FROM lead_requests"))).rows[0].count,
        "1",
      );
    } finally {
      await owner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
      owner.release();
      await pool.end();
    }
  },
);

test("PostgreSQL connection refusal cannot be mistaken for persistence", async () => {
  const pool = new Pool({
    connectionString: "postgres://test:test@127.0.0.1:1/test",
    connectionTimeoutMillis: 200,
  });
  try {
    await assert.rejects(pool.connect());
  } finally {
    await pool.end();
  }
});
