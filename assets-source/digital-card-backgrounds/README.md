# Fundos do cartão digital

Os cinco PNGs e `LEIA_ME_CODEX.txt` são cópias integrais dos arquivos fornecidos pelo responsável em 05/11/2026. Não foram alterados. A origem informa que as dimensões resultam de interpolação 2×, sem detalhes nativos adicionais.

As imagens usadas pela página estão em `public/backgrounds/digital-card/*.webp`: conversão WebP **sem perdas**, mesmas dimensões, Pillow `lossless=True, method=6, exact=True`. Todos os PNGs originais são RGB sem perfil de cor incorporado; a comparação dos pixels decodificados com cada WebP resultou em diferença zero. Os originais ficam fora de `public` para não integrarem o conteúdo estático servido.

A seleção é feita por `<picture>` em `src/digital-card.tsx`; `src/digital-card.css` mantém o quadro fixo, centralizado e coberto por `object-fit: cover`. Não há blur CSS na imagem.

Dimensões, tamanhos e condições: `qa/card-refresh-2026-11-05/RELATORIO.md`. Medições em bytes: `qa/card-refresh-2026-11-05/assets.json`.
