# Template-Set Audit — `luxe-jahia-demo` (packages/template-set)

> Date: 2026-07-06
> Scope: full code review of the JavaScript template-set module (15 CND files, ~30 server views, client components, templates, settings). Performed with the `jahia-review-code` skill checklist.

## Overall assessment

The module is high quality overall: exemplary cache usage (`cache.requestParameters`, `cache.latch`, `addCacheDependency`), systematic i18n, centralized responsive image handling (`imageNodeToProps`), and a valid `import.xml` with a homepage. The findings below are ordered by severity.

---

## 🔴 Critical (4 issues)

### C-1 — `luxe:searchEstate` has `jmix:mainResource` but no `fullPage` view
- **Where**: `src/components/SearchEstate/definition.cnd:1`
- The `MainResource` template (`src/templates/MainResource/default.server.tsx:20`) renders `<Render view="fullPage" />` for every `jmix:mainResource` node → a searchEstate node rendered as a main resource breaks. This is also a W2 case: a search form is not detail-page content.
- **Fix**: remove `jmix:mainResource` from the supertype list (or add a `fullPage` view).

### C-2 — Stray `$` rendered on the estate detail page
- **Where**: `src/components/Estate/fullPage.server.tsx:83`
- `${surface.toLocaleString(locale)}` is inside JSX, not a template literal → the page literally displays "**$**250 m²".
- **Fix**: `{surface.toLocaleString(locale)}`.

### C-3 — Realtor page query has no WHERE clause when the realtor belongs to no agency
- **Where**: `src/components/Realtor/fullPage.server.tsx:67-81`
- If `refByNode` is empty, `queryRefinement` is an empty string and the query becomes `SELECT * FROM [luxe:estate]` with no constraint → every estate in the whole JCR (all sites) is listed.
- **Fix**: skip the query when `refByNode` is empty (or constrain to the current site path).

### C-4 — Weakreference node properties read without a correct cache dependency (skill check C5)
1. `src/mixins/CTA/index.tsx:35` — `cta["j:linknode"]?.getPropertyAsString("jcr:title")` without `addCacheDependency`: if the linked page title changes, the cached fragment stays stale.
2. `src/components/Realtor/fullPage.server.tsx:62` — `getNodeProps(agencyNode, ["name", "address"])` while the only dependency added is `flushOnPathMatchingRegexp: ${path}/.*`, which matches **descendants** of the agency, not the agency node itself → stale agency name/address on realtor pages.
- **Fix**: add `server.render.addCacheDependency({ node: <refNode> }, renderContext)` for each referenced node whose properties are read.

---

## 🟡 Warnings (6 issues)

### W-1 — Required props not guarded in views (skill check W4)
`types.ts` files declare mandatory CND fields as required, but **all props are optional at runtime**. Potential crashes:
- `src/components/Estate/default.server.tsx:31` — `images[0]` throws a TypeError if `images` is undefined; same for `fullPage.server.tsx:42` (`images.filter`) and unguarded `surface`/`price` `.toLocaleString()`.
- `src/components/HighlightNumber/default.server.tsx:12` — `number.toLocaleString(locale)`.
- `src/components/BlogPost/fullPage.server.tsx:56,75` — `new Date(undefined).toISOString()` throws a RangeError.
- **Fix**: mark props as `?:` in `types.ts` and guard in views.

### W-2 — `weakreference multiple` not null-filtered before `.map()` (skill check W5)
A deleted reference injects `null` into the array:
- `src/components/Agency/fullPage.server.tsx:47,188` — `realtors.flatMap(...)` and `realtors?.map(r => r.getIdentifier())`.
- `src/components/BlogPost/fullPage.server.tsx:96-104` — `relatedBlogPosts.slice(0,3).map(node => node.getIdentifier())`.
- **Fix**: `?.filter(Boolean)` before `.map()`. (`Estate/fullPage` and `JcrQuery/utils` already do this correctly.)

### W-3 — Hardcoded GraphQL endpoint on the client
- **Where**: `src/components/SearchEstate/graphql.ts:24`
- `fetch("/modules/graphql")` breaks when Jahia runs under a non-root context path. The Login component does it right: `buildEndpointUrl("/modules/graphql")` on the server, passed as an Island prop.
- **Fix**: pass the endpoint URL from the server view to the Island.

### W-4 — Redundant `jmix:droppableContent` supertype
- **Where**: `src/components/NavMenu/definition.cnd:1`
- `luxe:navigationMenu` extends `jmix:droppableContent` directly **and** `luxemix:luxeLayout` (which already provides it).
- **Fix**: remove `jmix:droppableContent` from the supertype list.

### W-5 — Dead content-editor-forms config
- **Where**: `settings/content-editor-forms/fieldsets/luxe_form.json`
- Targets type `luxe:form`, which does not exist in any CND.
- **Fix**: delete the file or realign it with `luxe:contactForm` / `luxe:loginForm`.

### W-6 — Copyright year frozen in the render cache
- **Where**: `src/templates/Layout.tsx:193`
- `new Date().getFullYear()` runs at render time; the cached footer fragment keeps the stale year after January 1st until the next flush.
- **Fix**: compute the year client-side or set a cache expiration.

---

## 🔵 Suggestions (6 issues)

### S-1 — Missing / orphan content-type icons (skill check S7)
- Missing: `settings/content-types-icons/luxe_blogPost.png`, `luxe_contactForm.png`, `luxe_loginForm.png` (blank squares in the content picker).
- Orphan: `luxemix_destination.png` matches no defined type.

### S-2 — Accessibility issues
- `src/components/Form/Login/LoginCard.client.tsx:65` — `<div role="button">` without `tabIndex` or keyboard handler → not keyboard-operable.
- `src/components/Form/Contact/Contact.client.tsx:61` — `role="info"` is not a valid ARIA role (use `role="status"`); line 77, `<a href="">` used as a button → use `<button>`.
- `src/components/NavMenu/NavigationToggler.client.tsx:18` — hardcoded, untranslated `aria-label="Toggle navigation"`.

### S-3 — Hardcoded English alt text
- `src/components/Estate/fullPage.server.tsx:56` — `alt: "Placeholder"` → use `t(...)`.

### S-4 — Untyped main areas (skill check S5)
- `src/templates/Page/centered.server.tsx` and `free.server.tsx` — `<Area name="main" />` without `nodeType`: every droppable type shows up everywhere. Acceptable for a free-design demo site, but a dedicated area type would tighten the editor UX.

### S-5 — `Date.now()` as a React key
- `src/components/SearchEstate/SearchResults.tsx` — `key={`search-${Date.now()}`}` remounts the whole list on every render, not just when results change. Derive the key from the search parameters instead.

### S-6 — CTA guard incomplete
- `src/components/TextIllustrated/default.server.tsx` — tests `props.ctaType !== "none"`: when `ctaType` is absent (legacy content), an `<a>` without `href` is rendered. Guard with `props.ctaType && props.ctaType !== "none"`.

---

## ✅ Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 4 |
| 🟡 Warning | 6 |
| 🔵 Suggestion | 6 |

**Strengths**: no leftover boilerplate, `ISDESCENDANTNODE` queries, exemplary cache handling in the `results` view, semantic HTML, complete `.properties` labels in 4 languages.

**Recommended next step**: fix the 4 critical issues first (targeted patches + `yarn build && yarn jahia-deploy`), then the warnings before handing the module to editors.
