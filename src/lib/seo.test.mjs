import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { pageSeo, siteOrigin, publicRoutes } from "./seo.ts";
test("public routes have consistent canonical, Open Graph and indexable sitemap entries", async () => {
  const sitemap = await readFile(new URL("../../public/sitemap.xml", import.meta.url), "utf8");
  for (const path of publicRoutes) {
    const seo = pageSeo(path, "ZURY", "Descrição");
    assert.equal(seo.links[0].href, new URL(path, siteOrigin).href);
    assert.ok(sitemap.includes(seo.links[0].href));
    assert.ok(seo.meta.some((m) => m.property === "og:image" && m.content.startsWith(siteOrigin)));
  }
  assert.ok(!sitemap.includes("/api/") && !sitemap.includes("/preview/"));
  const robots = await readFile(new URL("../../public/robots.txt", import.meta.url), "utf8");
  assert.ok(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`));
  for (const asset of [
    "favicon-zury-transparente.ico",
    "favicon-zury-transparente-32.png",
    "apple-touch-icon-zury.png",
    "brand/zury-escudo-malha-og.jpg",
  ])
    assert.ok((await stat(new URL("../../public/" + asset, import.meta.url))).size > 0);
});
