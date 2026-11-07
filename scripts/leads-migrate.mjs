import { readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { database } from "../src/server/leads/database.ts";

// Use a distinct migration-owner credential; runtime never needs DDL permission.
if (!process.env["DATABASE_MIGRATION_URL"])
  throw new Error("Configure DATABASE_MIGRATION_URL (server only).");
process.env["DATABASE_URL"] = process.env["DATABASE_MIGRATION_URL"];
const pool = database();
const db = await pool.connect();
try {
  await db.query("BEGIN");
  await db.query("SELECT pg_advisory_xact_lock(793174062)");
  await db.query(
    "CREATE TABLE IF NOT EXISTS zury_migrations(name text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())",
  );
  const files = (await readdir(new URL("../migrations/", import.meta.url)))
    .filter((f) => /^\d+_.+\.sql$/.test(f))
    .sort();
  for (const file of files) {
    const sql = await readFile(new URL(`../migrations/${file}`, import.meta.url), "utf8");
    const checksum = createHash("sha256").update(sql).digest("hex");
    const existing = await db.query("SELECT checksum FROM zury_migrations WHERE name=$1", [file]);
    if (existing.rowCount) {
      if (existing.rows[0].checksum !== checksum)
        throw new Error("Migration checksum changed; create a new migration instead.");
      continue;
    }
    await db.query(sql);
    await db.query("INSERT INTO zury_migrations(name,checksum) VALUES($1,$2)", [file, checksum]);
  }
  await db.query("COMMIT");
  console.log("Lead migrations applied.");
} catch {
  await db.query("ROLLBACK");
  console.error("Migration failed; no credentials or SQL parameters logged.");
  process.exitCode = 1;
} finally {
  db.release();
  await pool.end();
}
