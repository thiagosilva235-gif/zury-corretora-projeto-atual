import { quoteSchemaVersion, quotePrivacyVersion } from "./quote-contract.ts";
import {
  cleanDocument,
  onlyDigits,
  maskPlate,
  isCarQuote,
  type QuoteCustomer,
} from "./quote-form.mjs";

/** Transient, versioned DTO. No persistence or network side effect; future CRM adapters consume it. */
export function prepareQuoteSubmission(customer: QuoteCustomer, area: string, solution: string) {
  return {
    schemaVersion: quoteSchemaVersion,
    privacyVersion: quotePrivacyVersion,
    consent: customer.consent,
    data: {
      ...customer,
      name: customer.name.trim(),
      document: cleanDocument(customer.document),
      phone: onlyDigits(customer.phone),
      email: customer.email.trim(),
      cep: onlyDigits(customer.cep),
      number: customer.number.trim(),
      complement: customer.complement.trim(),
      plate: isCarQuote(solution) ? maskPlate(customer.plate ?? "") : "",
      address: customer.address ? { ...customer.address } : undefined,
      area,
      solution,
    },
  };
}

export type QuoteReceipt = {
  protocol: string;
  product: string;
  persisted: true;
  status: "recebido";
};

export function quoteReceiptWhatsAppHref(recipient: string, receipt: QuoteReceipt) {
  const text = `Olá, ZURY! Solicitei uma cotação de ${receipt.product}. Protocolo: ${receipt.protocol}.`;
  return `${recipient}?text=${encodeURIComponent(text)}`;
}

class QuoteRequestError extends Error {}
async function quoteApi(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, { ...options, signal: AbortSignal.timeout(20000) });
    const payload = await response.json();
    if (!response.ok)
      throw new QuoteRequestError(
        typeof payload.message === "string"
          ? payload.message
          : "Não foi possível salvar. Tente novamente.",
      );
    return payload;
  } catch (error) {
    if (error instanceof QuoteRequestError) throw error;
    throw new QuoteRequestError(
      "Não foi possível conectar ao serviço de cotação. Seus dados continuam no formulário; tente novamente.",
    );
  }
}

/** No personal data in a URL. Creation succeeds only after the API confirms COMMIT. */
export async function saveQuote(
  submission: ReturnType<typeof prepareQuoteSubmission>,
  key: string,
): Promise<QuoteReceipt> {
  const token = await quoteApi("/api/leads/session", {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
  });
  const receipt = await quoteApi("/api/leads", {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": key,
      "X-Quote-CSRF": token.csrf,
    },
    body: JSON.stringify(submission),
  });
  if (
    receipt.persisted !== true ||
    !/^ZURY-[A-F0-9]{32}$/.test(receipt.protocol) ||
    receipt.product !== submission.data.solution ||
    receipt.status !== "recebido"
  )
    throw new Error("O servidor não confirmou o recebimento. Tente novamente.");
  return receipt;
}
