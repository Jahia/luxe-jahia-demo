---
luxe-jahia-demo: patch
---

Every JCR image is now rendered by the platform image API instead of the module's own copy of it. (#458)

`packages/template-set/src/commons/image/` is deleted: a view describes its image slot once — a `slotWidth` when the markup states the slot in CSS pixels, a `sizes` when only CSS knows it — and the library derives both the candidate widths and the `sizes` attribute from that one description. The two hand-written width/size conventions are gone with it, and the navigation logo joins the same pipeline.

Five slots used to be described twice, by a `slotWidth` and a `sizes` that disagreed: the estate card, the agency and realtor page headers, the blog tile and the illustrated text block. On a 2x display the estate card and the two page headers were served files roughly half as wide as their own `sizes` asked for. They now get files that cover the slot.
