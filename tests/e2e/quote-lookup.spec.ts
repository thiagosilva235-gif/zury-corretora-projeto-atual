import { test, expect } from "@playwright/test";
import { fillCustomer } from "./fixtures";

async function openCar(page: import("@playwright/test").Page) {
  await page.goto("/cartao", { waitUntil: "networkidle" });
  await page.locator(".card-quote-cta").click();
  const dialog = page.locator("#quote-dialog");
  await expect(dialog.locator(".quote-option-text small")).toHaveCount(0);
  await dialog.locator('label:has(input[name="quote-area"][value="04"])').click();
  await dialog.getByRole("button", { name: "AVANÇAR", exact: true }).click();
  await dialog.locator('label:has(input[value="Automóveis"])').click();
  await dialog.getByRole("button", { name: "AVANÇAR", exact: true }).click();
  return dialog;
}

test("CEP lookup fills editable address and optional automobile plate reaches the summary", async ({
  page,
}) => {
  let requests = 0;
  await page.route("https://viacep.com.br/ws/**", async (route) => {
    requests++;
    expect(route.request().url()).toBe("https://viacep.com.br/ws/39400000/json/");
    expect(route.request().postData()).toBeNull();
    await route.fulfill({
      json: {
        cep: "39400-000",
        logradouro: "Praça de teste",
        bairro: "Centro",
        localidade: "Montes Claros",
        uf: "MG",
        complemento: "Complemento do serviço",
      },
    });
  });
  const d = await openCar(page);
  await expect(d.locator("#quote-plate")).not.toHaveAttribute("required");
  await fillCustomer(page);
  await d.locator("#quote-plate").fill("abc-1d23");
  await expect(d.locator("#quote-address-city")).toHaveValue("Montes Claros");
  await expect(d.locator(".quote-cep-search, #quote-cep-privacy, #quote-cep-status")).toHaveCount(
    0,
  );
  await expect(d.locator("#quote-complement")).toHaveValue("Apto 302");
  await d.locator("#quote-address-street").fill("Rua corrigida");
  await expect(page.locator("html")).toHaveJSProperty(
    "scrollWidth",
    await page.evaluate(() => innerWidth),
  );
  await page.screenshot({ path: `qa/quote-lookup-2026-11-05/${test.info().project.name}.png` });
  await d.getByRole("button", { name: "AVANÇAR", exact: true }).click();
  await expect(d.locator(".quote-review")).toContainText("ABC1D23");
  const href = await d.getByRole("link", { name: /ENVIAR PELO WHATSAPP/ }).getAttribute("href");
  const message = new URL(href!).searchParams.get("text")!;
  expect(message).toContain("*Logradouro:* Rua corrigida");
  expect(message).toContain("*Placa:* ABC1D23");
  expect(requests).toBe(1);
});

test("typing a complete CEP automatically fills every available address field", async ({
  page,
}) => {
  let requests = 0;
  await page.route("https://viacep.com.br/ws/**", async (route) => {
    requests++;
    await route.fulfill({
      json: {
        cep: "01001-000",
        logradouro: "Praça da Sé",
        bairro: "Sé",
        localidade: "São Paulo",
        uf: "SP",
        complemento: "lado ímpar",
      },
    });
  });
  const d = await openCar(page);
  await d.locator("#quote-cep").fill("01001");
  await page.waitForTimeout(500);
  expect(requests).toBe(0);
  await d.locator("#quote-cep").fill("01001000");
  for (const [key, value] of Object.entries({
    street: "Praça da Sé",
    district: "Sé",
    city: "São Paulo",
    state: "SP",
  })) {
    await expect(d.locator(`#quote-address-${key}`)).toHaveValue(value);
  }
  await expect(d.locator("#quote-complement")).toHaveValue("lado ímpar");
  await expect(d.locator("#quote-number")).toHaveValue("");
  expect(requests).toBe(1);
});

test("CPF validation is local and distinguishes valid and invalid digits", async ({ page }) => {
  const lookups: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("viacep.com.br") || request.url().includes("52998224725"))
      lookups.push(request.url());
  });
  const d = await openCar(page);
  await d.locator("#quote-document").fill("52998224725");
  await expect(d.locator("#quote-cpf-status")).toContainText("CPF válido");
  await d.locator("#quote-document").fill("11111111111");
  await d.locator("#quote-document").blur();
  await expect(d.locator("#quote-document-error")).toContainText("CPF inválido");
  await expect(d.locator("#quote-cpf-status")).toHaveCount(0);
  expect(lookups).toEqual([]);
});

test("CEP service failure permits manual address and plate remains optional", async ({ page }) => {
  await page.route("https://viacep.com.br/ws/**", (route) => route.abort());
  const d = await openCar(page);
  await fillCustomer(page);
  await expect(d.locator("#quote-cep-status, .quote-cep-search, #quote-cep-privacy")).toHaveCount(
    0,
  );
  await d.locator("#quote-address-city").fill("Unaí");
  await d.getByRole("button", { name: "AVANÇAR", exact: true }).click();
  await expect(d.locator("form")).toHaveAttribute("data-step", "4");
  await expect(d.locator(".quote-review")).toContainText("Unaí");
  await expect(d.locator(".quote-review")).not.toContainText("Placa");
});

test("changing CEP clears the previous address and stale results cannot replace the new one", async ({
  page,
}) => {
  await page.route("https://viacep.com.br/ws/**", async (route) => {
    if (route.request().url().includes("01001000")) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      await route
        .fulfill({
          json: { cep: "01001-000", logradouro: "Praça da Sé", localidade: "São Paulo", uf: "SP" },
        })
        .catch(() => {});
    } else {
      await route.fulfill({
        json: {
          cep: "39400-000",
          logradouro: "Rua nova",
          bairro: "Centro",
          localidade: "Montes Claros",
          uf: "MG",
        },
      });
    }
  });
  const d = await openCar(page);
  const firstRequest = page.waitForRequest("https://viacep.com.br/ws/01001000/json/");
  await d.locator("#quote-cep").fill("01001000");
  await firstRequest;
  await d.locator("#quote-cep").fill("39400000");
  await expect(d.locator("#quote-address-city")).toHaveValue("Montes Claros");
  await page.waitForTimeout(750);
  await expect(d.locator("#quote-address-city")).toHaveValue("Montes Claros");
  await d.getByRole("button", { name: "Alterar solução" }).click();
  await d.locator('label:has(input[value="Motos"])').click();
  await d.getByRole("button", { name: "AVANÇAR", exact: true }).click();
  await expect(d.locator("#quote-plate")).toHaveCount(0);
});
