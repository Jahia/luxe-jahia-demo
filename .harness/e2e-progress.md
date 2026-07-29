# E2E Lots 1-3 — Progress & Restoration Point

> Date: 2026-07-29 (end of session) — branch `feature/e2e-test` (from origin/main @ bfefc0b; generic name on purpose — it carries all lots)
> Plan: see `.harness/cypress-test-plan.md`.

## Status: lots 1, 2 AND 3 COMPLETE

**PR #438** (https://github.com/Jahia/luxe-jahia-demo/pull/438) — update title/body
to cover lot 3 if not done yet (check `git log origin/feature/e2e-test`).

Lot 3 commits (2026-07-29): 9195b62 (spec 70 + LanguageSwitcher page object) →
df64217 (spec 71) → f43bea2 (spec 80 + @jahia/jcontent-cypress dep) → 816f393
(spec 81) → 39d3ac7 (spec 90) → 61adf7f (Vitest 4-6 + vitest.config.ts).

Coverage after lot 3: **95 e2e over 24 spec files (94 pass + 1 documented skip, full run 6 min 11)** + **65 Vitest**.

## Done — lot 3 (this session)

- **i18n-seo/70-language-switcher** (prepackaged): locale links + aria-current,
  home EN→FR (URL /fr/, skip-link label translated), detail page switch both
  ways (same pathname ± /fr). New `page-object/LanguageSwitcher.ts`.
- **i18n-seo/71-seo-main-resource** (prepackaged): og:locale/og:type/
  og:site_name/absolute og:url + single h1 on estate/realtor/agency/blogPost
  detail pages, FR variant. **KNOWN GAP documented in an `it.skip`**: detail
  pages render NO `<title>`/og:title — mainResource types store their name in
  a type-specific `title` property, SeoMetaTags only reads `jcr:title` (feeds
  issue #435).
- **editing/80-jcontent-preview** (generic site): cm views of Estate/Realtor/
  Agency through JContent list mode → row context menu → Preview → iframe
  `[data-sel-role="edit-preview-frame"]`. Deps added: `@jahia/jcontent-cypress`
  ^3.6.0-tests.2 (works with @jahia/cypress 7.1), `cypress-real-events`,
  `cypress-iframe` (all imported in support/e2e.js).
- **editing/81-pagebuilder-crud** (generic site): create luxe:section from the
  area "New content" button (ContentTypeSelector), nest luxe:textIllustrated
  (title + richtext + mandatory image picked in the GRID-mode media picker),
  edit via module double-click, publish site → live render asserted, delete via
  list view (mark for deletion → PB deletion status → Publish deletion →
  "Publish now" dashboard → waitUntil gone from live).
- **import/90-import-site**: fresh measured import (deletes /sites/luxe first;
  ~148s import+publish, warn-only 5-min threshold), anonymous en+fr home
  render, light integrity scan (counts per content family in LIVE).
- **Vitest 4-6**: `Form/Contact/utils.client.test.ts` (submitContact: demo
  mode, target 200/500/network, window.wem bridge — 8 tests),
  `mixins/CTA/index.test.ts` (internal/external/dangling/label fallback/cache
  dependency — 6 tests), `commons/Map/geocodeAddress.test.ts` (found/cache/not
  found/network — 4 tests). Added `packages/template-set/vitest.config.ts`.

## Key discoveries (lot 3 — do not rediscover)

14. **jcontent-cypress page objects need `cypress-iframe` and
    `cypress-real-events`** imported in support/e2e.js — `cy.iframe is not a
    function` otherwise.
15. **`clickUntilVisible` expect-selectors must NOT start with `body`** — the
    command resolves them via `$body.find(...)`.
16. **CE field selectors**: `<primaryType>_<property>` (e.g.
    `luxe:section_jcr:title`) and `nt:base_ce:systemName`. Pin the system name
    (clearValue(true).addNewValue(name, true) — force, the field can be below
    the fold) to get deterministic module paths.
17. **After ce.create()/save() the PB iframe reloads** — re-open Page Builder
    (JContent.visit + switchToPageBuilder) before asserting; pb.refresh() is
    not reliable enough.
18. **Empty unrestricted areas show ONE "New content" button** →
    ContentTypeSelector dialog (`selectContentType('luxe:section')` by type
    id, search by display name).
19. **The media picker opens in grid mode** — `picker.search()` asserts on the
    table view and fails; use `picker.getGrid().getCardByName(...)`.
20. **Page list view flattens area lists** — components are direct rows of the
    page (no 'main' row to enter).
21. **The luxe-test-site pages only render in live once the whole site is
    published** — Layout's `getSite().getHome()` returns null in LIVE while
    home is unpublished → 500 `Cannot read property 'hasNode' of null`.
22. **Provisioning `importSite` has NO siteKey override in 8.2.4** (verified by
    decompiling org.jahia.bundles.provisioning ImportSite: only the URL is
    read; the skill/provisioning docs describing `siteKey:` apply to another
    version). Parameterized site keys are impossible → spec 90 documents it.
23. **Vitest + .tsx sources**: tsconfig has `jsx: "preserve"` (Jahia build owns
    the transform) → vitest needs `oxc: { jsx: { runtime: "automatic" } }` in
    its own vitest.config.ts (rolldown-vite ignores `esbuild.jsx`). JSX in
    *test files* still doesn't transform — write component tests in .ts and
    call the component as a function (hooks are mocked anyway).

### Observations for the team (not yet filed)

- **CORE BUG — PB context-menu Delete crashes jContent**: on 8.2.4.0-SNAPSHOT,
  right-click module → Delete throws `TypeError: Cannot read properties of
  undefined (reading 'sort')`, blanks the app, dialog never opens (screenshot
  reproducible via spec 81 if the workaround is reverted). Same family: header
  Edit button after `getHeader(true)` throws `... (reading 'uuid')`.
  Double-click works. Workaround in spec 81: delete via the page list view.
- **Detail pages have no `<title>`/og:title** (see spec 71 `it.skip`) — feeds
  issue #435 (titles).
- **Layout crashes in live when the site home isn't published** (discovery 21)
  — `getHome()` null-guard missing in VirtualNavMenu/Layout.
- (lot 2, still open) SearchEstate island has no popstate listener; contact
  form does not validate the email format.

## Next session

1. **Update PR #438 title/body** to include lot 3 (jcontent preview, page
   builder crud, i18n/seo, import, Vitest 4-6) — keep conventional-commit
   title, no capital after type.
