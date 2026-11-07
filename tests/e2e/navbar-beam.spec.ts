import sharp from "sharp";
import { test, expect, gotoReady } from "./fixtures";

test("navbar beam remains animated and visibly distinct along the edge", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await gotoReady(page, "/");
  const button = page.locator(
    info.project.name.includes("mobile") ? ".header-quote" : ".desktop-quote",
  );
  await expect(button).toBeVisible();
  const trace = button.locator(".silver-trace");
  const samples = [];
  for (const time of [200, 1100, 2000, 2900]) {
    await trace.evaluate((el, t) => {
      const a = el
        .getAnimations({ subtree: true })
        .find((a) => "animationName" in a && a.animationName === "silver-trace-loop")!;
      a.pause();
      a.currentTime = t;
    }, time);
    await page.waitForTimeout(50);
    samples.push(
      await button.screenshot({
        path: `qa/navbar-beam-${info.project.name}-${time}.png`,
        animations: "allow",
      }),
    );
  }
  const stats = await trace.evaluate((el) => {
    const p = getComputedStyle(el, "::after");
    const r = getComputedStyle(el);
    return {
      animation: p.animationName,
      duration: p.animationDuration,
      opacity: p.opacity,
      z: r.zIndex,
      clip: r.maskComposite,
      beam: r.getPropertyValue("--silver-trace-beam"),
    };
  });
  console.log(
    info.project.name,
    JSON.stringify(stats),
    "screens differ:",
    !samples[0]!.equals(samples[2]!),
  );
  expect(stats.animation).toBe("silver-trace-loop");
  expect(stats.duration).toBe("3.6s");
  const pixelsA = await sharp(samples[0]).removeAlpha().raw().toBuffer();
  const pixelsB = await sharp(samples[2]).removeAlpha().raw().toBuffer();
  const visibleChanges = pixelsA.reduce(
    (count, value, i) => count + (Math.abs(value - pixelsB[i]!) > 20 ? 1 : 0),
    0,
  );
  expect(visibleChanges).toBeGreaterThan(150);
  expect(stats.z).toBe("1");
  await button.click();
  await expect(page.locator("#quote-dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(button).toBeFocused();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(trace).toHaveCSS("z-index", "1");
  await expect
    .poll(() => trace.evaluate((el) => getComputedStyle(el, "::after").animationName))
    .toBe("none");
});
