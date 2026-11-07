import { test, expect, gotoReady } from "./fixtures";
test("the card light sweep repeats for at least two complete cycles", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await gotoReady(page, "/cartao");
  const shine = page.locator(".card-brand .brand-shine-light");
  const timing = () =>
    shine.evaluate((el) => {
      const animation = el
        .getAnimations({ subtree: true })
        .find((a) => "animationName" in a && a.animationName === "brand-shine");
      if (!animation) return null;
      const specified = animation.effect!.getTiming();
      const computed = animation.effect!.getComputedTiming();
      return {
        duration: specified.duration,
        iterations: specified.iterations,
        currentIteration: computed.currentIteration,
        playState: animation.playState,
      };
    });
  const initial = await timing();
  expect(initial).toMatchObject({ duration: 3400, iterations: Infinity, playState: "running" });
  await expect
    .poll(async () => Number((await timing())?.currentIteration ?? -1), {
      timeout: 12000,
      intervals: [300],
    })
    .toBeGreaterThanOrEqual(2);
});
