# E2E Lot 1 — Progress & Restoration Point

> Date: 2026-07-27 — branch `feature/e2e-test` (from origin/main @ bfefc0b; generic name on purpose — it will carry the next lots too)
> Plan: see `.harness/cypress-test-plan.md`. Proposed PR title: `test: cypress e2e infrastructure & lot 1 coverage (smoke, content regressions, images)`

## Done

- **Infra** (`tests/cypress/`): `support/commands.ts` (console guard: `cy.visitAndCaptureConsole` + `cy.assertNoConsoleErrors`), `support/fixtures/content.ts` (builders: contentFolder, uploadImage, estate, realtor, agency, blogPost, textIllustrated — Formidable-style), `page-object/` (`NavMenu`, `Footer` on `BaseComponent`).
- **Migrations**: `searchEstate` → `luxe-prepackaged-website/search/50-search-filters.cy.ts`, `seoMeta` → `i18n-seo/72-seo-page-meta.cy.ts`, `previewMode` → `editing/82-preview-mode.cy.ts`, `dummyTest.cy.ts` removed (superseded by smoke).
- **New specs**: `luxe-prepackaged-website/smoke/10-11-12`, `luxe-prepackaged-website/images/30-31`, `content/20-25`.
- **Repairs**: `yarn lint` script (flat-config detection broke it → `ESLINT_USE_FLAT_CONFIG=false`), `tests/tsconfig.json` (no target/lib = broken ES5 type-check → es2019 + skipLibCheck), lint violations in `test-helpers.ts`. Lint + `tsc --noEmit` are green.
- **Verified locally**: `content/25-layout.cy.ts` passes 4/4 (local Jahia, module rebuilt & deployed).

## Key discoveries (cost hours — do not rediscover)

1. **JCR enforces `mandatory` on save** (creation AND property deletion) via GraphQL — "all props optional at runtime" applies to rendering, not to API writes. Fixtures auto-fill mandatory fields; W-1 scenarios are produced via dangling weakrefs (delete the referenced image node).
2. **`cy.apollo` swallows GraphQL errors** (constraint violations return a uuid then roll back). `yieldRef` in fixtures now asserts `errors === undefined` + uuid is a string → hooks fail loudly.
3. **`luxe:estate` cannot live in `jnt:contentFolder`** — only `luxe:agency` declares `+ * (luxe:estate)`. Estates must be created under an agency (spec 20 rewritten accordingly).
4. **Local GraphQL curl needs `Referer: http://localhost:8080`** header with `-u root:root1234`, else "Permission denied".
5. **MCP server URL** is `/modules/community-mcp` (NOT `/modules/mcp` from the store doc) — fixed in root `.mcp.json`; token valid.

## Current blocker (resume here)

`content/20-estate-detail.cy.ts` before-hook fails: `uuid of created node .../estate-agency/full-estate: expected undefined to be a string` — estate creation under the agency returns no uuid and no visible GraphQL error. Hypotheses, in order:
1. `createAgency` itself failed (parent missing) — suspect `creationDate` value `'2020-01-01T00:00:00.000'` vs GraphQL DATE type; probe agency existence first.
2. Weakref `values` array handling in `@jahia/cypress` `addNode` for `images`.

Probe with MCP `executeGraphQL` (or curl + Referer): create agency alone, then estate alone with a real image uuid, read the exact server error.

## Remaining steps

1. Fix spec 20, then run all `content/` specs → green.
2. Run `luxe-prepackaged-website/` specs locally — the `luxe` site does NOT exist on the local instance, so the prepackaged import (maven LATEST) is safe/non-destructive; validates smoke + images assertions against real markup (hero image presence on home is assumed, verify).
3. Iterate on failures (selectors on prepackaged content, console-error allowlist for Leaflet/geocode if needed).
4. Update `.harness/cypress-test-plan.md` (§3 note: folder layout is constrained by the provisioning hook in `support/e2e.js` — specs under `luxe-prepackaged-website/` get the luxe import, others get the generic site).
5. Commit, push, open PR (title above, standard body template from `~/.claude/CLAUDE.md`).

## Environment notes

- Local Jahia: docker `jahia` (jahia-ee-dev:8-SNAPSHOT), root/root1234, hosts `FormidableSite4Tests` — do not disturb. `luxe-jahia-demo` 1.1.0-SNAPSHOT deployed (rebuilt from this branch = main).
- Run: `cd tests && JAHIA_URL=http://localhost:8080 SUPER_USER_PASSWORD=root1234 npx cypress run --spec "cypress/e2e/content/XX.cy.ts"`.
- Failure details: `results/reports/mochawesome*.json` (`.err.message`), `results/cypress-logs/`.