2. **Follow the PR #438 review** (was still awaiting human review).
3. **File the core bug reports**: PB delete crash (observation above) and the
   srcset one (draft in `.harness/core-srcset-bug-report.md`; tracker to
   confirm with the user).
4. Then **issue #435** (site-review findings: html lang, titles — the spec 71
   skip re-enables once fixed, contrasts…).
5. Optional leftovers: spec 91 content-integrity (Formidable pattern), vanity
   URLs (blocked on prepackaged site update).

## Key discoveries (lots 1-2 — kept)

1. **JCR enforces `mandatory` on save** (creation AND property deletion) via GraphQL — fixtures auto-fill; W-1 scenarios via dangling weakrefs.
2. **Touching a locale triggers full mandatory-i18n validation for that locale.**
3. **`cy.apollo` swallows GraphQL errors** — `yieldRef` asserts errors === undefined.
4. **`luxe:estate` cannot live in `jnt:contentFolder`** — only under `luxe:agency`.
5. **Local GraphQL curl needs `Referer: http://localhost:8080`** with `-u root:root1234`. (MCP `executeGraphQL` works directly.)
6. **MCP server URL** is `/modules/community-mcp` — fixed in root `.mcp.json`.
7. **Provisioning hook** (`support/e2e.js`): `luxe-prepackaged-website/` specs reuse the imported `luxe` site (read-only!); other folders get `luxe-test-site` recreated per spec file. Folder placement decides the fixture site.
8. **Island re-render races**: sync assertions against the network response (SearchEstatePage pattern) — `exist` assertions pass on stale DOM.
9. **`/cms/editframe/default/en/<path>.html` renders edit mode directly** — the only URL-addressable way to assert edit-mode-only markup.
10. **Categories are global** (`/sites/systemsite/categories`) — publish the tree after create AND cleanup; unique `luxe-e2e-*` names.
11. **The Layout footer embeds a loginForm on every page** — never create a second one.
12. **Pre-hydration clicks on island anchors navigate away** — neutralize href, retry-click.
13. **Docker Desktop crashed mid-run once** — spec failures right after are infrastructure noise.

## Environment notes

- Local Jahia: docker `jahia` (jahia-ee-dev:8-SNAPSHOT), root/root1234, hosts `FormidableSite4Tests` — do not disturb. `luxe-jahia-demo` 1.1.0-SNAPSHOT deployed from this branch.
- Run e2e: `cd tests && JAHIA_URL=http://localhost:8080 SUPER_USER_PASSWORD=root1234 npx cypress run --spec "cypress/e2e/<folder>/XX.cy.ts"`.
- Run unit: `cd packages/template-set && yarn vitest run`.
- Failure details: `results/reports/mochawesome*.json` (`.err.message`), `results/cypress-logs/`; screenshots under `results/screenshots/` are worth Reading (they show the app state AND the command log).
- **`yarn`/`tsc`/`eslint` for tests run from `tests/`, not the module root** (recurring footgun). Template-set lint = `yarn lint` from the repo root (workspace-wide).
- Spec 90 deletes and re-imports `/sites/luxe` (~2.5 min) — alphabetically it runs before `luxe-prepackaged-website/`, which then reuses the fresh site.
