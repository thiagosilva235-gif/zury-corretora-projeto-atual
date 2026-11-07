import { test, expect, gotoReady } from "./fixtures";

test("navigation, contact menus, focus and external destinations stay usable", async ({
  page,
  isMobile,
}) => {
  await gotoReady(page, "/");
  const mobile = page.getByRole("button", { name: "Abrir navegação", exact: true });
  if (await mobile.isVisible()) {
    await mobile.click();
    const nav = page.locator("#site-navigation");
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "CARTÃO DIGITAL", exact: true })).toHaveAttribute(
      "href",
      "/cartao",
    );
    await page.keyboard.press("Escape");
    await expect(nav).not.toBeVisible();
  } else {
    const social = page.locator(".desktop-social");
    await social.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#social-channels")).toBeVisible();
    await page.keyboard.press("Escape");
  }
  await page.goto("/cartao");
  await page.waitForLoadState("networkidle");
  const trigger = page.locator(".card-whatsapp");
  await trigger.focus();
  await page.keyboard.press("Enter");
  const pop = page.locator("#card-contact-channels");
  await expect(pop).toBeVisible();
  await expect(pop.locator('a[href^="https://wa.me/"]')).toHaveCount(3);
  await expect(pop.locator('a[href^="mailto:"]')).toHaveCount(0);
  const box = await pop.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  await page.keyboard.press("Escape");
  await expect(pop).not.toBeVisible();
  await expect(trigger).toBeFocused();
  for (const link of await page.locator('.card-footer-nav a, .card-footer a[href^="/#"]').all()) {
    const href = await link.getAttribute("href");
    if (href?.startsWith("/#")) {
      await link.click();
      await page.waitForLoadState("networkidle");
      await expect(page.locator(href.slice(1))).toHaveCount(1);
      await page.goBack();
      await page.waitForLoadState("networkidle");
    }
  }
});

test("carousels, reduced motion and keyboard targets remain available", async ({ page }) => {
  await gotoReady(page, "/");
  await page.locator("#servicos").scrollIntoViewIfNeeded();
  if (test.info().project.name === "desktop" || test.info().project.name === "mobile") {
    await page.locator("#indicacoes").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page
      .locator("#indicacoes")
      .screenshot({ path: `qa/final-polish/referrals-${test.info().project.name}.png` });
    await page.locator("#servicos").scrollIntoViewIfNeeded();
  }
  const dots = page.locator(".catalog-dots button");
  if (await dots.first().isVisible()) {
    const dot = dots.nth(3);
    await dot.click();
    await expect(dot).toHaveAttribute("aria-current", "true");
    expect((await dot.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  for (const id of ["#companhias", "#beneficios"]) {
    await page.locator(id).scrollIntoViewIfNeeded();
    await expect(page.locator(id + " .infinite-slider")).toBeVisible();
    const rail = page.locator(id + " .infinite-slider-track");
    const before = await rail.getAttribute("style");
    await page.waitForTimeout(250);
    expect(await rail.getAttribute("style")).not.toEqual(before);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".hero-text-shine")).toBeHidden();
  await page.goto("/cartao");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".card-brand .brand-shine-light")).toBeHidden();
  await expect(page.locator(".card-reduced-title")).toBeVisible();
});
