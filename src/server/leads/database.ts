import { Pool, type PoolClient } from "pg";
import { LeadError } from "./security.ts";
let pool: Pool | undefined;
export function database(env = process.env) {
  const connectionString = env["DATABASE_URL"];
  if (!connectionString)
    throw new LeadError(
      503,
      "unavailable",
      "Captação temporariamente indisponível. Seus dados foram preservados no formulário.",
    );
  if (!pool) {
    const url = new URL(connectionString);
    if (!["postgres:", "postgresql:"].includes(url.protocol))
      throw new Error("Invalid database configuration");
    // Enforce certificate verification remotely. Never accept sslmode=no-verify.
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (
      url.searchParams.has("sslmode") &&
      !["verify-full", "require"].includes(url.searchParams.get("sslmode")!) &&
      !local
    )
      throw new Error("Verified TLS required");
    for (const key of ["sslmode", "sslcert", "sslkey", "sslrootcert"]) url.searchParams.delete(key);
    pool = new Pool({
      connectionString: url.toString(),
      max: 3,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 10000,
      statement_timeout: 8000,
      query_timeout: 10000,
      ssl: local
        ? false
        : {
            rejectUnauthorized: true,
            ...(env["DATABASE_CA_CERT"] ? { ca: env["DATABASE_CA_CERT"] } : {}),
          },
    });
    pool.on("error", () => console.error("lead_database_pool_error"));
  }
  return pool;
}
export type Transaction = <T>(work: (db: PoolClient) => Promise<T>) => Promise<T>;
export const transaction: Transaction = async (work) => {
  const client = await database().connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
};
