import { test, expect, gotoReady } from "./fixtures";
test("animated reading copy stays legible before the highlight reaches every word", async ({
  page,
}) => {
  await gotoReady(page, "/");
  const copy = page.locator(".referral-commercial");
  await copy.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      copy.evaluate((node) => {
        const words = Array.from(node.querySelectorAll<HTMLElement>('[style*="opacity"]'));
        return Math.min(1, ...words.map((n) => Number(getComputedStyle(n).opacity)));
      }),
    )
    .toBeGreaterThanOrEqual(0.65);
  await copy.screenshot({ path: `qa/final-polish/readable-copy-${test.info().project.name}.png` });
});
test("all four hero lines remain readable in forced-colors mode", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await gotoReady(page, "/");
  const fills = await page
    .locator(".hero-line")
    .evaluateAll((nodes) => nodes.map((n) => getComputedStyle(n).webkitTextFillColor));
  expect(fills).toHaveLength(4);
  for (const fill of fills) expect(fill).not.toBe("rgba(0, 0, 0, 0)");
});
