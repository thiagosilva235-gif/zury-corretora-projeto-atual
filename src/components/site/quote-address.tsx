import { useCallback, useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { isValidCep, onlyDigits, type QuoteCustomer } from "@/lib/quote-form.mjs";

const emptyAddress = { street: "", district: "", city: "", state: "" };
const addressFields = [
  { key: "street", label: "Logradouro", autoComplete: "address-line1", max: 120 },
  { key: "district", label: "Bairro", autoComplete: "address-level3", max: 80 },
  { key: "city", label: "Cidade", autoComplete: "address-level2", max: 80 },
  { key: "state", label: "UF", autoComplete: "address-level1", max: 2 },
] as const;

/** Completing a CEP looks up its address; manual fields remain usable on failure. */
export function QuoteAddress({
  customer,
  setCustomer,
}: {
  customer: QuoteCustomer;
  setCustomer: Dispatch<SetStateAction<QuoteCustomer>>;
}) {
  const request = useRef<AbortController | null>(null);
  const scheduled = useRef<number | undefined>(undefined);
  const addressBefore = useRef(customer.address);
  const cep = onlyDigits(customer.cep);
  useEffect(() => () => request.current?.abort(), [cep]);
  useEffect(() => {
    addressBefore.current = customer.address;
  }, [customer.address]);

  const search = useCallback(
    async (cep: string, previousAddress: QuoteCustomer["address"]) => {
      window.clearTimeout(scheduled.current);
      if (!isValidCep(cep)) return;
      request.current?.abort();
      const controller = new AbortController();
      request.current = controller;
      const timeout = window.setTimeout(() => controller.abort("timeout"), 8000);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
          signal: controller.signal,
          credentials: "omit",
          referrerPolicy: "no-referrer",
        });
        if (!response.ok) throw new Error("unavailable");
        const data: unknown = await response.json();
        if (controller.signal.aborted) return;
        if (!data || typeof data !== "object") throw new Error("unavailable");
        if ("erro" in data && data.erro) {
          return;
        }
        const record = data as Record<string, unknown>;
        const text = (key: string, max: number) =>
          typeof record[key] === "string" ? record[key].slice(0, max) : "";
        if (
          onlyDigits(text("cep", 9)) !== cep ||
          !text("localidade", 80) ||
          !/^[A-Z]{2}$/.test(text("uf", 2))
        ) {
          throw new Error("unavailable");
        }
        if (controller.signal.aborted) return;
        setCustomer((value) =>
          onlyDigits(value.cep) === cep && value.address === previousAddress
            ? {
                ...value,
                address: {
                  street: text("logradouro", 120),
                  district: text("bairro", 80),
                  city: text("localidade", 80),
                  state: text("uf", 2),
                },
                complement: value.complement.trim() ? value.complement : text("complemento", 80),
              }
            : value,
        );
      } catch {
        // Keep manual fields available without notices if the lookup fails or is cancelled.
        return;
      } finally {
        window.clearTimeout(timeout);
      }
    },
    [setCustomer],
  );

  useEffect(() => {
    // Do not repeat a successful lookup when returning from the review step.
    if (!isValidCep(cep) || addressBefore.current) return;
    scheduled.current = window.setTimeout(() => {
      void search(cep, addressBefore.current);
    }, 350);
    return () => window.clearTimeout(scheduled.current);
  }, [cep, search]);

  return (
    <div className="quote-address is-wide">
      <div className="quote-address-fields">
        {addressFields.map((field) => (
          <div className={`quote-field${field.key === "street" ? " is-wide" : ""}`} key={field.key}>
            <label htmlFor={`quote-address-${field.key}`}>{field.label} (opcional)</label>
            <input
              id={`quote-address-${field.key}`}
              name={field.key}
              type="text"
              autoComplete={field.autoComplete}
              maxLength={field.max}
              value={customer.address?.[field.key] ?? ""}
              onChange={(event) => {
                const value =
                  field.key === "state"
                    ? event.target.value.toUpperCase().replace(/[^A-Z]/g, "")
                    : event.target.value;
                setCustomer((previous) => ({
                  ...previous,
                  address: { ...emptyAddress, ...previous.address, [field.key]: value },
                }));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
