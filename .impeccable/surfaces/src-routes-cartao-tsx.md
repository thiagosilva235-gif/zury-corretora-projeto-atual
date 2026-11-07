---
version: 1
slug: "src-routes-cartao-tsx"
primary_target: "src/routes/cartao.tsx"
related_targets: ["src/digital-card.tsx","src/digital-card.css"]
---

# Cartão digital — /cartao

Scope: somente src/digital-card.tsx, estilos e componentes exclusivos do cartão. Mode: Persuade. O visitante precisa reconhecer a ZURY, iniciar uma cotação e chegar a um atendente pelo único menu de WhatsApp.

## Direction contract

THESIS: um diretório pessoal da corretora, não uma mini landing de argumentos genéricos ou uma pilha de nove botões indistintos.

OWN-WORLD: preto, branco e prata fixados pelo responsável; logo original com o mesmo brilho da navbar (`src/components/site/brand-shine.css`), tipografia local da marca, fundo Velaris monocromático, superfície prateada do cartão, COTAR AGORA grafite com brilho contínuo igual ao da navbar e controles secundários na mesma face grafite, sem brilho, com o filete do Silver Light Trace. Nenhuma fotografia de fundo antiga ou cor saturada.

STORY: reconhecer a marca, iniciar uma cotação, acessar os canais oficiais ou falar com Thiago, Valdir ou Joana pelo WhatsApp.

FIRST VIEWPORT: logo centralizada; título em caixa alta "Proteção para sua vida / família / empresa", cuja palavra final sobe e muda, com texto acessível estável; logo abaixo, COTAR AGORA idêntico ao CTA da navbar (`.quote-graphite.quote-graphite--glow`: face grafite, reflexo de entrada e brilho contínuo), dimensionado para o cartão (`.card-quote-cta`), que abre o diálogo de cotação compartilhado. Em seguida, os canais na ordem Site institucional, Instagram, TikTok, Facebook, E-mail e Nos avalie, e por fim "Fale com a ZURY." com um único botão WhatsApp; canais e WhatsApp usam a face e o hover grafite do COTAR AGORA (custom properties `--quote-graphite-*`). Esse botão abre o painel de contatos compartilhado com a home (`ChannelsPopover`, `#card-contact-channels`, título "Contatos"): WhatsApp, que expande THIAGO — CORRETOR / VALDIR — CONSULTOR / JOANA — SAÚDE com link `wa.me`, e E-mail; fecha por clique fora, botão fechar ou Esc (que devolve o foco ao botão). Por decisão do responsável, o cartão não oferece ligações `tel:`.

FORM: diretório de contatos com abertura tipográfica, composição escolhida pelo responsável no questionário. Direção fixada pelo briefing e pelos componentes fornecidos; sem sorteio de identidade ou nova composição gerada. Código primeiro por aprovação expressa. A seção de depoimentos de demonstração foi removida (commit `a8f8df7` do Lovable); depoimentos só voltam com conteúdo real fornecido pelo responsável.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Motion and states

O fundo Velaris pausa fora da tela ou em aba oculta; a troca de palavras, o fundo, o brilho do COTAR AGORA e o Silver Light Trace rodam mesmo com movimento reduzido no sistema, por decisão do responsável, sem exceções. A troca de palavras sobe em ritmo legível, sem mudar o tamanho da linha. Silver Light Trace (`src/components/ui/silver-trace.tsx`/`.css`), só CSS: filete acetinado prata-grafite de 1 px mascarado na borda, que segue o raio do controle sem tocar a face; no COTAR AGORA o feixe percorre o contorno continuamente (cerca de 4,2 s por volta); nos canais e no WhatsApp o feixe passa uma vez (cerca de 1,2 s) e o filete clareia no hover ou no foco visível, sem mover nem redimensionar o botão; `tone="graphite"` aplica o mesmo acabamento em grafite para botões claros. Sem sequenciador em JavaScript. Controles nativos com foco visível. Facebook usa o endereço oficial fornecido pelo responsável. O diálogo de cotação compartilhado tem quatro etapas e termina em ENVIAR PELO WHATSAPP, que abre o WhatsApp oficial com a mensagem formatada; nenhum dado é armazenado.

## Evidence resolved

Auditoria independente confirmou consistência dos três números, cargos e destinos WhatsApp. Nenhum depoimento real acessível foi encontrado no repositório ou nas consultas públicas; os exemplos de demonstração foram removidos e o cartão não exibe fotografias de clientes, notas em estrelas nem avaliações. O metal líquido (`@paper-design/shaders`, `src/components/ui/liquid-metal.tsx`) voltou brevemente em 30/10/2026 e foi removido de novo no mesmo dia, junto com o sequenciador `use-silver-trace.ts` e o COTAR AGORA branco, a pedido do responsável.
