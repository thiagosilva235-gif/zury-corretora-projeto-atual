---
name: ZURY CORRETORA
description: Existing brand foundations and scoped digital-card overrides
colors:
  ink-950: "#0a0c0e"
  ink-900: "#14171a"
  silver-200: "#d7dce0"
  silver-100: "#e6e9eb"
  silver-400: "#9ea6ab"
  paper-100: "#eeeee9"
  card-bg: "#080808"
  card-text: "#f5f5f3"
  card-muted: "#bcbcbc"
  card-line: "#444"
  card-cta-face: "#101112"
  card-cta-ink: "#f3f5f6"
typography:
  display:
    fontFamily: '"Inter Tight", Arial, sans-serif'
    fontSize: "clamp(48px, 4.6vw, 66px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Inter Tight", Arial, sans-serif'
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Inter Tight", Arial, sans-serif'
    fontSize: "26px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: '"Inter Tight", Arial, sans-serif'
    fontSize: "16px"
    lineHeight: 1.5
  label:
    fontFamily: '"Inter Tight", Arial, sans-serif'
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0"
rounded:
  radius-control: "4px"
  radius-card: "8px"
  card-capsule: "999px"
spacing:
  card-action-gap: "8px"
  card-channel-gap: "12px"
  card-row-padding: "24px"
  card-opening-gap: "80px"
components:
  card-control:
    backgroundColor: "{colors.card-cta-face}"
    textColor: "{colors.card-cta-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.card-capsule}"
    padding: "12px 20px"
  card-cta:
    backgroundColor: "{colors.card-cta-face}"
    textColor: "{colors.card-cta-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.card-capsule}"
    padding: "0 24px"
    height: "56px"
    width: "min(100%, 340px)"
---

# Design System: ZURY CORRETORA

## Overview

**Creative North Star: "ZURY black, white and silver"**

Preserve the original ZURY CORRETORA logo and approved self-hosted Inter Tight. The current digital card uses a monochrome animated background, a bounded silver card surface, graphite capsule controls with a CSS-only silver light trace, the navbar's glowing graphite COTAR AGORA capsule and the site's shared contacts popover. This is a source-derived record, not a new identity proposal.

Scope matters: card typography and capsule controls apply to `/cartao`, not to an unsolicited landing redesign. `src/styles.css` retains the landing's graphite, silver and paper surfaces, tracked uppercase display/controls and natural-case reading copy. `src/components/site/header-desktop.css` retains its silver capsule navigation; `src/components/site/quote-cta.css` owns the graphite COTAR AGORA capsule (custom properties `--quote-graphite-face`, `--quote-graphite-face-hover`, `--quote-graphite-shadow`, `--quote-graphite-ink` on `:root`) and `src/components/site/brand-shine.css` the logo shine shared by the navbar and the card. PRODUCT.md owns product truth; `.impeccable/surfaces/src-routes-cartao-tsx.md` owns the card composition.

