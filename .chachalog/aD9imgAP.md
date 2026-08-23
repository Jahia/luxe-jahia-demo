---
luxe-jahia-demo: patch
---

Every JCR image is now rendered by the platform image API instead of the module's own copy of it. (#458)

`packages/template-set/src/commons/image/` is deleted: views declare how an image sits in the page (`layout` + `slotWidth`) and the library derives the candidate widths and the `sizes` attribute. The two hand-written width/size conventions are gone with it, and the navigation logo joins the same pipeline.
