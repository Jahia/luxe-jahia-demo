# E2E Lot 1 — Progress & Restoration Point

> Date: 2026-07-27 — branch `feature/e2e-test` (from origin/main @ bfefc0b; generic name on purpose — it will carry the next lots too)
> Plan: see `.harness/cypress-test-plan.md`. PR title: `test: cypress e2e infrastructure & lot 1 coverage (smoke, content regressions, images)`

## Status: lot 1 COMPLETE — all specs green locally

Full local run (Jahia docker, root/root1234): `content/` 21/21, `i18n-seo/` 3/3,
`editing/` 2/2, `smoke/` 8/8, `images/` 6/6, `search/` 3/3. Lint + `tsc --noEmit` green.

## Done

- **Infra** (`tests/cypress/`): `support/commands.ts` (console guard: `cy.visitAndCaptureConsole` + `cy.assertNoConsoleErrors`; island helper `cy.clickUntilVisible`), `support/fixtures/content.ts` (builders: contentFolder, uploadImage, estate, realtor, agency, blogPost, textIllustrated — Formidable-style), `page-object/` (`NavMenu`, `Footer` on `BaseComponent`).
- **Migrations**: `searchEstate` → `luxe-prepackaged-website/search/50-search-filters.cy.ts`, `seoMeta` → `i18n-seo/72-seo-page-meta.cy.ts`, `previewMode` → `editing/82-preview-mode.cy.ts`, `dummyTest.cy.ts` removed (superseded by smoke).
- **New specs**: `luxe-prepackaged-website/smoke/10-11-12`, `luxe-prepackaged-website/images/30-31`, `content/20-25`.
- **Repairs**: `yarn lint` script (flat-config detection broke it → `ESLINT_USE_FLAT_CONFIG=false`), `tests/tsconfig.json` (no target/lib = broken ES5 type-check → es2019 + skipLibCheck), lint violations in `test-helpers.ts`.
- **Blocker fixes (2026-07-27, this session)**:
  - `content/20` before-hook: setting any `fr` i18n value makes the JCR validate **all mandatory i18n fields for that locale** — the estate fixture sent `title` fr without `description` fr → `GqlConstraintViolationException` (uuid returned, save rolled back). Fix: `createEstate` now pushes the fr description whenever `titleFr` is set.
  - Gallery hydration flake in spec 20: a single `.click()` can land before the island hydrates (SSR markup exists, handler not attached). Fix: `cy.clickUntilVisible(clickSel, expectSel)` command (retry click every 500 ms, 10 attempts).
  - Spec 31 (srcset live integrity): `home/buy.html` serves **no** srcset — SearchEstate cards are a client island rendering plain `src` (no `srcSet`, no `?w=`). Replaced by blog post `home/blog/main/blog-posts/geneva.html` (2 srcSet SSR). Note: React SSR emits the attribute as `srcSet` (capital S) in Jahia JS modules — case-sensitive greps miss it; CSS selectors/Cypress are fine.

## Key discoveries (cost hours — do not rediscover)

1. **JCR enforces `mandatory` on save** (creation AND property deletion) via GraphQL — "all props optional at runtime" applies to rendering, not to API writes. Fixtures auto-fill mandatory fields; W-1 scenarios are produced via dangling weakrefs (delete the referenced image node).
2. **Touching a locale triggers full mandatory-i18n validation for that locale** (see blocker fix above).
3. **`cy.apollo` swallows GraphQL errors** (constraint violations return a uuid then roll back — and the error may not even surface in `result.errors`). `yieldRef` in fixtures asserts `errors === undefined` + uuid is a string → hooks fail loudly.
4. **`luxe:estate` cannot live in `jnt:contentFolder`** — only `luxe:agency` declares `+ * (luxe:estate)`. Estates must be created under an agency.
5. **Local GraphQL curl needs `Referer: http://localhost:8080`** header with `-u root:root1234`, else "Permission denied". (MCP `executeGraphQL` works directly.)
6. **MCP server URL** is `/modules/community-mcp` (NOT `/modules/mcp` from the store doc) — fixed in root `.mcp.json`; token valid.
7. **Provisioning hook** (`support/e2e.js`): specs under `luxe-prepackaged-website/` delete & re-import the `luxe` prepackaged site per spec file (~2 min 30 each); all other folders delete & recreate `luxe-test-site`. Folder placement of a spec decides its fixture site.

## Remaining steps

1. Commit (this session's fixes), push, open PR (title above, standard body template from `~/.claude/CLAUDE.md`).
2. Next lots (see plan §3): `query/` 40-41, `search/` 51-52, `forms/`, remaining `i18n-seo`/`editing`/`import` specs, Vitest plan §4.

## Environment notes

- Local Jahia: docker `jahia` (jahia-ee-dev:8-SNAPSHOT), root/root1234, hosts `FormidableSite4Tests` — do not disturb. `luxe-jahia-demo` 1.1.0-SNAPSHOT deployed (rebuilt from this branch = main).
- Run: `cd tests && JAHIA_URL=http://localhost:8080 SUPER_USER_PASSWORD=root1234 npx cypress run --spec "cypress/e2e/content/XX.cy.ts"`.
- Failure details: `results/reports/mochawesome*.json` (`.err.message`), `results/cypress-logs/`.
