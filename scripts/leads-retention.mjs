import { database } from "../src/server/leads/database.ts";
// Run using a restricted maintenance role with DELETE permission; never via public API.
const days = Number(process.env["LEADS_RETENTION_DAYS"]);
if (!Number.isSafeInteger(days) || days < 1 || days > 9999)
  throw new Error("Define the approved LEADS_RETENTION_DAYS before running retention.");
const pool = database();
const db = await pool.connect();
try {
  await db.query("BEGIN");
  const count = await db.query(
    "SELECT count(*) FROM lead_requests WHERE legal_hold=false AND created_at < now()-($1::integer*interval '1 day')",
    [days],
  );
  console.log(
    `Eligible requests: ${count.rows[0].count}. ${process.argv.includes("--apply") ? "Applying retention." : "Dry run; pass --apply to delete."}`,
  );
  if (process.argv.includes("--apply")) {
    await db.query(
      "DELETE FROM lead_requests WHERE legal_hold=false AND created_at < now()-($1::integer*interval '1 day')",
      [days],
    );
    await db.query(
      "DELETE FROM lead_customers c WHERE NOT EXISTS(SELECT 1 FROM lead_requests r WHERE r.customer_id=c.id)",
    );
    await db.query("DELETE FROM lead_rate_limits WHERE expires_at<now()");
  }
  await db.query("COMMIT");
} catch {
  await db.query("ROLLBACK");
  console.error("Retention failed.");
  process.exitCode = 1;
} finally {
  db.release();
  await pool.end();
}
