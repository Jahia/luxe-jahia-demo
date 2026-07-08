# Image Architecture Audit — `design-system/Image` & `imageNodeToImgProps`

> Date: 2026-07-08
> Scope: value of the `Image` design-system component vs raw `<img>`, and simplification / re-architecture of `imageNodeToImgProps` (`packages/template-set/src/commons/libs/imageNodeToProps/`). Covers the design-system package and the 15 template-set views that render images.

## TL;DR

The `Image` design-system component already exists and is the right architecture — keep it. The real debt is elsewhere: (1) a ~15-line boilerplate duplicated across 13 views around `imageNodeToImgProps`, (2) dead code and a chatty API in the lib itself, and (3) a genuine performance issue — hero images are rendered with `loading="lazy"`, hurting LCP. Proposed fix: a server-side `LuxeImage` wrapper component that absorbs the boilerplate, plus a slimmed-down lib.

---

## 1. Diagnosis

### 1.1 The design-system `Image` component is justified and already adopted

`packages/design-system/src/Image/index.tsx` is used in 13 views and internally (`Slideshow`). Only 2 raw `<img>` remain outside Storybook stories:

- `template-set/src/components/NavMenu/default.server.tsx:37` (site logo)
- `template-set/src/components/Form/Login/LoginCard.client.tsx:82` (user avatar)

What the component provides:

- **Cross-cutting policies in one place**: `alt` always present (defaults to `""` for a11y linters), `loading="lazy"` only when both `width` and `height` are provided (lazy without reserved space would cause CLS), a shared base CSS class.
- **Jahia-agnostic**: the design-system package has no `@jahia/*` dependency, so it is Storybook-testable and reusable. The layering — dumb `Image` in the design system, JCR adapter in the template-set — is correct and must be preserved.
- **Single evolution point** for future additions (`decoding="async"`, `fetchpriority`, formats).

### 1.2 Performance bug: hero images are lazy-loaded

No call site overrides `loading`, so every raster JCR image with known dimensions gets `loading="lazy"` — including the above-the-fold hero images in `Header/default.server.tsx`, `Header/textUp.server.tsx`, and `Header/textDown.server.tsx`, which are typically the LCP element. Lazy-loading the LCP image is a known anti-pattern.

### 1.3 `imageNodeToImgProps` — what is good (keep)

- Requested sizes clamped to intrinsic dimensions (`j:width` / `j:height`).
- No resize params for vector images (SVG).
- Original URL returned when the resize would be a no-op.
- `srcSet` URL de-duplication.
- Intrinsic `width` / `height` returned (CLS prevention, enables the lazy heuristic).

### 1.4 `imageNodeToImgProps` — issues

1. **Dead code** — `PictureConfig` and `SourceInput` (`index.ts:12-40`) are exported but have no consumer: no `imageNodeToPictureProps` exists anywhere. ~40 lines of types + docs to delete.
2. **"No `sizes` by design" is contradicted in practice** — all 13 call sites set `sizes` immediately after the call, by mutation (`imageProps.sizes = "..."`). A `srcSet` without `sizes` makes the browser assume `100vw` (over-downloading), so `sizes` is not really optional: it should be a first-class parameter (of the wrapper component).
3. **The `Infinity` sentinel** — non-standard; it alone justifies `mapWidth`, half of the JSDoc, and a caveat block in `DEFAULT_WIDTHS`. Simpler equivalent: always append the intrinsic width as a candidate when it is known (the `Set` already de-duplicates). This removes `mapWidth` and `Infinity` from the public API.
4. **Needlessly nested config** — `{ imageNode, alt, config: { widths } }`: the `config` level adds nothing; flatten it.
5. **`sizedUrlOrOriginal`** — 5 positional parameters; `intrinsicHeight` is passed pointlessly in the `srcSet` loop; the no-op check can consume `meta` directly.
6. **No unit tests** — the logic (clamp, dedup, no-op detection) is pure computation and trivially testable.

