import { test, expect, fillCustomer, gotoReady } from "./fixtures";

for (const route of ["/", "/cartao"]) {
  test(`quote preserves inputs, validates and exposes privacy on ${route}`, async ({ page }) => {
    // Contract-level UI fixture only: real PostgreSQL persistence is a separate conditional test.
    await page.route("**/api/leads/session", (route) => route.fulfill({ json: { csrf: "test" } }));
    await page.route("**/api/leads", (route) =>
      route.fulfill({
        status: 201,
        json: {
          persisted: true,
          status: "recebido",
          protocol: "ZURY-" + "A".repeat(32),
          product: "Automóveis",
        },
      }),
    );
    await gotoReady(page, route);
    if (route === "/cartao") await page.locator(".card-quote-cta").click();
    else await page.locator(".quote-trigger:visible").first().click();
    const d = page.locator("#quote-dialog");
    await d.locator('label:has(input[name="quote-area"][value="04"])').click();
    await d.getByRole("button", { name: "AVANÇAR", exact: true }).click();
    await d.locator('label:has(input[value="Automóveis"])').click();
    await d.getByRole("button", { name: "AVANÇAR", exact: true }).click();
    await d.getByRole("button", { name: "AVANÇAR", exact: true }).click();
    await expect(d.locator("#quote-name")).toBeFocused();
    await expect(d.locator("#quote-name")).toHaveAttribute("aria-invalid", "true");
    await fillCustomer(page);
    await d.locator("#quote-complement").fill("");
    await expect(d.locator("#quote-complement")).not.toHaveAttribute("required");
    await d.getByRole("link", { name: "Política de Privacidade", exact: true }).click();
    await expect(d.locator("#quote-privacy")).toHaveAttribute("open", "");
    await expect(d.locator("#quote-name")).toHaveValue("Maria Teste da Silva");
    await d.locator("#quote-document").fill("11111111111");
    await d.getByRole("button", { name: "AVANÇAR", exact: true }).click();
    await expect(d.locator("#quote-document")).toBeFocused();
    await expect(d.locator("#quote-document-error")).toContainText("CPF inválido");
    await d.locator("#quote-document").fill("52998224725");
    await d.getByRole("button", { name: "AVANÇAR", exact: true }).click();
    await expect(d.locator(".quote-review")).toBeVisible();
    await d.getByRole("button", { name: "VOLTAR", exact: true }).click();
    await expect(d.locator("#quote-document")).toHaveValue("529.982.247-25");
    await expect(d.locator("#quote-complement")).toHaveValue("");
    await expect(d.locator("#quote-consent")).toBeChecked();
    await d.getByRole("button", { name: "AVANÇAR", exact: true }).click();
    await expect(d.getByRole("link", { name: /CONTINUAR NO WHATSAPP/ })).toHaveCount(0);
    await d.getByRole("button", { name: "ENVIAR SOLICITAÇÃO", exact: true }).click();
    await expect(d.getByRole("status")).toContainText("Solicitação de cotação enviada com sucesso");
    const link = d.getByRole("link", { name: /CONTINUAR NO WHATSAPP/ });
    const href = await link.getAttribute("href");
    expect(new URL(href!).searchParams.get("text")).not.toContain("52998224725");
    const popup = page.waitForEvent("popup");
    await link.click();
    await (await popup).close();

    await page.screenshot({
      path: `qa/quote-experience-${test.info().project.name}-${route === "/" ? "home" : "card"}.png`,
    });
  });
}
