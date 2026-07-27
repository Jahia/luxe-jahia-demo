# Test Plan — Cypress E2E & Vitest (packages/template-set)

> Date: 2026-07-27
> Inputs: template-set code exploration, `.harness/template-set-audit.md` (fixed in PR #434), `.harness/image-architecture-audit.md` (fixed in PR #436), external QA recommendations ("Automated Test Scope"), and the test conventions of the **Formidable** module (`/home/hduchesn/Jahia/modules/Formidable/modules/formidable/tests`).

## 1. Current state

**Existing Cypress specs** (`tests/cypress/e2e/`):

| Spec | Covers |
|---|---|
| `previewMode.cy.ts` | Nav menu present in live + preview mode (fresh site) |
| `seoMeta.cy.ts` | Meta/og tags on pages, en + fr, absence when unset |
| `luxe-prepackaged-website/searchEstate.cy.ts` | Buy page: bedrooms filter, type filter + detail check, combined filters |
| `dummyTest.cy.ts` | Placeholder |

**Existing unit tests**: `imageNodeToProps.test.ts` (Vitest) — clamp to intrinsic, vector short-circuit, srcSet dedup, DAM `args` vs default-provider `?w=` routing, Cloudinary comma `%2C` encoding, alt defaulting. **Do not duplicate this logic in Cypress** — E2E only locks the rendered result.

**Audit fixes to protect by regression tests** (all merged): C-2 stray `$`, C-3 realtor-without-agency query, C-4 weakref cache dependencies, W-1 unguarded props, W-2 null refs in `weakreference multiple`, W-6 frozen copyright year, S-2 a11y fixes, S-6 CTA guard; PR #436: `LuxeImage`, hero `priority` (LCP), provider-routed resize, srcSet comma encoding.

## 2. Conventions to adopt (from Formidable)

- **Themed folders with numeric prefixes**: `e2e/<theme>/NN-name.cy.ts` (e.g. `validation/30-required-validation.cy.ts`). Numbers give execution order and stable references.
- **Page-object model** in `cypress/page-object/`, classes extending `BaseComponent` from `@jahia/cypress` (see Formidable's `Form.ts` + `elements/*`). For luxe: `EstateCard`, `SearchForm`, `NavMenu`, `LanguageSwitcher`, `ContactForm`, `LoginCard`, `Pagination`.
- **Programmatic fixtures** in `cypress/support/fixtures/`: typed builders that create content via GraphQL and return paths/uuids (Formidable's `createPublishedLiveFormPage`, `getSelectNode`…). For luxe: `createEstate`, `createRealtor`, `createAgency`, `createBlogPost`, `createJcrQueryComponent`.
- **Shared site hook**: a `useLuxeSite()` / `useTestSite()` helper (Formidable's `useFormidableSite`: `before` → deleteSite/createSite/enableModule, `beforeEach` login, `afterEach` logout). We already have `createTestSite` / `createLuxeSite` in `support/test-helpers.ts` — wrap them in the same hook style.
- **A test-plan markdown at tests root** (this file plays that role; Formidable has `conditional-logics-test-plan.md`).
- Formidable also has `security/` (direct HTTP guards, tampering) and `integrity/` (content-integrity GraphQL scans) folders — a content-integrity smoke scan after import is cheap to add here too.

## 3. Cypress E2E plan

Folder layout under `tests/cypress/e2e/` (existing specs migrate into it).

> **Note (lot 1):** the layout is constrained by the provisioning hook in
> `support/e2e.js` — specs under `luxe-prepackaged-website/` get the `luxe`
> prepackaged site, imported **once and reused** (the import takes 2-3 min, so
> these specs must stay read-only on the site; delete `/sites/luxe` to force a
> fresh import). Every other folder gets the generic `luxe-test-site` (deleted
> & recreated per spec file, content built by `support/fixtures/`). Place new
> specs accordingly.

### `smoke/` — landing & navigation (external reco: landing page, navigation, browser logs)

- **10-landing-page.cy.ts** — prepackaged `luxe` site home renders: hero header (`<h1>`), sections, highlight numbers, footer non-empty; all main pages of the nav respond 200 and render their `<h1>`.
- **11-navigation.cy.ts** — nav menu entries match children of `home` (extends existing `previewMode.cy.ts`), active page has `aria-current`, brand link points to home, skip link is first focusable element and targets `#main`.
- **12-browser-logs.cy.ts** + shared support hook — fail on `console.error` / uncaught exceptions on all main pages, **both anonymous (live) and logged-in (preview/edit)** contexts. Implement as a reusable `support/` listener so every spec benefits.

### `content/` — detail pages & audit regressions

- **20-estate-detail.cy.ts** — surface renders `250 m²` with no stray `$` (C-2); price/surface `toLocaleString` per locale (`1,500,000` EN vs `1 500 000` FR); estate without images/price renders without a 500 and shows the placeholder (W-1); gallery island next/prev works.
- **21-realtor-detail.cy.ts** — realtor with no agency lists **no** estates (C-3); cache dependency: update + publish the agency name, revisit realtor page → new value shown without manual flush (C-4).
- **22-agency-detail.cy.ts** — delete a referenced realtor → agency page still renders (W-2); estates section capped at 6; Leaflet map island loads; unresolvable address → error overlay, no crash.
- **23-blogpost-detail.cy.ts** — valid `<time datetime>`, category badges, related posts capped at 3, richtext body rendered; blogPost without date doesn't crash (W-1).
- **24-cta.cy.ts** (via TextIllustrated) — `internal` → href from `j:linknode` (survives language switch); `external` → `j:url`; `none`/absent `ctaType` → **no** `<a>` without href (S-6); label falls back to linked page title.
- **25-layout.cy.ts** — copyright year is the current year (client island, not the cached value — W-6); footer resource links have `target="_blank" rel="noreferrer"`.

### `images/` — PR #436 regressions

- **30-image-rendering.cy.ts** — hero `Header/*` images: `fetchpriority="high"`, no `loading="lazy"`; card images: `loading="lazy"` **and** `width`/`height` present (anti-CLS); local assets carry `srcset` with `?w=600`, `?w=900`… candidates clamped to intrinsic width; missing image → correct placeholder per type; every `<img>` has non-empty `alt`.
- **31-srcset-live-integrity.cy.ts** — in live mode, served `srcset` stays parseable: each `", "`-separated candidate is a valid URL + `Nw` descriptor (guards against core `SrcSetURLReplacer` corruption; commas emitted as `%2C`).

### `query/` — content retrieval (external reco: "query execution shown at bottom of pages, correct order, correct data")

- **40-jcr-query.cy.ts** — `luxe:jcrQuery` listing: expected items in the expected **order** (orderBy criteria + direction), `maxItems` respected, category filter, `excludeNodes` excludes current node, results data matches source nodes (title/image).
- **41-jcr-query-edge.cy.ts** — no result → `noResultText` (fallback `query.noResult`); edit mode: `role="alert"` warnings for broken category/exclude refs.

### `search/` — extends existing coverage (external reco: search scenarios)

- existing `searchEstate.cy.ts` moves here as **50-search-filters.cy.ts**.
- **51-search-pagination.cy.ts** — page & page-size change, URL pushState sync, browser back button, scroll-to-top, empty state (`form.estate.empty`).
- **52-search-server-params.cy.ts** — direct URL with params (`?type=house&page=2`) renders correct server-side results (validates `cache.requestParameters`); out-of-range `page`/`limit` values are clamped (max 100).

### `forms/` — external reco: contact form submission

- **60-contact-form.cy.ts** — submit disabled until valid (empty fields, malformed email); demo-mode feedback (`role="status"`, S-2); with `target` set, `cy.intercept` asserts POST payload; **no console errors during submission** (external reco).
- **61-login.cy.ts** — root login from footer → user card, workspace links (edit/preview/live) correct; wrong password → translated error; logout; `cache.perUser`: anonymous footer ≠ logged-in footer (no cached-fragment leak); login card keyboard-operable (S-2).

### `i18n-seo/`

- **70-language-switcher.cy.ts** — EN→FR switch keeps the same page (incl. mainResource detail pages), URL gains `/fr/`, UI labels translated, `aria-current` on active locale.
- **71-seo-main-resource.cy.ts** — extends `seoMeta.cy.ts` to detail pages: `<title>` = `{title} | {siteName}`, absolute og:url, correct og:locale in FR.
- existing `seoMeta.cy.ts` moves here as **72-seo-page-meta.cy.ts**.

### `editing/` — external reco: CRUD / jContent / Page Composer

- **80-jcontent-preview.cy.ts** — `cm` views (Estate/Realtor/Agency): jContent internal preview renders via `CMPreview` without error.
- **81-pagebuilder-crud.cy.ts** — in Page Builder: create a page, drop a `luxe:section` + `luxe:textIllustrated`, edit a property, verify render, delete (Formidable's `pagebuilder/70-pagebuilder-form-editing.cy.ts` is the model).
- existing `previewMode.cy.ts` moves here as **82-preview-mode.cy.ts**.

### `import/` — external reco: import process

- **90-import-site.cy.ts** — import the prepackaged site under **different site keys** (parameterized), verify home renders for each; measure and report import duration via `cy.task`/reporter as a basic performance signal (soft threshold, warn-only at first).
- **91-content-integrity.cy.ts** *(optional, Formidable pattern)* — run a content-integrity GraphQL scan after import, assert no errors on the site subtree.

### Blocked / prerequisites

- **Vanity URLs** — requires an update of the prepackaged site to include vanity mappings (external reco explicitly notes it). Test once the prepackaged site ships vanities: visit vanity → 200 + canonical content; old URL redirects.
- **DAM provider routing (Keepeek/Cloudinary)** — no external provider in CI; covered by Vitest (see §4), keep out of Cypress.

## 4. Vitest plan (pure logic, `packages/template-set`)

Existing: `imageNodeToProps.test.ts`. Add, in order of value:

1. **`JcrQuery/utils.ts` → `buildQuery`** — SQL2 assembly: `ISDESCENDANTNODE` on startNode vs site fallback, category constraint (`j:defaultCategory`), excludeNodes (incl. translation-node handling), ORDER BY criteria + direction, type injection. Pure string building → trivial to test, and it guards against a C-3-style regression (query without WHERE).
2. **`SearchEstate/results.server.tsx` param parsing** — extract the page/limit clamping + param normalization into a testable helper: negative/NaN/`>100` values, defaults.
3. **`SearchEstate/graphql.ts` criteria building** — constraints generated for country/type/bedrooms combinations; none set → still site-scoped (regression guard for repo-wide leaks).
4. **`Form/Contact/utils.client.ts` → `submitContact`** — mocked `fetch`: POST to `target` when set, demo feedback otherwise, jExperience `wem.buildFormEvent` pushed only when `window.wem` exists, error paths.
5. **`mixins/CTA` props mapping** — internal vs external vs none, label fallback to linked node title, missing `j:linknode` (needs a light JCR node mock — same approach as `imageNodeToProps.test.ts`).
6. **`commons/Map/geocodeAddress.ts`** — mocked fetch: address found, not found (throws "Address not found"), network error.

Not worth unit-testing: server views themselves (need full Jahia render context — that's Cypress's job), design-system visuals (Storybook).

## 5. Out of scope

- `imageNodeToProps` internals in Cypress (Vitest-covered).
- hreflang: absent from the code — a feature to build (with the LanguageSwitcher data) before it can be tested.
- 404 template: no error template exists in the module; add one first if desired.

## 6. Suggested implementation order

1. **Infra**: folder restructure + `useLuxeSite()` hook + browser-log support hook + first page-objects (`EstateCard`, `NavMenu`). Migrate the 3 existing specs.
2. **Lot 1**: `smoke/` + `content/` + `images/` (locks PR #434/#436 fixes + external recos: landing, navigation, logs).
3. **Lot 2**: `query/` + `search/` + `forms/` (external recos: search scenarios, query execution, contact form) + Vitest 1–3.
4. **Lot 3**: `i18n-seo/` + `editing/` + `import/` + Vitest 4–6.
5. **Later**: vanity URLs (after prepackaged-site update), content-integrity scan.
