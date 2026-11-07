import { pageSeo } from "../lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import Home from "../site-home";

export const Route = createFileRoute("/")({
  head: () =>
    pageSeo(
      "/",
      "ZURY CORRETORA | Seguros, saúde e crédito",
      "Soluções em seguros, saúde e crédito para sua vida, seu patrimônio e sua empresa. Conheça a ZURY CORRETORA e solicite uma cotação.",
    ),
  component: Home,
});
