# E2E Lots 1 & 2 — Progress & Restoration Point

> Date: 2026-07-28 (end of session) — branch `feature/e2e-test` (from origin/main @ bfefc0b; generic name on purpose — it carries all lots)
> Plan: see `.harness/cypress-test-plan.md`.

## Status: lots 1 AND 2 COMPLETE — all pushed to PR #438

**PR #438** (https://github.com/Jahia/luxe-jahia-demo/pull/438), still awaiting
human review (only Copilot commented; its lint-script portability remark is
fixed with cross-env in 6981e3d and answered on the thread).

Lot 2 commits (2026-07-28): d64eae8 (spec 50 stale-DOM race fix) → 6981e3d
(cross-env lint) → ef90769 (spec 51 + SearchEstatePage page object) → 8016a8f
(spec 52 SSR params) → 2c04458 (spec 40 + category/jcrQuery fixtures) →
926b38f (spec 41 editframe alerts) → 9979278 (**fix**: contact form raw i18n
key) → a466344 (spec 60) → ea9acdb (spec 61) → 4c7964b (Vitest 1-3 +
parsePagination extraction).

Full local run (Jahia docker, root/root1234): **75/75 e2e over 20 spec files
(~2 min 24)** + **48/48 Vitest** in packages/template-set. Lint + tsc green in
both `tests/` and `packages/template-set`.

## Next session (resume here)

1. **Follow the PR #438 review** — now covers lots 1+2.
2. **File the core srcset bug report** — draft ready in
   `.harness/core-srcset-bug-report.md`. Tracker to pick (JIRA core vs
   GitHub): ask the user.
