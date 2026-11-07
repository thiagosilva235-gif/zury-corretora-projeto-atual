<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the digital card free of testimonials: the demonstration stories were removed (Lovable commit `a8f8df7`); do not reintroduce reviews, ratings or customer stories without verified content supplied by the owner.
- Keep the digital-card atmosphere viewport-fixed so it stays visible while scrolling; respect hidden-tab automatic pauses. All motion, including the card's Silver Light Trace (`src/components/ui/silver-trace.tsx`/`.css`), runs regardless of the system reduced-motion preference by the owner's decision; there is no exception. LiquidMetal and `@paper-design/shaders` were removed again; do not reintroduce them without a new owner request.
- Keep the bounded translucent graphite digital-card surface over the fixed, full-viewport original-shield background around the brand, headline with its COTAR AGORA CTA (the navbar's glowing graphite `.quote-graphite.quote-graphite--glow` capsule, not white), official channels and the WhatsApp control only; the six channels and the WhatsApp control share the graphite face/hover without the glow, and the WhatsApp control opens the shared `ChannelsPopover` (`#card-contact-channels`). The trace beam loops only on COTAR AGORA; other buttons get one pass on hover/focus-visible. The footer sits outside on the fixed atmosphere The WhatsApp control immediately follows Site institucional.

## Product and stack

- ZURY CORRETORA landing (pt-BR copy). Scope and owner decisions: `PRODUCT.md`; visual system: `DESIGN.md` (both owned by Impeccable — do not rewrite them for setup work); full approved spec: `ZURY-SITE-SPEC.md`; official content data: `src/lib/content.ts`.
- TanStack Start 1.168 + React 19 + Vite 8 + Tailwind 4 + GSAP 3.15, strict TypeScript. `@lovable.dev/vite-tanstack-config` already wires the Vite plugins and the Nitro/Cloudflare build — never add them again in `vite.config.ts`.
- Bun (`bun.lock`) for development. Node 24 LTS + npm only for the local ZIP delivery described in `README.md`.
- Routes: `/`, `/cartao`, `/preview/escudo` (noindex) in `src/routes/` (file-based; never edit `src/routeTree.gen.ts`). Sections: `src/components/site/`; primitives: `src/components/ui/`.

## Canonical commands

- Install: `bun install` (24 h `minimumReleaseAge` in `bunfig.toml`; new exclusions need owner confirmation).
- Develop: `bun run dev`
- Types: `bun run typecheck`
- Lint: `bun run lint` (errors fail; toolkit size/complexity warnings are expected). Typed tier: `bunx --bun eslint -c eslint.typed.config.js src`
- Lint rule self-check: `bun eslint-rules/verify.mjs`
- Unit tests: `bun run test` (`node --test`, needs Node 24 on PATH; Bun-only fallback: `bun test ./src/lib ./src/components/shield`)
- E2E: `bun run test:e2e` (Playwright, specs in `tests/e2e/`, installed Chrome channel, starts `vite dev` on port 5173; needs Node 24 on PATH)
- Build / preview: `bun run build` then `bun run preview`
- Verify: `bun run typecheck && bun run lint && bun run test && bun run build`

## Constraints

- Lovable syncs `main`: normal commits only, keep `main` working, never force-push or rewrite pushed history.
- Reproduce official content literally from `src/lib/content.ts` / the spec. Never invent testimonials, ratings, numbers, contacts or destinations.
- Motion runs for every visitor regardless of `prefers-reduced-motion` (owner decision in `PRODUCT.md`), with no exceptions; do not reintroduce a static mode.
- Never commit `.env*`, tokens, `.output/`, `node_modules/` or personal paths. Publishing, messaging third parties, costs and destructive actions need explicit authorization.
- Read relevant code and docs first; make the smallest complete change; test real behavior; update the responsible doc in the same change.

## Map

- [docs/architecture.md](docs/architecture.md) — code map, boundaries, decisions.
- [docs/design.md](docs/design.md) — pointer to `DESIGN.md`/`PRODUCT.md`, accessibility and motion rules.
- [docs/onboarding.md](docs/onboarding.md) — local preparation and known issues.
- [docs/quality.md](docs/quality.md) — what each check proves, lint adoption plan, review policy.
- [docs/setup.md](docs/setup.md) — toolkit revision, coverage matrix, pending global installs, delegation policy, memory.
- [docs/security-review.md](docs/security-review.md) — reusable read-only security review prompt.
