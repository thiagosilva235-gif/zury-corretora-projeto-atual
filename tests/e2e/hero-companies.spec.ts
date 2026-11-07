import { test, expect, gotoReady } from "./fixtures";
for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [320, 568],
  [320, 480],
]) {
  test(`hero companies remain aligned at ${width}x${height}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height });
    await gotoReady(page, "/");
    const proof = page.locator(".hero-proof");
    const faces = proof.locator("img");
    const text = proof.locator(".hero-proof-text");
    await expect(faces).toHaveCount(4);
    expect(await faces.evaluateAll((nodes) => nodes.map((n) => n.getAttribute("alt")))).toEqual([
      "Porto Seguro",
      "Allianz",
      "Tokio Marine",
      "Zurich",
    ]);
    await expect(text).toHaveText("37 COMPANHIAS. UMA SÓ CORRETORA.");
    await expect(text).toHaveCSS("font-weight", "600");
    const boxes = await faces.evaluateAll((nodes) =>
      nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return {
          x: r.x,
          y: r.y,
          width: r.width,
          height: r.height,
          loaded: (n as HTMLImageElement).naturalWidth > 0,
        };
      }),
    );
    const textBox = await text.boundingBox();
    const proofBox = await proof.boundingBox();
    const size = width < 768 ? 38 : 48;
    for (const box of boxes) {
      expect(box.width).toBe(size);
      expect(box.height).toBe(size);
      expect(box.loaded).toBe(true);
    }
    for (let i = 1; i < boxes.length; i++) {
      expect(boxes[i]!.x).toBeGreaterThan(boxes[i - 1]!.x);
      expect(boxes[i]!.x).toBeLessThan(boxes[i - 1]!.x + size);
    }
    expect(textBox!.x).toBeGreaterThanOrEqual(boxes[3]!.x + size);
    expect(Math.abs(textBox!.y + textBox!.height / 2 - (boxes[0]!.y + size / 2))).toBeLessThan(1.1);
    const floating = await page.locator(".floating-whatsapp-button").boundingBox();
    const overlaps =
      textBox!.x < floating!.x + floating!.width &&
      textBox!.x + textBox!.width > floating!.x &&
      textBox!.y < floating!.y + floating!.height &&
      textBox!.y + textBox!.height > floating!.y;
    expect(overlaps).toBe(false);
    expect(proofBox!.x).toBeGreaterThanOrEqual(0);
    expect(proofBox!.x + proofBox!.width).toBeLessThanOrEqual(width);
    expect(proofBox!.y).toBeGreaterThanOrEqual(0);
    expect(proofBox!.y + proofBox!.height).toBeLessThanOrEqual(height);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBe(0);
    await page.screenshot({
      path: `qa/hero-companies-${info.project.name}-${width}x${height}.png`,
    });
  });
}
