# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pessoas que recebem o cartão digital da ZURY e precisam falar com um dos atendentes, acessar canais oficiais ou iniciar uma cotação. No `/cartao`, o responsável escolheu o CTA COTAR AGORA logo abaixo do título, os canais oficiais e um único botão WhatsApp que abre o mesmo painel de contatos da home, com os três atendentes.

## Product Purpose

ZURY CORRETORA apresenta suas soluções de seguros e facilita contato com a equipe. O cartão é independente da landing e não entra na navegação principal.

## Capabilities and Constraints

- A landing existente, sua navegação e suas animações estão fora da reformulação.
- Contatos e canais oficiais vêm de `src/lib/content.ts`: Thiago — Corretor; Valdir — Consultor; Joana — Saúde.
- A seção de depoimentos demonstrativos foi removida do cartão (commit `a8f8df7` do Lovable); depoimentos só voltam com conteúdo real fornecido pelo responsável.
- WhatsApp usa os destinos oficiais; no cartão, um único botão abre o painel de contatos compartilhado com a home (`ChannelsPopover`, `#card-contact-channels`): WhatsApp, que expande Thiago — Corretor, Valdir — Consultor e Joana — Saúde com o link de cada um, e E-mail. Por decisão do responsável, o cartão não oferece ligações `tel:`. E-mail usa `mailto:`.
- Cotação: diálogo de quatro etapas compartilhado por `/` e `/cartao` (área, solução, dados do cliente com validação de CPF/CNPJ, confirmação). ENVIAR PELO WHATSAPP abre o WhatsApp oficial (`contacts[0]`) com a mensagem formatada; nenhum dado é armazenado e o site não exibe confirmação de envio.
- Facebook tem endereço oficial fornecido pelo responsável (`digitalChannels.facebook`), exibido no popover social e no rodapé do site principal e nos canais do cartão (Site institucional, Instagram, TikTok, Facebook, E-mail e Nos avalie).
- O metal líquido (`@paper-design/shaders`) foi removido de novo a pedido do responsável. O COTAR AGORA do cartão é o mesmo CTA grafite com brilho contínuo da navbar (não é mais branco); os seis canais e o botão WhatsApp usam a mesma face grafite e o mesmo hover, sem brilho. O Silver Light Trace é só CSS: filete prata-grafite de 1 px na borda; o feixe roda continuamente só no COTAR AGORA, e os demais botões recebem uma passagem do feixe e filete mais claro no hover ou foco visível.
- Landing (30/10/2026): navbar desktop com INDICAÇÕES e BENEFÍCIOS à esquerda, logo ao centro, REDES SOCIAIS (Instagram, TikTok, Facebook) e COTAR AGORA à direita; CARTÃO DIGITAL, SOLUÇÕES, DIFERENCIAIS e SOBRE ficam no rodapé e no menu mobile. A seção A ZURY EM NÚMEROS foi removida e Como Funciona mostra só as três etapas.

## Brand Commitments

Preservar ZURY CORRETORA e sua logo original. Nesta reformulação, o responsável fixou preto, branco e prata, fundo Velaris animado, troca vertical de palavras e acabamento metálico dos controles. Remover a antiga imagem de fundo do cartão.

## Evidence on Hand

- Conteúdo e contatos oficiais: `src/lib/content.ts`.
- Componentes fornecidos pelo responsável: Velaris e animated-hero (palavra ascendente); liquid-metal-button (borda de metal líquido dos controles secundários do cartão) e testimonials-with-marquee foram usados e depois removidos do cartão.
- Perfil público de avaliações: `https://share.google/AnNgzLmPy4lMNqHO9`.
- Endereço oficial do Facebook fornecido pelo responsável: `https://www.facebook.com/share/19zFT3sdGr/?mibextid=wwXIfr`.
- Os depoimentos da demonstração eram fictícios para esta empresa e foram removidos; textos reais precisam de fonte verificável ou fornecimento pelo responsável.

## Product Principles

- Mostrar pessoas e meios de contato antes de argumentos promocionais.
- Preservar dados oficiais, ações reais e limites do que o site efetivamente faz.
- Não inventar depoimentos, resultados, números de avaliações ou promessas comerciais.
- Respeitar teclado, contraste e telas pequenas.
- Animações e transições rodam para todos os visitantes, inclusive com "movimento reduzido" ligado no sistema: decisão explícita do responsável, sem exceções (o Silver Light Trace do `/cartao` também roda sempre). Não reintroduzir o modo estático por `prefers-reduced-motion`.
