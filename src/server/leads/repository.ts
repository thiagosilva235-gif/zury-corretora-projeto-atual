import { randomUUID } from "node:crypto";
import { transaction, type Transaction } from "./database.ts";
import {
  encrypt,
  decrypt,
  fingerprint,
  protocol,
  LeadError,
  type Actor,
  type LeadSecrets,
} from "./security.ts";
import { unfilledQuoteFields, type ValidLead } from "./validation.ts";

export const statuses = [
  "recebido",
  "dados_pendentes",
  "cotando",
  "aguardando_aprovacao",
  "aprovado",
  "enviado",
] as const;
export type Status = (typeof statuses)[number];
export type LeadUpdate = {
  version: number;
  action: "update" | "result" | "status" | "approve" | "sent";
  data?: unknown;
  result?: string;
  status?: Status;
  missingFields?: string[];
};
export function authorizeTransition(actor: Actor, from: Status, to: Status) {
  const allowed: Record<Status, readonly Status[]> = {
    recebido: ["dados_pendentes", "cotando"],
    dados_pendentes: ["cotando"],
    cotando: ["dados_pendentes", "aguardando_aprovacao"],
    aguardando_aprovacao: ["cotando", "dados_pendentes", "aprovado"],
    aprovado: ["cotando", "enviado"],
    enviado: [],
  };
  if (
    !allowed[from]?.includes(to) ||
    (["aprovado", "enviado"].includes(to) && actor.role !== "reviewer")
  )
    throw new LeadError(
      403,
      "forbidden",
      "Transição não permitida. Aprovação humana é obrigatória antes do envio.",
    );
}
export function leadRepository(keys: LeadSecrets, transact: Transaction = transaction) {
  const event = async (
    db: import("pg").PoolClient,
    id: string,
    actor: Actor | { id: string; role: "public" },
    action: string,
    version: number,
  ) => {
    await db.query(
      "INSERT INTO lead_events(id,request_id,actor_id,actor_role,action,version) VALUES($1,$2,$3,$4,$5,$6)",
      [randomUUID(), id, actor.id, actor.role, action, version],
    );
  };
  return {
    async create(lead: ValidLead, idempotencyKey: string, abuseKey: string) {
      await transact(async (db) => {
        // Commit abuse accounting separately, so duplicates/failed lead writes cannot reset the limit.
        const bucket = fingerprint(abuseKey, keys.hashKey);
        const rate = await db.query(
          `INSERT INTO lead_rate_limits(bucket,hits,expires_at) VALUES($1,1,now()+interval '1 minute')
          ON CONFLICT(bucket) DO UPDATE SET hits=CASE WHEN lead_rate_limits.expires_at<now() THEN 1 ELSE lead_rate_limits.hits+1 END,
          expires_at=CASE WHEN lead_rate_limits.expires_at<now() THEN now()+interval '1 minute' ELSE lead_rate_limits.expires_at END RETURNING hits`,
          [bucket],
        );
        if (rate.rows[0].hits > 10)
          throw new LeadError(
            429,
            "rate_limited",
            "Muitas tentativas. Aguarde um minuto e tente novamente.",
          );
      });
      return transact(async (db) => {
        const hash = fingerprint(JSON.stringify(lead), keys.hashKey);
        const idem = fingerprint(idempotencyKey, keys.hashKey);
        // Same-content attempts serialize across processes; same idempotency also locks across content changes.
        for (const key of [hash, idem].sort())
          await db.query("SELECT pg_advisory_xact_lock(hashtextextended($1,0))", [key]);
        const retry = await db.query(
          "SELECT protocol,fingerprint FROM lead_requests WHERE idempotency_hash=$1",
          [idem],
        );
        if (retry.rows[0]) {
          if (retry.rows[0].fingerprint !== hash)
            throw new LeadError(
              409,
              "idempotency_conflict",
              "A tentativa mudou. Revise os dados e tente novamente.",
            );
          return {
            protocol: retry.rows[0].protocol as string,
            product: lead.data.solution,
            status: "recebido" as const,
            persisted: true as const,
          };
        }
        const duplicate = await db.query(
          "SELECT 1 FROM lead_requests WHERE fingerprint=$1 AND created_at>now()-interval '24 hours' LIMIT 1",
          [hash],
        );
        if (duplicate.rowCount)
          throw new LeadError(
            409,
            "duplicate",
            "Uma solicitação igual já foi registrada recentemente. Entre em contato com a ZURY se precisar de ajuda.",
          );
        const customerId = randomUUID();
        const customer = await db.query(
          `INSERT INTO lead_customers(id,document_hash,encrypted_profile) VALUES($1,$2,$3)
          ON CONFLICT(document_hash) DO UPDATE SET document_hash=EXCLUDED.document_hash RETURNING id`,
          [
            customerId,
            fingerprint(lead.data.document, keys.hashKey),
            encrypt(lead.data, keys.encryptionKey, customerId),
          ],
        );
        await db.query(
          "INSERT INTO lead_products(id,area,name) VALUES($1,$2,$3) ON CONFLICT(id) DO UPDATE SET area=EXCLUDED.area,name=EXCLUDED.name",
          [lead.productId, lead.data.area, lead.data.solution],
        );
        const id = randomUUID();
        const reference = protocol();
        await db.query(
          `INSERT INTO lead_requests(id,protocol,customer_id,product_id,encrypted_payload,fingerprint,idempotency_hash,privacy_version)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
          [
            id,
            reference,
            customer.rows[0].id,
            lead.productId,
            encrypt(lead.data, keys.encryptionKey, id),
            hash,
            idem,
            lead.privacyVersion,
          ],
        );
        await event(db, id, { id: "public-form", role: "public" }, "created", 1);
        return {
          protocol: reference,
          product: lead.data.solution,
          status: "recebido" as const,
          persisted: true as const,
        };
      });
    },
    async get(id: string, actor: Actor) {
      return transact(async (db) => {
        const result = await db.query("SELECT * FROM lead_requests WHERE id=$1 FOR UPDATE", [id]);
        const row = result.rows[0];
        if (!row) throw new LeadError(404, "not_found", "Solicitação não encontrada.");
        const results = await db.query(
          "SELECT id,version,encrypted_result,created_at FROM lead_results WHERE request_id=$1 ORDER BY created_at",
          [id],
        );
        await event(db, id, actor, "read", row.version);
        return {
          id,
          protocol: row.protocol,
          status: row.status,
          version: row.version,
          missingFields: row.missing_fields,
          data: decrypt(row.encrypted_payload, keys.encryptionKey, id),
          unfilledFields: unfilledQuoteFields(
            decrypt(row.encrypted_payload, keys.encryptionKey, id) as ValidLead["data"],
          ),
          results: results.rows.map((r) => ({
            id: r.id,
            version: r.version,
            createdAt: r.created_at,
            result: decrypt(r.encrypted_result, keys.encryptionKey, r.id),
          })),
          approval: row.approved_by
            ? { by: row.approved_by, at: row.approved_at, version: row.approved_version }
            : null,
        };
      });
    },
    async update(id: string, actor: Actor, update: LeadUpdate, revised?: ValidLead) {
      return transact(async (db) => {
        await db.query(
          "SELECT set_config('zury.actor_role',$1,true),set_config('zury.actor_id',$2,true)",
          [actor.role, actor.id],
        );
        const selected = await db.query("SELECT * FROM lead_requests WHERE id=$1 FOR UPDATE", [id]);
        const row = selected.rows[0];
        if (!row) throw new LeadError(404, "not_found", "Solicitação não encontrada.");
        if (row.version !== update.version)
          throw new LeadError(
            409,
            "version_conflict",
            "A solicitação foi alterada. Consulte a versão atual.",
          );
        if (row.status === "enviado")
          throw new LeadError(
            409,
            "closed",
            "Solicitação enviada não pode ser alterada neste fluxo.",
          );
        let status: Status = row.status;
        const contentChanged = ["update", "result"].includes(update.action);
        const version = row.version + (contentChanged ? 1 : 0);
        if (contentChanged) status = update.missingFields?.length ? "dados_pendentes" : "cotando";
        else {
          status =
            update.action === "approve"
              ? "aprovado"
              : update.action === "sent"
                ? "enviado"
                : update.status!;
          authorizeTransition(actor, row.status, status);
        }
        if (status === "aguardando_aprovacao" || status === "aprovado") {
          const result = await db.query(
            "SELECT 1 FROM lead_results WHERE request_id=$1 AND version=$2 LIMIT 1",
            [id, version],
          );
          if (!result.rowCount || (update.missingFields ?? row.missing_fields).length)
            throw new LeadError(
              409,
              "not_ready",
              "Registre um resultado e resolva os dados pendentes antes da aprovação.",
            );
        }
        let customerId = row.customer_id;
        if (revised) {
          if (revised.productId !== row.product_id)
            throw new LeadError(422, "invalid", "O produto não pode ser alterado neste fluxo.");
          const profileId = randomUUID();
          const customer = await db.query(
            `INSERT INTO lead_customers(id,document_hash,encrypted_profile) VALUES($1,$2,$3)
             ON CONFLICT(document_hash) DO UPDATE SET document_hash=EXCLUDED.document_hash RETURNING id`,
            [
              profileId,
              fingerprint(revised.data.document, keys.hashKey),
              encrypt(revised.data, keys.encryptionKey, profileId),
            ],
          );
          customerId = customer.rows[0].id;
        }
        if (update.action === "result") {
          const resultId = randomUUID();
          await db.query(
            "INSERT INTO lead_results(id,request_id,version,encrypted_result,actor_id) VALUES($1,$2,$3,$4,$5)",
            [resultId, id, version, encrypt(update.result, keys.encryptionKey, resultId), actor.id],
          );
        }
        const approving = status === "aprovado";
        const invalidated = contentChanged || !["aprovado", "enviado"].includes(status);
        const approvedBy = invalidated ? null : approving ? actor.id : row.approved_by;
        const approvedVersion = invalidated ? null : approving ? version : row.approved_version;
        await db.query(
          `UPDATE lead_requests SET status=$2,version=$3,missing_fields=$4::jsonb,approved_by=$5,approved_version=$6,
          approved_at=CASE WHEN $5::text IS NULL THEN NULL WHEN $7::boolean THEN now() ELSE approved_at END,updated_at=now(),encrypted_payload=$8,customer_id=$9 WHERE id=$1`,
          [
            id,
            status,
            version,
            JSON.stringify(update.missingFields ?? row.missing_fields),
            approvedBy,
            approvedVersion,
            approving,
            revised ? encrypt(revised.data, keys.encryptionKey, id) : row.encrypted_payload,
            customerId,
          ],
        );
        await event(db, id, actor, update.action, version);
        return { id, status, version };
      });
    },
  };
}