**Key Characteristics:**
- Original logo and local variable font.
- Black, white and silver with no saturated card accent.
- Graphite capsule card controls sharing the COTAR AGORA face and hover, one glowing graphite COTAR AGORA capsule (the navbar's), and a WhatsApp control that opens the shared contacts popover.
- Decorative motion, including the Silver Light Trace, runs for every visitor, including those whose system requests reduced motion (owner's decision, no exceptions); Velaris and the word rotation pause in hidden tabs.

## Colors

### Primary

Card text is the high-emphasis role; silver supplies the card surface and the control-edge material rather than a saturated action hue. Card muted is supporting copy; card line is a separator, not a text role.

### Neutral

Card background is the scoped near-black base. Card controls and COTAR AGORA share the graphite face from `quote-cta.css` (`#101112` to `#030405`, hover `#1c1d1e` to `#08090a`) with light ink; the card no longer has a white control. The contacts popover is the site's shared sheet. These are component treatments, not additional brand accents. The landing uses ink backgrounds, silver text and paper light sections from its existing root variables; its header COTAR AGORA is the same graphite capsule.

**The Scope Rule.** Card-specific colors and geometry stay inside the card surface; do not overwrite the landing's root tokens to imitate this page.

## Typography

Display and body use Inter Tight with Arial and sans-serif fallbacks. The variable WOFF2 at `/fonts/inter-tight-latin.woff2` covers weights 100–900, uses normal style and `font-display: swap`.

The frontmatter records desktop card roles. The headline is rendered in capitals by CSS (`text-transform: uppercase`) at the display role. At max-width 820px, display becomes `clamp(36px, 8.6vw, 52px)`, section headings 25px, section copy 15px and channel/WhatsApp labels 13px. The contacts popover is rendered outside `.card-page` and keeps the site's own type, exactly as on the home page. Elsewhere the card resets inherited uppercase and tracking; this is not a global typography migration.

## Layout

The desktop card wrapper is `min(960px, calc(100% - 96px))` with 32px inline padding and a 28px radius. Content runs in one centered column: masthead (200px logo, 40px vertical padding), headline with COTAR AGORA below it (`min(100%, 340px)` wide, 56px minimum height, 28px above), then the official channels as a full-width single-column list with 12px gaps, and finally the contacts heading with one full-width WhatsApp control; channels and contacts are separated by 44px. The footer sits outside the card at the same width, 56px below.

At max-width 820px the wrapper becomes `min(600px, calc(100% - 32px))` with 16px padding and a 24px radius, the logo 160px, COTAR AGORA full-width at 54px minimum height, and channel gaps 10px; the outside footer becomes `min(600px, calc(100% - 64px))`. At max-width 370px the wrapper uses `calc(100% - 24px)` with 12px padding and a 136px logo.

The landing is unchanged: its container uses `min(calc(100% - var(--gutter) * 2), 1320px)` and gutter `clamp(20px, 4.5vw, 72px)`. Its separate desktop navigation begins at min-width 1100px, has a 1760px maximum width and a viewport-minus-40px measure. Do not substitute card breakpoints for that header.

## Elevation & Depth

The card keeps a viewport-fixed dark Velaris atmosphere behind a bounded silver surface (satin gradient, faint guilloche, watermark logo, 1px light border and a deep drop shadow). COTAR AGORA is exactly the header capsule: `.quote-graphite.quote-graphite--glow` from `src/components/site/quote-cta.css` (graphite face, entry edge sweep, continuous satin glow and breathing halo without hover), sized for the card by `.card-quote-cta`. Secondary controls wear the same face, shadow and hover through the `--quote-graphite-*` custom properties, without the glow, lift or edge sweep. The contacts popover is the shared site sheet. The landing desktop header has its own inset highlights and diffuse shadow; that treatment is not a card-container rule.

Silver Light Trace (`src/components/ui/silver-trace.tsx`/`.css`) is CSS-only: a 1px satin silver-graphite ring masked to the control's border box, so it follows the control's radius and never reaches its face, plus a light carried along the border via `offset-path`, with a conic sweep fallback where border-box motion paths are unsupported. On COTAR AGORA (`loop`) the beam travels the edge continuously (4.2s per lap). On the channels and the WhatsApp button the beam passes once (1.2s) and the ring brightens on hover (fine pointers) or focus-visible, without moving or resizing the control. `tone="graphite"` renders the same finish in dark graphite for light-faced controls. There is no JavaScript sequencer and no reduced-motion gating (owner's decision); the trace is hidden in forced-colors mode. Word rotation is 9s; it and Velaris pause in hidden tabs.

## Shapes

Card actions use capsule corners and the silver card 28px (24px on mobile); the contacts popover keeps the site's shared sheet shape. The landing's existing small control/card radii remain intact, while its desktop navigation independently uses a capsule silhouette.

## Components

### Buttons

The card control family has a 48px minimum height, 12px 20px padding, 15px text, centered inline-flex contents and a 10px gap; secondary controls carry the hover/focus trace pass. COTAR AGORA is the card CTA: the navbar's glowing graphite capsule, `min(100%, 340px)` × 56px (full width × 54px at ≤820px), 17px text, carrying the looping trace; it opens the shared quote dialog. Hover-capable devices switch secondary control faces to the graphite hover face with a subtle inner light; active controls scale to 0.985. Keyboard focus uses a 2px outline offset by 5px. Real quote and menu behaviors remain in React, not in static documentation snippets.

### Navigation

Card official channels are native anchors styled as full-width graphite capsules with the silver trace ring, icon, label and arrow, in this order: Site institucional, Instagram, TikTok, Facebook, E-mail and Nos avalie. This is not the landing's main navigation. Facebook uses the official destination in `digitalChannels.facebook`. External destinations retain their new-tab notice and safe link relation; E-mail uses `mailto:`.

### WhatsApp contacts menu

Under the heading "Fale com a ZURY.", one WhatsApp control (graphite capsule with the silver trace ring, with a chevron that turns when open) opens the site's shared `ChannelsPopover` (`#card-contact-channels`, title "Contatos", placed above the trigger): the same contacts and links as the home page. Its WhatsApp row expands THIAGO — CORRETOR, VALDIR — CONSULTOR and JOANA — SAÚDE, each opening `wa.me` in a new tab with its own accessible name, and an E-mail row uses `mailto:`. Outside click, the close button and Esc close it. The card offers no `tel:` call actions.

## Do's and Don'ts

### Do:
- **Do** preserve the original logo and approved self-hosted Inter Tight.
- **Do** keep card overrides scoped and preserve the unchanged landing styles.
- **Do** retain native actions, visible keyboard focus and stable accessible wording for rotating text.
- **Do** keep the looping trace on COTAR AGORA only; other card controls get a single pass on hover/focus-visible.
- **Do** keep the card COTAR AGORA identical to the navbar's glowing graphite capsule and the secondary controls on the same graphite face without the glow.

### Don't:
- **Don't** add saturated accent colors to the approved card palette.
- **Don't** describe static previews as running the Silver Light Trace, the COTAR AGORA glow or Velaris animation.
- **Don't** reintroduce the LiquidMetal edge, `@paper-design/shaders` or a white card CTA without a new owner request.
- **Don't** reintroduce demonstration testimonials or replace the official Facebook destination with an invented one.

Evidence: `src/styles.css`, `src/digital-card.css`, `src/digital-card.tsx`, `src/components/site/header-desktop.css`, `src/components/site/quote-cta.css`, `src/components/site/brand-shine.css`, `src/components/site/channels-popover.tsx`, `src/components/ui/silver-trace.tsx`/`.css`, PRODUCT.md and the scoped surface contract. The snapshots cited earlier (`.impeccable/review/desktop.png`, `mobile.png`) are not in the repository and predate the 2026-10-30 card changes. This documentation pass does not claim a new browser, contrast or SEO audit.
