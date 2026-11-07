# Design and accessibility

This file is a map, not a second design source. The canonical documents are maintained with the Impeccable skill and must not be duplicated or rewritten here:

| Topic                                                                                        | Canonical source                                                                                  |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Product truth, audience, owner decisions, content limits                                     | [PRODUCT.md](../PRODUCT.md)                                                                       |
| Design system: tokens (frontmatter), colors, typography, layout, components, do's and don'ts | [DESIGN.md](../DESIGN.md)                                                                         |
| `/cartao` composition contract                                                               | [.impeccable/surfaces/src-routes-cartao-tsx.md](../.impeccable/surfaces/src-routes-cartao-tsx.md) |
| Approved landing spec: literal copy, brand assets, hero, shield, sections                    | [ZURY-SITE-SPEC.md](../ZURY-SITE-SPEC.md)                                                         |
| Landing root tokens and global styles                                                        | [src/styles.css](../src/styles.css)                                                               |
| Card tokens and styles                                                                       | [src/digital-card.css](../src/digital-card.css)                                                   |

## Direction

Audience, language and tone come from `PRODUCT.md`: Brazilian visitors (pt-BR copy) looking for insurance solutions or a direct contact with the ZURY team. The visual direction is "ZURY black, white and silver" (`DESIGN.md`), with the original logo and self-hosted Inter Tight (`public/fonts/`, OFL). Card-specific styles stay scoped to `/cartao`; the landing keeps its graphite/silver/paper root tokens.

## Interaction rules that apply to every change

- Semantic HTML, keyboard reachability, visible focus (`:focus-visible` and the skip link in `src/styles.css`), adequate contrast and labelled controls.
- Native anchors for WhatsApp (`wa.me`), `tel:` and `mailto:` actions; external links keep their new-tab notice and safe `rel`.
- Form validation messages sit beside their fields; the quote dialog moves focus to the first invalid field (`quoteFieldOrder` in `src/lib/quote-form.mjs`).
- **Motion exception (owner decision):** animations run for every visitor even when the system requests reduced motion, with no exceptions (the `/cartao` Silver Light Trace, `src/components/ui/silver-trace.tsx`, included). Do not reintroduce a static `prefers-reduced-motion` mode; keep hidden-tab pauses. This deliberately overrides the toolkit's generic "respect reduced motion" default.
- `/cartao` COTAR AGORA is the landing header's glowing graphite capsule (`.quote-graphite.quote-graphite--glow` in `src/components/site/quote-cta.css`, sized by `.card-quote-cta` in `src/digital-card.css`); the card's secondary buttons reuse its `--quote-graphite-*` face and hover without the glow. Navbar and card logos share `src/components/site/brand-shine.css`.
- Never present demonstration content as real reviews, ratings or customers. The card's demonstration testimonials were removed (commit `a8f8df7`).

## Layout and review

Breakpoints and measures are recorded in `DESIGN.md` (landing container, desktop navigation from 1100px, card breakpoints at 820/370px). Browser checks of the critical flows (landing, quote dialog, `/cartao`) belong in the Playwright suite under `tests/e2e/` (`bun run test:e2e`).

Known inconsistency to reconcile when those files are next touched: `src/components/shield/` (image shield and 3D scene) still contains `prefers-reduced-motion` branches. `PRODUCT.md` is authoritative.

## Maintenance

Visual or interaction changes update the token/component source and, when a rule changes, `DESIGN.md`/`PRODUCT.md` through the Impeccable workflow. Update this map only when a canonical source moves.
