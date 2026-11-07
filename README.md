# ZURY CORRETORA — Lovable

Site da ZURY adaptado da versão Next.js aprovada para o runtime TanStack Start/Vite desta guia Lovable, sem redesenhar conteúdo, marca, fotografias ou animações.

- Editor: https://lovable.dev/projects/96134589-03b1-40f8-9669-d9c01799cea3
- Repositório: https://github.com/edomadeirantc/credit-free-project-builder
- Prévia: https://id-preview--96134589-03b1-40f8-9669-d9c01799cea3.lovable.app
- Versão anterior preservada na branch `backup/before-zury-20261027`.

## Rodar no computador (entrega)

Requisito: Node.js **24 LTS recomendado**, ou a linha **22 a partir de 22.13.0** (https://nodejs.org). Bun não é necessário para a entrega local.

No Windows, extraia o ZIP em uma pasta vazia e dê dois cliques em `INICIAR-SITE.bat`. Ele verifica a versão do Node; na primeira vez, instala exatamente as dependências do `package-lock.json` da entrega usando `npm ci`. Depois gera a versão final e abre o site em http://127.0.0.1:8787. Para encerrar, feche a janela preta.

Pelo terminal, na pasta do projeto:

```sh
npm ci
npm run build
npm run preview
```

Todas as animações e efeitos de movimento ficam ativos. Indicações e Benefícios agora também aparecem na versão final, por solicitação do responsável. Para editar e ver as mudanças ao vivo, use `npm run dev`.

## Publicar (ZIP de entrega)

O ZIP de entrega já traz, em `public/__l5e/assets-v1/`, a capa do hero e os PDFs de CNPJ e SUSEP, que no Lovable vêm do CDN dele; o vídeo do hero fica em `public/hero/` (`hero-shield-720.mp4` no celular, `hero-shield-1080.mp4` a partir de 768 px, só keyframes para o seek do scroll). Assim o site funciona com todas as animações em qualquer hospedagem. Não há variáveis de ambiente obrigatórias. O hospedeiro detecta o destino sozinho; para forçar um, use `NITRO_PRESET`.

- **Vercel:** importe a pasta (pelo GitHub ou `npx vercel` dentro dela). Framework "Other", comando `npm run build`; a Vercel é detectada automaticamente e a saída vai para `.vercel/output`.
- **Netlify:** comando `npm run build`, pasta de publicação `dist`; o Netlify é detectado automaticamente.
- **Cloudflare Workers:** `npm run build` e depois `npx wrangler deploy --config .output/server/wrangler.json` (é o destino padrão).
- **Servidor Node próprio (VPS):** `NITRO_PRESET=node-server npm run build` e depois `node .output/server/index.mjs` (variáveis `PORT` e `HOST`). Use um proxy como nginx na frente para HTTPS e cache.
- **Lovable:** continua publicando pelo GitHub (`main`), sem usar o ZIP.

## Desenvolvimento

Use Node.js 24 LTS (ou 22.13.0+ na linha 22) e Bun. O lockfile do desenvolvimento é `bun.lock`; o ZIP local também inclui um `package-lock.json` próprio, validado separadamente com instalação limpa por `npm ci`, tipos, lint, testes, build e execução no navegador.

```sh
bun install
bun run dev
bun run typecheck
bun run lint
bun run test
bun run build
bun run preview
```

`src/site-home.tsx` compõe a página; `src/components/site` e `src/components/ui` contêm as seções e movimentos; `src/lib/content.ts` concentra os dados oficiais. Os desenhos oficiais, fotografias e logotipos permanecem em `public/`. A fonte Inter Tight é local, com licença em `public/fonts/OFL.txt`.

A prévia do build usa Wrangler local com a data compatível com seu runtime fixado (`2026-10-19`); a publicação continua usando a data gerada pelo Lovable/Nitro. Encerre a prévia antes de gerar outro build para liberar os arquivos de `.output/` no Windows.

As fotos de `public/` são enumeradas no início do Vite e no build: reinicie o servidor ao adicionar arquivos. Imagens usam HTML nativo, sem dependência do otimizador do Next.js. As rotas `/`, `/cartao` e `/preview/escudo` são TanStack; a última permanece marcada como noindex.

Na landing, a navbar desktop (a partir de 1100 px) tem INDICAÇÕES e BENEFÍCIOS à esquerda, a logo ao centro e, à direita, REDES SOCIAIS (abre o popover `#social-channels` com Instagram, TikTok e Facebook) e COTAR AGORA; CARTÃO DIGITAL, SOLUÇÕES, DIFERENCIAIS e SOBRE seguem no rodapé e no menu hambúrguer. No mobile o header mostra a logo, COTAR AGORA (também abaixo de 520 px) e o hambúrguer. Os dois COTAR AGORA do header são a cápsula grafite `.quote-graphite.quote-graphite--glow`, com brilho contínuo; `src/components/site/quote-cta.css` expõe `--quote-graphite-face`, `--quote-graphite-face-hover`, `--quote-graphite-shadow` e `--quote-graphite-ink` em `:root`. O brilho da logo vem de `src/components/site/brand-shine.css`, compartilhado com o `/cartao`. A seção A ZURY EM NÚMEROS foi removida; Como Funciona tem só as três etapas; Nossas Soluções e Como Funciona usam no mobile o hook `src/components/ui/use-snap-carousel.ts`; Benefícios Exclusivos é um carrossel horizontal com setas; o WhatsApp flutuante é um círculo com feixe verde contínuo (`src/components/site/floating-whatsapp.css`).

`/cartao` é independente e não aparece na navegação da landing. Com o iniciador Windows, abra http://127.0.0.1:8787/cartao. A reformulação mantém os contatos e a logo oficiais (com o mesmo brilho de `brand-shine.css`), remove a antiga imagem de fundo e usa Velaris em preto e branco e o título "Proteção para sua vida/família/empresa" em caixa alta, com palavras ascendentes. Logo abaixo, COTAR AGORA abre o diálogo de cotação compartilhado com a landing: é exatamente a cápsula grafite com brilho contínuo do header (`.quote-graphite.quote-graphite--glow`, `src/components/site/quote-cta.css`), dimensionada para o cartão (`.card-quote-cta` em `src/digital-card.css`). Os canais seguem a ordem Site institucional, Instagram, TikTok, Facebook (endereço oficial em `digitalChannels.facebook`), E-mail e Nos avalie. Um único botão WhatsApp abre o painel de contatos compartilhado com a home (`ChannelsPopover`, `#card-contact-channels`): WhatsApp, que expande Thiago — Corretor, Valdir — Consultor e Joana — Saúde com link `wa.me`, e E-mail; fecha por clique fora, botão fechar ou Esc. O cartão não oferece ligações `tel:`. Os seis canais e o botão WhatsApp usam a mesma face grafite e o mesmo hover do COTAR AGORA, sem o brilho. O metal líquido e a dependência `@paper-design/shaders` foram removidos. O Silver Light Trace (`src/components/ui/silver-trace.tsx`/`.css`) é só CSS: um filete de 1 px prata-grafite acetinado mascarado na borda; no COTAR AGORA o feixe percorre o contorno continuamente, e nos demais botões passa uma vez e o filete clareia no hover ou foco visível (`tone="graphite"` existe para botões claros). Todas as animações do cartão, inclusive o trace, rodam para todos os visitantes, sem tratamento de movimento reduzido. Os ícones mantêm a licença e a atribuição em `public/card-icons/`.

O diálogo de cotação (`src/components/site/quote-menu.tsx`, `quote-steps.tsx` e `src/lib/quote-form.mjs`) tem quatro etapas: área, solução, dados do cliente e confirmação. A última mostra o resumo e ENVIAR PELO WHATSAPP, que abre a conversa com o WhatsApp oficial (`contacts[0]`) já com a mensagem formatada. Nenhum dado é armazenado (sem storage, cookies ou logs) e o site não exibe confirmação de envio.

O cartão não tem mais depoimentos: a seção de exemplos demonstrativos foi removida (commit `a8f8df7` do Lovable). Não inclua depoimentos, estrelas ou notas sem conteúdo real aprovado pelo responsável.

## Documentação

- [Produto e decisões do responsável](PRODUCT.md) · [Sistema visual](DESIGN.md) · [Especificação aprovada](ZURY-SITE-SPEC.md)
- [Instruções para agentes](AGENTS.md) (o [CLAUDE.md](CLAUDE.md) importa o mesmo arquivo)
- [Arquitetura](docs/architecture.md) · [Design e acessibilidade](docs/design.md) · [Preparação local](docs/onboarding.md) · [Qualidade](docs/quality.md) · [Setup e evidências](docs/setup.md) · [Revisão de segurança](docs/security-review.md)

`bun run test` e `bun run test:e2e` (Playwright, specs em `tests/e2e/`, Chrome instalado) exigem Node.js 24 LTS no PATH (instalado nesta estação; reabra o terminal após a instalação). Alternativa só com Bun para os testes unitários: `bun test ./src/lib ./src/components/shield`.

## Alteração de 27/10/2026

Substituído o projeto de fundo branco pela versão ZURY atual. Mantidos o botão Fale com um especialista sem iniciais, os rostos centralizados apenas no mobile, as logos no cartão de comparação, os contatos oficiais, os movimentos GSAP e o escudo aprovado. Mantidos a integração GitHub/Lovable, o wrapper de erros e o runtime de publicação do destino. O projeto Next.js original e seu deploy Vercel não foram alterados.

Testes de geometria, navegação, flags comerciais, links e integridade das imagens foram mantidos. Testes que apenas fixavam redação/CSS foram removidos; a especificação e `content.ts` continuam sendo as fontes do conteúdo aprovado.

Não faça force-push na branch conectada: commits normais enviados à `main` sincronizam com o Lovable. Não envie `.env`, tokens, pastas de build ou `node_modules` ao repositório.
