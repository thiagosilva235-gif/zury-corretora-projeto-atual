/** Existing public deployment; keep sitemap and canonical URLs on this same approved origin. */
export const siteOrigin = "https://zury-corretora-digital.vercel.app";
export const publicRoutes = ["/", "/cartao"] as const;
export function pageSeo(path: (typeof publicRoutes)[number], title: string, description: string) {
  const url = new URL(path, siteOrigin).href;
  const image = `${siteOrigin}/brand/zury-escudo-malha-og.jpg`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ZURY CORRETORA" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/jpeg" },
      {
        property: "og:image:alt",
        content: "Escudo original da ZURY CORRETORA sobre fundo escuro com malha",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: image },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
