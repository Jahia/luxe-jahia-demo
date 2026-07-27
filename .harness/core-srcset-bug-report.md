# Bug report — srcset URL rewriting corrupts URLs containing commas

> Ready to paste into the core tracker. Found on 2026-07-08 while integrating the Cloudinary picker in a JavaScript module (luxe-jahia-demo, PR #436).

## Summary

`SrcSetURLReplacer.getURLsFromSrcSet()` parses a `srcset` attribute with a naive `split(",")`, assuming every comma is a candidate separator. Commas are legal **inside** a srcset URL (the HTML spec only forbids a URL from starting or ending with one), and DAM asset URLs routinely contain them — Cloudinary transformation paths being the canonical case: `https://res.cloudinary.com/<cloud>/image/upload/f_auto,w_600/v1/img.jpg`.

When the URL-rewriting pipeline processes such a `srcset` (live rendering, `UrlRewriteVisitor`), the attribute is re-assembled with a space after each comma — including the commas *inside* URLs. Per the srcset parsing algorithm, a comma followed by whitespace terminates a candidate, so every candidate in the set becomes invalid and the browser falls back to `src` (or worse, fetches garbage relative URLs).

## Environment

- Jahia 8.2.x (reproduced on 8.2.1), JavaScript module rendering in live mode
- Any module emitting `srcset` URLs that contain commas (Cloudinary picker `cloudinary-picker`, or any hand-written Cloudinary/Imgix/Akamai-style transformation URL)

## Steps to reproduce

1. In any view, render an `<img>` whose `srcset` contains a Cloudinary-style URL:
   ```jsx
   <img
     src="https://res.cloudinary.com/demo/image/upload/f_auto,w_600/v1/sample.jpg"
     srcSet="https://res.cloudinary.com/demo/image/upload/f_auto,w_600/v1/sample.jpg 600w, https://res.cloudinary.com/demo/image/upload/f_auto,w_900/v1/sample.jpg 900w"
   />
   ```
2. Open the page in live mode and inspect the served HTML.

## Actual result

The `srcset` attribute is rewritten with a space injected after every comma, including inside URLs:

```html
srcset="https://res.cloudinary.com/demo/image/upload/f_auto, w_600/v1/sample.jpg 600w, https://res.cloudinary.com/demo/image/upload/f_auto, w_900/v1/sample.jpg 900w"
```

`f_auto,` followed by whitespace ends the first candidate at a URL that ends with a comma (invalid per spec); the remainder (`w_600/v1/sample.jpg 600w`) is parsed as a bogus relative URL candidate. The responsive image set is destroyed. The `src` attribute — a single URL, not routed through the srcset splitter — is untouched, which confirms the corruption happens in the srcset-specific path.

## Expected result

The `srcset` attribute is emitted unchanged (candidates rewritten individually if needed, inner commas preserved).

## Root cause

`core/src/main/java/org/jahia/services/content/interceptor/url/SrcSetURLReplacer.java:100-106`:

```java
public static String[] getURLsFromSrcSet(String srcSet) {
    return Arrays
            .stream(srcSet.split(","))
            .map(String::trim)
            .map(entry -> StringUtils.substringBefore(entry, " "))
            .toArray(String[]::new);
}
```

`split(",")` breaks a URL like `…/upload/f_auto,w_600/…` into fragments. Consumers then rewrite each fragment and patch it back into the attribute value:

- `core/src/main/java/org/jahia/services/seo/urlrewrite/UrlRewriteVisitor.java:103-108` (live URL rewriting) — where the corruption above is produced;
- `SrcSetURLReplacer.replaceRefsByPlaceholders` / `replacePlaceholdersByRefs` (URL interceptor on save) — same faulty extraction, so stored rich-text `srcset` values with comma URLs are equally at risk.

## Suggested fix

Implement the spec's image-candidate parsing instead of `split(",")`: a candidate is `<url> [<descriptor>]`, candidates are separated by a comma **followed by whitespace or preceding a new URL token**; a comma directly embedded in a non-whitespace run belongs to the URL. A pragmatic equivalent that covers real-world srcsets:

```java
// split on commas that are followed by optional whitespace and a scheme/slash start,
// or on ", " (comma + whitespace) which cannot occur inside a valid URL
srcSet.split(",\\s+")
```

(splitting on `,\s+` alone fixes the corruption for all URLs that are emitted spec-compliant, i.e. without `", "` inside; full spec parsing is the robust option).

Any rewriting of individual candidates must also re-assemble the attribute without introducing whitespace into the URL tokens.

## Workaround (module side)

Percent-encode commas (`%2C`) inside srcset URLs at emission time. Verified byte-identical on the Cloudinary CDN and it removes the ambiguity for the core splitter. Implemented in luxe-jahia-demo `packages/template-set/src/commons/libs/imageNodeToProps/index.ts` (PR #436).

## Related finding — React SSR emits camelCase attribute names (2026-07-27)

Pages rendered by JavaScript modules serve attributes with their JSX casing:
`srcSet=`, `fetchPriority=` on `<img>`, and `imageSrcSet=` on the
`<link rel="preload" as="image">` elements that React 19 hoists into the output.

This is **stock react-dom behavior, not an engine bug**: the engine uses plain
`ReactDOMServer.renderToString` (`javascript-modules-engine/src/server/init-react.tsx`,
`react-dom/server.edge`), and `renderToString` in both react-dom 18 and 19.2.4
(verified locally with both `server` and `server.edge` entry points) emits these
attribute names verbatim instead of the canonical lowercase forms. Browsers are
unaffected (HTML attribute parsing is case-insensitive), but any server-side
processing that matches attribute names case-sensitively silently skips them.

Impact on the core rewriting pipeline (checked against current sources):

- **`<img srcSet>` is safe**: Jericho's `Attributes.get()` is case-insensitive
  (`HtmlTagAttributeTraverser.java:137`), `UrlRewriteVisitor` lowercases tag and
  attribute names before comparing (`UrlRewriteVisitor.java:99-103`), and
  `SrcSetURLReplacer.handles()` uses `toLowerCase().endsWith("srcset")`. So the
  camelCase attribute still goes through the srcset-aware branch — and therefore
  still hits the comma-splitting bug reported above.
- **`<link rel="preload" imageSrcSet>` is a gap**: the srcset-aware branch is
  restricted to the `img` tag (`UrlRewriteVisitor.java:103`,
  `StringUtils.equals(SrcSetURLReplacer.IMG, tagNameLowerCase)`). React 19
  preload hints carrying multi-candidate `imageSrcSet` values are either not
  visited at all (if `link`/`imagesrcset` is absent from the traverser
  configuration) or routed through the single-URL branch, which passes the whole
  candidate list to `rewriteOutbound` as one URL. Either way, when rewriting
  changes the `<img>` URLs (vanity URLs, server names), the preload URL no
  longer matches the image URL — the preload is wasted and the asset downloads
  twice.

Suggested hardening while fixing the splitter: treat `imagesrcset` on `link`
like `srcset` on `img` (spec: both use the image-candidate syntax), and keep all
attribute-name matching case-insensitive — React-SSR pages make camelCase
attribute names a mainstream input, not an edge case.

Tooling note: case-sensitive text matching misses these attributes (`grep
'srcset'` finds nothing on a React-SSR page); CSS/Cypress selectors like
`img[srcset]` are unaffected because the browser lowercases attribute names at
parse time.
