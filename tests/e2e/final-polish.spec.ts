import { test, expect } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { gotoReady } from "./fixtures";
const widths = [320, 390, 768, 1024, 1440, 2560];
for (const width of widths)
  for (const path of ["/", "/cartao"]) {
    test(`${path} responsive ${width}`, async ({ page }, info) => {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      await gotoReady(page, path);
      if (path === "/")
        await page.evaluate(() => {
          const hero = document.querySelector<HTMLElement>(".hero-scroll")!;
          scrollTo({ top: hero.offsetHeight - innerHeight, behavior: "instant" });
        });
      await page.waitForTimeout(800);
      if ([390, 1440].includes(width))
        await page.screenshot({
          path: `qa/final-polish/${process.env["ZURY_BASELINE"] ? "before" : "after"}-${path === "/" ? "home" : "card"}-${width}-${info.project.name}.png`,
        });
      const audit = await page.evaluate(() => {
        const visible = (n: Element) => {
          const r = n.getBoundingClientRect();
          const s = getComputedStyle(n);
          return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
        };
        return {
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          badAnchors: Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
            .filter((n) => n.hash && !document.getElementById(decodeURIComponent(n.hash.slice(1))))
            .map((n) => n.hash),
          smallControls: Array.from(document.querySelectorAll("button,a"))
            .filter(visible)
            .filter((n) => {
              const r = n.getBoundingClientRect();
              return r.height < 40 && !n.closest("footer,.site-footer,.card-footer,.catalog-list");
            })
            .map((n) => ({
              text: n.textContent?.trim().slice(0, 45),
              h: n.getBoundingClientRect().height,
            }))
            .slice(0, 20),
          images: Array.from(document.images)
            .filter((n) => n.complete && n.naturalWidth === 0)
            .map((n) => n.getAttribute("src")),
        };
      });
      await writeFile(
        `qa/final-polish/${process.env["ZURY_BASELINE"] ? "before" : "after"}-${path === "/" ? "home" : "card"}-${width}-${info.project.name}.json`,
        JSON.stringify({ audit, errors }, null, 2),
      );
      if (process.env["ZURY_BASELINE"]) return;
      for (const button of await page.locator(".quote-trigger:visible").all()) {
        const finish = await button.evaluate((node) => {
          const trace = node.querySelector(".silver-trace")!;
          return {
            green: trace.classList.contains("silver-trace--green"),
            duration: getComputedStyle(trace, "::after").animationDuration,
          };
        });
        expect(finish.green).toBe(false);
        expect(finish.duration).toBe("3.6s");
      }
      expect(audit.overflow).toBeLessThanOrEqual(0);
      expect(audit.badAnchors).toEqual([]);
      expect(audit.images).toEqual([]);
      expect(errors).toEqual([]);
      await page
        .locator(path === "/cartao" ? ".card-quote-cta" : ".hero-actions .quote-trigger")
        .click();
      const dialog = page.locator("#quote-dialog");
      await expect(dialog).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
      await expect(
        page.locator(path === "/cartao" ? ".card-quote-cta" : ".hero-actions .quote-trigger"),
      ).toBeFocused();
    });
  }
