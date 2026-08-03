# Editorial remediation plan — issue #435, item 7

**Status (2026-08-03): NOT DONE — drafts only.** The editorial work was deliberately put on hold; nothing was applied to the live content or the prepackaged export. This document is the starting point for whenever the editorial remediation is picked up.

Scope: the two editorial findings left from the full module review (#435). Color contrast (item 5) is owned by the designer — out of scope, nothing to change on our side.

## Findings (verified live on 2026-08-03)

1. **Missing meta descriptions — 10 of 12 reviewed pages.** The layout renders `<meta name="description">` from the page/content node's `jcr:description` (`packages/template-set/src/templates/Layout.tsx`); only the home page has one (EN + FR).
2. **Empty heading on the Sell page.** A rich text on `/sites/luxe/home/sell` contains `<h3 style="margin-left: 50px; margin-right: 50px;">&nbsp;</h3>` right before the "Sell your property with Luxe international network" heading — a CKEditor spacing artifact. Remove it from the rich-text HTML; spacing must come from CSS. Locate the exact richtext node via MCP at execution time.

## Execution plan (validated with the user)

No new branch: this work lands on the existing `fix/review-findings` branch, inside PR #440 (same #435 remediation, human review not started yet, repo diff is tiny — only the prepackaged export).

1. Fix the **live** content via MCP: set `jcr:description` (EN + FR) on the 10 nodes below, remove the empty `<h3>` on the Sell page. Publish.
2. Validate with `/jahia-review-site` (expect exit 0).
3. Port the changes into the versioned export `packages/prepackaged-site/src/main/luxe-prepackaged-website` (read that package's README for the regeneration procedure first).
4. Commit on `fix/review-findings`, update the PR #440 description (drop the "editorial items excluded" caveat); the existing chachalog entry already covers this — adjust only if needed.

Note: the FR descriptions below were derived from the EN page content — check the actual FR pages before applying them.

## Drafted meta descriptions (`jcr:description`)

### /sites/luxe/home/buy
- EN: Browse our curated selection of luxury properties for sale worldwide — villas, penthouses and apartments in the French Riviera, Paris, New York and beyond.
- FR: Parcourez notre sélection de biens de prestige à vendre dans le monde entier — villas, penthouses et appartements sur la Côte d'Azur, à Paris ou New York.

### /sites/luxe/home/sell
- EN: Sell your property with Luxe Properties: top-tier agents, in-depth market insight and a global network to make your home stand out and sell at its best value.
- FR: Vendez votre bien avec Luxe Properties : des agents d'exception, une connaissance fine du marché et un réseau international pour valoriser votre propriété.

### /sites/luxe/home/about-us
- EN: Founded in 1963, Luxe Properties is an international agency specializing in luxury real estate, with offices in Paris, Los Angeles and New York.
- FR: Fondée en 1963, Luxe Properties est une agence internationale spécialisée dans l'immobilier de luxe, avec des bureaux à Paris, Los Angeles et New York.

### /sites/luxe/home/agencies
- EN: Find your nearest Luxe Properties agency — Los Angeles, New York, Paris and Singapore — and connect with our local luxury real estate experts.
- FR: Trouvez l'agence Luxe Properties la plus proche — Los Angeles, New York, Paris, Singapour — et contactez nos experts locaux de l'immobilier de prestige.

### /sites/luxe/home/blog
- EN: The latest luxury real estate news and insights from Luxe Properties: market trends and destination guides from Mykonos to Manhattan.
- FR: Toute l'actualité de l'immobilier de luxe par Luxe Properties : tendances du marché et guides de destinations, de Mykonos à Manhattan.

### /sites/luxe/home/blog/main/blog-posts/geneva (blog post node)
- EN: Discover Geneva's timeless elegance: lakeside living, Swiss excellence and everything that makes the city a haven for luxury real estate.
- FR: Découvrez l'élégance intemporelle de Genève : vie au bord du lac, excellence suisse et tous les atouts d'une ville prisée de l'immobilier de luxe.

### /sites/luxe/contents/agencies/luxe-europe/bien-immobilier (estate)
- EN: Elegant 180 m² apartment in the heart of the 8th arrondissement, steps from the Champs-Élysées — classic Parisian charm with modern comfort, €2,620,000.
- FR: Élégant appartement de 180 m² au cœur du 8e arrondissement, à deux pas des Champs-Élysées — charme parisien et confort moderne, 2 620 000 €.

### /sites/luxe/contents/agencies/luxe-europe (agency)
- EN: Luxe – Europe, our Paris agency at 88 Rue Saint-Martin: an exclusive selection of prestige properties and a dedicated team guiding you at every step.
- FR: Luxe – Europe, notre agence parisienne du 88 rue Saint-Martin : une sélection exclusive de biens de prestige et une équipe dédiée à chaque étape.

### /sites/luxe/contents/realtors/eleanor-pearl (realtor)
- EN: Meet Eleanor Pearl, luxury real estate agent at Luxe – Europe in Paris, with a rare flair for finding exceptional properties.
- FR: Rencontrez Eleanor Pearl, agente en immobilier de luxe chez Luxe – Europe à Paris, au flair rare pour dénicher des biens d'exception.

### /sites/luxe/legal/fees
- EN: Luxe Properties fee schedule: maximum applicable fees for residential and commercial sales, leases and rental management, VAT included.
- FR: Barème d'honoraires de Luxe Properties : montants maximums applicables aux ventes résidentielles et commerciales, locations et gestion locative, TVA incluse.
