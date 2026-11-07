import { test, expect, gotoReady } from "./fixtures";
import { siteOrigin } from "../../src/lib/seo";
for (const path of ["/", "/cartao"])
  test(`SEO and direct reload ${path}`, async ({ page, request }) => {
    await gotoReady(page, path);
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
      "href",
      new URL(path, siteOrigin).href,
    );
    await expect(page.locator('head meta[property="og:image"]')).toHaveAttribute(
      "content",
      `${siteOrigin}/brand/zury-escudo-malha-og.jpg`,
    );
    await expect(page.locator('head meta[property="og:locale"]')).toHaveAttribute(
      "content",
      "pt_BR",
    );
    await expect(page.locator('head meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
      "content",
      /index, follow/,
    );
    await expect(page.locator('head link[rel="icon"][type="image/png"]')).toHaveAttribute(
      "href",
      "/favicon-zury-transparente-32.png",
    );
    await expect(page.locator("h1")).toHaveCount(1);
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("og:image");
    for (const url of [
      "/favicon-zury-transparente-32.png",
      "/favicon-zury-transparente.ico",
      "/apple-touch-icon-zury.png",
      "/brand/zury-escudo-malha-og.jpg",
      "/sitemap.xml",
      "/robots.txt",
    ])
      expect((await request.get(url)).status()).toBe(200);
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain(`${siteOrigin}/cartao`);
    expect(sitemap).not.toContain("/api/");
    await page.goto("/preview/escudo");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
  });
