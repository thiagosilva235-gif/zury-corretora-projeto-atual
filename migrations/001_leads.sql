CREATE TABLE lead_customers (
  id uuid PRIMARY KEY,
  document_hash char(64) NOT NULL UNIQUE,
  encrypted_profile text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE lead_products (
  id text PRIMARY KEY,
  area text NOT NULL,
  name text NOT NULL
);
CREATE TABLE lead_requests (
  id uuid PRIMARY KEY,
  protocol text NOT NULL UNIQUE CHECK (protocol ~ '^ZURY-[0-9A-F]{32}$'),
  customer_id uuid NOT NULL REFERENCES lead_customers(id),
  product_id text NOT NULL REFERENCES lead_products(id),
  encrypted_payload text NOT NULL,
  fingerprint char(64) NOT NULL,
  idempotency_hash char(64) NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'recebido' CHECK (status IN ('recebido','dados_pendentes','cotando','aguardando_aprovacao','aprovado','enviado')),
  version integer NOT NULL DEFAULT 1,
  missing_fields jsonb NOT NULL DEFAULT '[]'::jsonb,
  privacy_version text NOT NULL,
  consent_at timestamptz NOT NULL DEFAULT now(),
  legal_hold boolean NOT NULL DEFAULT false,
  approved_by text,
  approved_version integer,
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (status NOT IN ('aprovado','enviado') OR (approved_by IS NOT NULL AND approved_version = version AND approved_at IS NOT NULL))
);
CREATE INDEX lead_requests_dedup ON lead_requests(fingerprint, created_at DESC);
CREATE TABLE lead_events (
  id uuid PRIMARY KEY,
  request_id uuid NOT NULL REFERENCES lead_requests(id) ON DELETE CASCADE,
  actor_id text NOT NULL,
  actor_role text NOT NULL,
  action text NOT NULL,
  version integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE lead_results (
  id uuid PRIMARY KEY,
  request_id uuid NOT NULL REFERENCES lead_requests(id) ON DELETE CASCADE,
  version integer NOT NULL,
  encrypted_result text NOT NULL,
  actor_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE lead_rate_limits (
  bucket char(64) PRIMARY KEY,
  hits integer NOT NULL,
  expires_at timestamptz NOT NULL
);
CREATE FUNCTION guard_lead_approval() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.status IN ('aprovado','enviado') AND (
    current_setting('zury.actor_role',true) IS DISTINCT FROM 'reviewer'
  ) THEN RAISE EXCEPTION 'Human approval required'; END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER lead_approval_guard BEFORE INSERT OR UPDATE ON lead_requests
FOR EACH ROW EXECUTE FUNCTION guard_lead_approval();
REVOKE ALL ON lead_customers, lead_products, lead_requests, lead_events, lead_results, lead_rate_limits FROM PUBLIC;