3. **Lot 3** (plan §3): `i18n-seo/` 70-71, `editing/` 80-81 (needs
   `@jahia/jcontent-cypress` — Formidable's pagebuilder specs are the model),
   `import/` 90-91; Vitest 4-6 (submitContact, CTA mapping, geocodeAddress).
4. Then **issue #435** (site-review findings: html lang, titles, contrasts…).

### Observations for the team (not yet filed)

- **SearchEstate island has no popstate listener**: browser back/forward
  restores the URL but not the displayed results (locked as-is in spec 51).
- **Contact form does not validate the email format**: submit enables on any
  non-empty string (`isFormValid` truthiness only); `type=email` never runs
  because the submit button is `type="button"`.

## Done — lot 2 (this session)

- **Spec 50 flake root-caused**: after checking a filter, the old cards match
  the same selectors — `should('exist')` passed on stale DOM and the test
  clicked a card from the previous result set. Fix: alias the island's
  GetContentPropertiesQuery via `cy.intercept` (match on operation name — the
  endpoint serves other queries) and retry until the DOM hrefs `deep.equal`
  the response URLs. Pattern lives in `page-object/SearchEstate.ts`
  (`interceptSearch` / `waitForResults` / `applyFilter`).
- **search/51**: page nav, page-size reset to page 1, URL pushState +
  back/forward, scroll-to-top after commit, empty state (house+1bd = 0 hits).
- **search/52**: SSR asserted via `cy.request` raw HTML (no JS → island can't
  mask server regressions); expected results recomputed via GraphQL with the
  view's criteria; limit clamped [1,100], defaults on junk, page 0 = page 1.
- **query/40**: order asc/desc (sequential creation fixes jcr:created),
  maxItems, startNode scoping, category filter, excludeNodes. Fixtures:
  `createJcrQuery`, `createCategory`/`deleteCategoryIfExists` (global
  system-site nodes: unique names, cleanup + publish of
  `/sites/systemsite/categories` to sync live), blogPost `categoryUuids`.
- **query/41**: edit-mode-only alerts rendered through
  `/cms/editframe/default/en/...` (200 + full page markup with
  `div[jahiatype=module][path=...]` wrappers to scope per component;
  `/cms/edit/...` 302s to the SPA — useless for assertions). Empty queries
  must be scoped via startNode to an empty folder — a site-scoped query sees
  the other fixtures regardless of creation order.
- **forms/60**: gate on all-fields-filled, demo feedback (role=status,
  $name replacement), target POST payload asserted via intercept, 500 →
  translated alert. Each variant on its own page (hardcoded input ids).
- **fix shipped**: `Contact.client.tsx` used `t("form.unknownError")` — key
  exists only as `form.login.unknownError` → raw key shown to visitors on
  POST failure. Moved to `form.contact.unknownError` + added to all 4 locales.
- **forms/61**: uses the **footer** loginForm (Layout renders one on every
  page — creating another one duplicates ids/anchors). Anonymous card, dialog
  login (root), workspace links, bad-creds alert, Enter/Escape, logout,
  cache.perUser both directions (login → reload → clearCookies → reload).
  Hydration race: pre-hydration click follows the anchor href to /cms/login —
  fix: `removeAttr('href')` (handler preventDefaults anyway) + clickUntilVisible.
- **Vitest**: `JcrQuery/utils.test.ts` (buildQuery SQL2, 10 tests),
  `SearchEstate/pagination.ts` extracted from results.server.tsx +
  `pagination.test.ts` (8), `SearchEstate/graphql.test.ts` (criteria building
  + response mapping, 9). 48 total with imageNodeToProps.

## Key discoveries (lot 2 — do not rediscover)

8. **Island re-render races**: any assertion after a filter/pagination action
   must sync against the network response (see SearchEstatePage) — `exist`
   assertions pass on stale DOM.
9. **`/cms/editframe/default/en/<path>.html` renders edit mode directly**
   (basic auth/session OK) — the only URL-addressable way to assert
   edit-mode-only markup without driving the Page Builder SPA.
10. **Categories are global** (`/sites/systemsite/categories`) and their
    weakrefs resolve in LIVE too → publish the categories tree after create
    AND after cleanup delete; use unique `luxe-e2e-*` names.
11. **The Layout footer embeds a loginForm on every page** — never create a
    second one on a test page (duplicate `#loginForm`/ids break selectors).
12. **Pre-hydration clicks on island anchors navigate away** (href is real,
    handler not yet attached). Neutralize the href, then retry-click.
13. **Docker Desktop crashed mid-run once** (ECONNRESET on provisioning API,
    container "Up 2 minutes") — spec failures right after that are
    infrastructure noise; wait for :8080 then re-run.

## Key discoveries (lot 1 — kept)

1. **JCR enforces `mandatory` on save** (creation AND property deletion) via GraphQL — fixtures auto-fill; W-1 scenarios via dangling weakrefs.
2. **Touching a locale triggers full mandatory-i18n validation for that locale.**
3. **`cy.apollo` swallows GraphQL errors** — `yieldRef` asserts errors === undefined.
4. **`luxe:estate` cannot live in `jnt:contentFolder`** — only under `luxe:agency`.
5. **Local GraphQL curl needs `Referer: http://localhost:8080`** with `-u root:root1234`. (MCP `executeGraphQL` works directly.)
6. **MCP server URL** is `/modules/community-mcp` — fixed in root `.mcp.json`.
7. **Provisioning hook** (`support/e2e.js`): `luxe-prepackaged-website/` specs reuse the imported `luxe` site (read-only!); other folders get `luxe-test-site` recreated per spec file. Folder placement decides the fixture site.

## Environment notes

- Local Jahia: docker `jahia` (jahia-ee-dev:8-SNAPSHOT), root/root1234, hosts `FormidableSite4Tests` — do not disturb. `luxe-jahia-demo` 1.1.0-SNAPSHOT deployed from this branch (includes the contact-form i18n fix + parsePagination refactor).
- Run e2e: `cd tests && JAHIA_URL=http://localhost:8080 SUPER_USER_PASSWORD=root1234 npx cypress run --spec "cypress/e2e/<folder>/XX.cy.ts"`.
- Run unit: `cd packages/template-set && yarn vitest run`.
- Failure details: `results/reports/mochawesome*.json` (`.err.message`), `results/cypress-logs/`.
- **`yarn`/`tsc`/`eslint` for tests run from `tests/`, not the module root** (recurring footgun this session).
