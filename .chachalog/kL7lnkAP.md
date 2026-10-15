---
luxe-jahia-demo: patch
---

Every link is now rendered by the platform link API instead of a hand-written anchor. (#459)

The CTA mixin no longer reimplements link resolution: `ctaType`, `j:linknode`, `j:url` and `ctaLabel` are named to the platform resolver, which reads them. Three bugs go with it — a call to action whose page was never picked no longer renders a dead link, a navigation entry is highlighted when the page belongs under it rather than when its address merely starts the same way, and links that open a new tab no longer leave that tab a handle on the page it came from. The footer link list now shows the title the editor typed on the link instead of the title of the page it points at, and the language switcher marks only the language you are reading.
