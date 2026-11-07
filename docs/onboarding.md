# Local preparation

## Prerequisites

- **Bun 1.3+** (observed 1.3.14) — package manager and script runner for development.
- **Node.js 24 LTS on PATH** — required by `bun run test` (`node --test`) and `bun run test:e2e` (the Playwright runner hangs under Bun on this setup), by `npx`-based tooling, and by the local ZIP delivery (`README.md`). Node 22 ≥ 22.13.0 is the documented fallback for delivery.
- **Git**, with normal commits to `main` (Lovable sync; never force-push).
- **Google Chrome** installed — Playwright uses `channel: "chrome"` instead of downloading browsers.

## First run

```sh
bun install        # uses bun.lock; bunfig.toml skips packages published < 24 h ago
bun run dev        # Vite dev server; open the URL it prints
```

No environment variable is required. `.env*` files are gitignored; never commit them. Optional build-time helpers `ZURY_BENEFITS_PREVIEW` / `ZURY_REFERRAL_PREVIEW` exist in `src/lib/content.ts` but no component currently reads them (`docs/architecture.md`).

After adding photos to `public/`, restart the dev server (they are enumerated at startup).

## Database

Not applicable: the site has no persistence (`docs/architecture.md`).

## Verify

```sh
bun run typecheck
bun run lint                 # 0 errors expected; toolkit budget warnings are informational
bun eslint-rules/verify.mjs  # self-check of the local quality rules
bun run test                 # Node 24 on PATH
bun run test:e2e             # Node 24 on PATH + Chrome; starts vite dev on port 5173
bun run build
bun run preview              # Wrangler local preview of .output/
```

All checks are local and credential-free. Details in [quality.md](quality.md).

## Agents

Read [AGENTS.md](../AGENTS.md). [CLAUDE.md](../CLAUDE.md) imports the same instructions. Consult [setup.md](setup.md) for toolkit coverage, pending global installs and the delegation policy.

## Known issues

| Symptom                                                                   | Verified cause                                                                               | Fix                                                                                                                                                                                         |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bun run test` fails with `node` not found                                | Script uses `node --test`; Node is not on PATH in this terminal                              | Node 24 LTS is installed (winget, user scope, 2026-10-30): reopen the terminal. Bun-only fallback: `bun test ./src/lib ./src/components/shield` (passed on 2026-10-30)                        |
| `bun run test:e2e` hangs under Bun                                        | Playwright worker processes do not run under Bun here                                        | Run with Node 24 on PATH                                                                                                                                                                    |
| `bun run preview` / `npm run preview` / `INICIAR-SITE.bat` stops with `write EOF` | Wrangler's local runtime (`workerd.exe`) cannot start without `MSVCP140.dll`, `VCRUNTIME140.dll`, `VCRUNTIME140_1.dll` (exit `0xC0000135`, DLL not found) | Handled automatically: `prepreview` runs `scripts/workerd-runtime.mjs`, which, only when the Visual C++ 2015–2022 x64 runtime is not installed, copies Microsoft Edge's signed x64 copies next to `workerd.exe` (no admin). If no Edge copy exists, install https://aka.ms/vs/17/release/vc_redist.x64.exe as administrator |
| Hero poster 404 on `localhost` | `/__l5e/assets-v1/...` files are hosted by Lovable's CDN; the hero video itself is served from `public/hero/` | Expected locally (dev and preview) when the `__l5e` copies are missing; they load on the Lovable site |
| `npm install` warns "install scripts not yet covered by allowScripts" | npm 11 blocks dependency install scripts by default | `package.json` `allowScripts` already allows `esbuild` and `workerd` (needed by Wrangler); review any new entry before approving it |
| `node --test` could not resolve `@/assets/*.asset.json`                   | Path alias unsupported by plain Node                                                         | Fixed 2026-10-30: `content.ts` uses relative JSON imports with `with { type: "json" }`                                                                                                      |
| `bun run lint` reports thousands of `prettier/prettier` "Delete ␍" errors | Windows checkout with `core.autocrlf=true` produces CRLF files while Prettier defaults to LF | Lint with `bunx --bun eslint . --rule "prettier/prettier: off"` and check formatting with `bunx --bun prettier --check --end-of-line auto <files>`; permanent fix pending (`docs/setup.md`) |
| Build fails to replace files in `.output/` on Windows                     | A running `bun run preview` locks them                                                       | Stop the preview before building                                                                                                                                                            |
