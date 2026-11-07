import { test, expect, gotoReady } from "./fixtures";

test("card logo and hero phrase use the navbar light band and timing", async ({ page }, info) => {
  await gotoReady(page, "/");
  const mobile = info.project.name.includes("mobile");
  const header = page.locator(
    mobile ? ".header-mobile .brand-shine-light" : ".desktop-brand-mark .brand-shine-light",
  );
  const logo = await header.evaluate((el) => {
    const s = getComputedStyle(el, "::before");
    return {
      band: s.backgroundImage,
      duration: s.animationDuration,
      timing: s.animationTimingFunction,
    };
  });
  const phrase = await page.locator(".hero-text-shine").evaluate((el) => {
    const s = getComputedStyle(el);
    return {
      band: s.backgroundImage,
      duration: s.animationDuration,
      timing: s.animationTimingFunction,
      clip: s.backgroundClip,
    };
  });
  expect(phrase).toEqual({ ...logo, clip: "text" });
  await page.goto("/cartao");
  await page.waitForLoadState("networkidle");
  const card = await page.locator(".card-brand .brand-shine-light").evaluate((el) => {
    const s = getComputedStyle(el, "::before");
    return {
      band: s.backgroundImage,
      duration: s.animationDuration,
      timing: s.animationTimingFunction,
    };
  });
  expect(card).toEqual(logo);
  const currentTime = () =>
    page.locator(".card-brand .brand-shine-light").evaluate((el) => {
      const animation = el
        .getAnimations({ subtree: true })
        .find((a) => "animationName" in a && a.animationName === "brand-shine");
      return Number(animation?.currentTime ?? 0);
    });
  const start = await currentTime();
  await expect
    .poll(async () => (await currentTime()) - start, { timeout: 2000 })
    .toBeGreaterThan(100);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".card-brand .brand-shine-light")).toBeHidden();
});
