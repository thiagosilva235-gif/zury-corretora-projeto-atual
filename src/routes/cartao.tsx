import { pageSeo } from "../lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import DigitalCard from "../digital-card";

export const Route = createFileRoute("/cartao")({
  head: () => {
    const seo = pageSeo(
      "/cartao",
      "Cartão digital | ZURY CORRETORA",
      "Solicite sua cotação e encontre os contatos e canais oficiais da ZURY CORRETORA.",
    );
    return {
      ...seo,
      meta: [
        ...seo.meta,
        { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
        { name: "theme-color", content: "#090b0d" },
      ],
    };
  },
  component: DigitalCard,
});
