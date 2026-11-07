import { prepareQuoteSubmission } from "../../src/lib/quote-submission.ts";
export function validSubmission() {
  return prepareQuoteSubmission(
    {
      name: "Pessoa de teste",
      document: "52998224725",
      phone: "38999608455",
      email: "",
      cep: "39400000",
      number: "120",
      complement: "",
      consent: true,
      plate: "ABC1D23",
    },
    "VEÍCULOS",
    "Automóveis",
  );
}
