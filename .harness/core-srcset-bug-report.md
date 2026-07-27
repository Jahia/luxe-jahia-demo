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
