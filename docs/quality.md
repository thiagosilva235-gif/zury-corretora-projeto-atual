# Quality

## Commands

| Command                                           | What it proves                                                                                                                                                                                       |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bun run typecheck`                               | `tsc --noEmit` with strict options over `src/`, `vite.config.ts`, `eslint.config.js`                                                                                                                 |
| `bun run lint`                                    | `eslint .`: TypeScript/React hooks rules, the `server-only` import ban, Prettier formatting, and the toolkit quality gates below. Errors fail; warnings are adoption debt                            |
| `bunx --bun eslint -c eslint.typed.config.js src` | Typed tier: `no-floating-promises` and `no-misused-promises` (warn)                                                                                                                                  |
| `bun eslint-rules/verify.mjs`                     | RuleTester self-check of the copied `quality/*` rules                                                                                                                                                |
| `bun run test`                                    | `node --test` unit tests: `src/lib/*.test.mjs` (content flags, companies, referrals, shield image, entrance motion, quote form) and `src/components/shield/geometry.test.mjs`. Needs Node 24 on PATH |
| `bun run test:e2e`                                | Playwright specs in `tests/e2e/` against `vite dev` on port 5173 using installed Chrome. Needs Node 24 on PATH                                                                                       |
| `bun run build`                                   | Production Nitro/Cloudflare build into `.output/`                                                                                                                                                    |

Combined local check (no publishing, no external services): `bun run typecheck && bun run lint && bun run test && bun run build`, plus `bun run test:e2e` for UI changes. Run a single unit file with `node --test src/lib/<file>.test.mjs` while iterating.

## Baseline rules (adapted)

- Strict TypeScript with the existing `tsconfig.json`; official TypeScript ESLint and React hooks presets.
- 350-line file budget (`quality/max-lines`) and the toolkit size/complexity budget, organized by real responsibility.
- Logging: no server logger exists; `console.error` in `src/server.ts`, `src/start.ts`, `src/lib/error-capture.ts` and a few components is the intentional error path (with Lovable reporting). `quality/no-direct-console` is therefore not enabled.
- No data layer: `quality/no-direct-data-access` and Drizzle guards do not apply.
- Input validation: the only user input is the quote form, validated client-side in `src/lib/quote-form.mjs` and unit-tested. No environment validation is needed (no runtime secrets).

## Lint quality gates (vibe-coding-toolkit 21b71b6)

Copied modules: `eslint-rules/index.cjs`, `core-rules.cjs`, `utils.cjs`, `verify.mjs` (Prettier-formatted, logic unchanged). Configured in `eslint.config.js` for `src/**`; test files skip `max-statements`, `max-lines-per-function` and `max-nested-callbacks`.

Measured on 2026-10-30 with `bunx --bun eslint . --rule "prettier/prettier: off"`:

| Rule                                        | Severity  | Before               | After                    | Plan                                                                     |
| ------------------------------------------- | --------- | -------------------- | ------------------------ | ------------------------------------------------------------------------ |
| Existing rules                              | unchanged | 0 errors, 0 warnings | 0 errors, 0 warnings     | Keep                                                                     |
| `quality/max-lines` (350)                   | warn      | —                    | 1 (`src/lib/content.ts`) | Split `content.ts` by section when next touched, then promote to `error` |
| `max-statements` (20)                       | warn      | —                    | 13                       | Warn by design; refactor when touching the function                      |
| `max-lines-per-function` (150)              | warn      | —                    | 13                       | Same                                                                     |
| `complexity` (12)                           | warn      | —                    | 7                        | Same                                                                     |
| `max-params` (4)                            | warn      | —                    | 5                        | Same                                                                     |
| `max-depth` (4), `max-nested-callbacks` (3) | warn      | —                    | 0                        | Promote to `error` if they stay at zero                                  |

Typed tier (`eslint.typed.config.js`): 5 warnings — `no-misused-promises` ×4 (`src/components/site/page-motion-runtime.ts` ×3, `src/components/ui/stats-band.tsx` ×1, a file deleted on 2026-10-30 with the A ZURY EM NÚMEROS section; not re-measured since), `no-floating-promises` ×1 (`src/routes/__root.tsx`). Runner cost on this workstation: ~19 s wall for the typed tier versus ~5–12 s for the default lint; memory not measured. It stays out of `bun run lint`; plan: fix the remaining sites, promote both rules to `error`, then add a `lint:typed` script.

Full `bun run lint` with Prettier currently fails on this Windows checkout because of CRLF line endings (pre-existing; see `docs/onboarding.md`). None of those errors come from the quality gates.

## Testing strategy

- Unit tests cover decisions and invariants (content flags, referral links, image integrity, geometry, quote validation/message). Tests that only pinned wording/CSS were removed on 2026-10-27; do not reintroduce them.
- E2E specs for critical browser flows live in `tests/e2e/` and run only against the local dev server. Add or update a spec when a change alters a user-visible flow.
- No coverage tool, CI or security guarantee exists; do not claim them.
- Harness method: native Harness2-inspired adaptation (toolkit `docs/prompts/15-harness-improvement.md` at 21b71b6). Initial smoke = the checks above. On a recurring agent failure, run one disposable baseline-vs-candidate comparison with the same inputs and checks, keep permissions unchanged, and record the adopted/rejected change in `docs/setup.md`. Behavioral cases from the toolkit's `docs/07-harness-evaluation.md` have not been run.

## Review after implementation or fixes

Select review scope by risk and the actual diff (behavior, regressions, accessibility/UX, security, configuration). Use an independent read-only reviewer for nontrivial work when available; record target, connected callers/tests, confirmed findings and coverage. Finish when findings are resolved or dispositioned and affected checks pass. Extra rounds need new evidence, unresolved risk or an explicit request; an agreed count is not reset by fixes.

## Security review

Use [security-review.md](security-review.md) (self-contained prompt from toolkit `docs/prompts/13-security-review.md`, revision 21b71b6). Repository mode for baselines; diff mode with explicit refs for changes. Read-only by default; the redacted report goes to a private directory outside the repository (for example `%LOCALAPPDATA%\security-reviews\` on Windows). `differential-review` is not installed; manual tracing is the fallback.

## Dependencies and delivery

`bun audit` (or `npm audit` on the delivery lockfile) checks advisories but transmits the dependency manifest to the registry; run it only with that disclosure authorized and record results. Passing lint/build does not mean a clean audit. Checks are explicit commands; no Git hooks, push blockers or branch requirements. Update this file together with scripts and rules.
