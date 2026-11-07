import { services } from "../../lib/content.ts";
import { validateCustomer, isCarQuote } from "../../lib/quote-form.mjs";
import { prepareQuoteSubmission } from "../../lib/quote-submission.ts";
import { LeadError } from "./security.ts";

import { quoteSchemaVersion, quotePrivacyVersion } from "../../lib/quote-contract.ts";
export type ValidLead = ReturnType<typeof validateLead>;
const invalid = () =>
  new LeadError(422, "invalid", "Confira os dados e o consentimento antes de enviar.");
function text(value: unknown, max: number, optional = false): string {
  if (optional && value === undefined) return "";
  if (
    typeof value !== "string" ||
    value.length > max ||
    Array.from(value).some((char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)
  )
    throw invalid();
  return value.trim().replace(/\s+/g, " ");
}
export function validateLead(input: unknown) {
  if (!input || typeof input !== "object") throw invalid();
  const body = input as Record<string, unknown>;
  if (
    body["schemaVersion"] !== quoteSchemaVersion ||
    body["privacyVersion"] !== quotePrivacyVersion ||
    body["consent"] !== true
  )
    throw invalid();
  const raw = body["data"] as Record<string, unknown> | undefined;
  if (!raw || typeof raw !== "object") throw invalid();
  const area = text(raw["area"], 80);
  const solution = text(raw["solution"], 100);
  const service = services.find((item) => item.title === area);
  if (!service?.items.includes(solution)) throw invalid();
  const customer = {
    name: text(raw["name"], 120),
    document: text(raw["document"], 18),
    phone: text(raw["phone"], 20),
    email: text(raw["email"], 120, true),
    cep: text(raw["cep"], 9),
    number: text(raw["number"], 12),
    complement: text(raw["complement"], 80, true),
    consent: true,
    plate: isCarQuote(solution) ? text(raw["plate"], 8, true).toUpperCase().replace(/-/g, "") : "",
  };
  if (Object.keys(validateCustomer(customer)).length || !/\p{L}/u.test(customer.name))
    throw invalid();
  if (
    !/^[\d./-]+$|^[A-Z0-9./-]+$/i.test(customer.document) ||
    !/^[\d()+ .-]+$/.test(customer.phone) ||
    !/^[\d-]+$/.test(customer.cep)
  )
    throw invalid();
  if (customer.plate && !/^[A-Z]{3}\d[A-Z0-9]\d{2}$/.test(customer.plate)) throw invalid();
  const a = raw["address"] as Record<string, unknown> | undefined;
  if (a && (typeof a !== "object" || Array.isArray(a))) throw invalid();
  const address = a
    ? {
        street: text(a["street"], 160, true),
        district: text(a["district"], 100, true),
        city: text(a["city"], 100, true),
        state: text(a["state"], 2, true).toUpperCase(),
      }
    : undefined;
  if (
    address?.state &&
    ![
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ].includes(address.state)
  )
    throw invalid();
  return {
    productId: `${service.number}:${solution
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}`,
    ...prepareQuoteSubmission({ ...customer, address }, area, solution),
    // Server owns the approved policy version; do not trust client metadata.
    consent: true,
  };
}

/** Informational gaps only; insurer-specific mandatory data must be determined by the human/team. */
export function unfilledQuoteFields(data: ValidLead["data"]) {
  return [
    ...(!data.email ? ["email"] : []),
    ...(!data.complement ? ["complement"] : []),
    ...(isCarQuote(data.solution) && !data.plate ? ["plate"] : []),
    ...(["street", "district", "city", "state"] as const).filter((field) => !data.address?.[field]),
  ];
}