### 1.5 The duplicated call-site boilerplate (main debt)

The following pattern is copied nearly verbatim in ~10 files (`Estate/default`, `BlogPost/tile|card|default|fullPage`, `Realtor/default|animate|fullPage`, `Agency/default|fullPage`, `TextIllustrated/default`):

```tsx
let imageProps: ImgHTMLAttributes<HTMLImageElement> = {
	src: buildModuleFileUrl(placeholder),
};
if (imageNode) {
	server.render.addCacheDependency({ node: imageNode }, renderContext);
	imageProps = imageNodeToImgProps({
		imageNode,
		alt: t("alt.estate", { estate: title }),
	});
	imageProps.sizes = "(max-width: 768px) 100vw, ...";
}
<Image {...imageProps} />;
```

Four responsibilities repeated at every call site: placeholder fallback, SSR cache dependency, node→props mapping, `sizes` assignment (by mutation).

---

## 2. Proposals

### P-1 — New server component `LuxeImage` (template-set)

Location: `packages/template-set/src/commons/components/LuxeImage/`. It keeps the design-system `Image` as the final renderer and absorbs the whole call-site boilerplate:

```tsx
<LuxeImage
	node={imageNode} // undefined → automatic placeholder
	alt={t("alt.estate", { estate: title })}
	sizes="(max-width: 768px) 100vw, 50vw"
	widths={[300, 600]} // optional, DEFAULT_WIDTHS otherwise
	priority // hero images only
	className={classes.image}
/>
```

Responsibilities: placeholder fallback, `addCacheDependency` (via `useServerContext`), call to `imageNodeToImgProps` (which becomes an internal detail), `sizes` pass-through, render `<Image>`.

Each view goes from ~15 lines to a single JSX element. Exception: `Estate/fullPage` (gallery → `Slideshow` expects raw props arrays) keeps a direct call to the function.

### P-2 — Add a `priority` prop to the design-system `Image`

Next.js-style: `priority` → `loading="eager"` + `fetchPriority="high"`, forwarded by `LuxeImage`. Use it in the three `Header/*` views to fix the LCP issue (§1.2).

### P-3 — Slim down `imageNodeToImgProps`

- Delete `PictureConfig` and `SourceInput` (dead code).
- Flatten the signature: `imageNodeToImgProps(node, { alt, widths, baseWidth, baseHeight })`.
- Drop the `Infinity` sentinel: always append the intrinsic width as a `srcSet` candidate when known; remove `mapWidth`; simplify `DEFAULT_WIDTHS` to `[600, 900, 1200, 1536]`.
- Refactor `sizedUrlOrOriginal` to take `meta` instead of 4 loose numbers.
- Stop exporting it from view code paths once `LuxeImage` is in place (only `LuxeImage` and `Estate/fullPage` consume it).

### P-4 — Migrate the 2 remaining raw `<img>`

- `NavMenu/default.server.tsx:37` → `LuxeImage` (it is a JCR node: also gains the missing cache dependency) or design-system `Image` at minimum.
- `LoginCard.client.tsx:82` → design-system `Image` (plain URL, client-side; `LuxeImage` is server-only).

### P-5 — Unit tests for the pure logic

Cover: clamp to intrinsic, vector short-circuit, no-op URL detection, `srcSet` dedup, base URL always present in `srcSet`, empty `widths: []` disables `srcSet`.

### Estimated impact

~−150 lines across views, ~−60 lines in the lib, +1 component (~50 lines) + tests; hero LCP fixed as a side effect.

### Migration order (iterative deploys)

1. P-2 (`Image.priority`) + P-3 (lib slim-down) — deploy, verify.
2. P-1 (`LuxeImage`) + migrate views one by one — deploy per batch.
3. P-4 (raw `<img>`) + P-5 (tests) — deploy, then `/jahia-review`.
