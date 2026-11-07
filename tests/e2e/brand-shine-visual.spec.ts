import { test, expect, gotoReady } from "./fixtures";
import sharp from "sharp";

test("the light sweep visibly crosses the digital-card logo", async ({ page }, info) => {
  await gotoReady(page, "/cartao");
  const logo = page.locator(".card-brand");
  const trace = logo.locator(".brand-shine-light");
  const captures = [];
  for (const time of [150, 850]) {
    await trace.evaluate((el, t) => {
      const animation = el
        .getAnimations({ subtree: true })
        .find((a) => "animationName" in a && a.animationName === "brand-shine")!;
      animation.pause();
      animation.currentTime = t;
    }, time);
    await page.waitForTimeout(80);
    captures.push(
      await logo.screenshot({
        animations: "allow",
        path: `qa/card-logo-light-${info.project.name}-${time}.png`,
      }),
    );
  }
  const a = await sharp(captures[0]).removeAlpha().raw().toBuffer();
  const b = await sharp(captures[1]).removeAlpha().raw().toBuffer();
  const changed = a.reduce((count, value, i) => count + (Math.abs(value - b[i]!) >= 8 ? 1 : 0), 0);
  console.log("logo pixels changed at least 8:", changed);
  expect(changed).toBeGreaterThan(50);
});
