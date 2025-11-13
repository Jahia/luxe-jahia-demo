# Luxe Prepackaged Site

Need context or build instructions? [Head to the Luxe README](../..).

This package contains the contents of the demo website:

- 10 pages
- 5 blog articles
- 2 landing pages (pages that are not referenced in the site itself, and that can be used for advertising campaigns)
- 4 agencies
- 200 real estate properties
- 6 realtors
- About 400 images

> [!NOTE]
> The site contains a lot more than "10 pages" because each blog article, agency, property, etc. will have its own page. 10 pages is the number of pages contributed by hand through the page creation interface.

### Data Organization

The way data is inputted in Jahia can have significant impacts on:

- The editorial experience
- The ability to manage content efficiently over time
- The performances
- The permissions management

**Luxe leverages two main ways to create content in Jahia: pages and content folders.**

Pages store some content directly, what we could call “static” content, that is content that will not be reused elsewhere and is updated only occasionally and manually. This is only possible because Jahia is a head-on CMS, meaning that the content can be stored and edited directly in the context of a page.

However, for structured collections of content, Luxe leverages content folders: real-estate listings, agencies, realtors. The content is stored and updated from a single place, but rendered in multiple places through listings, search results, etc. This a common approach in all kinds of CMS, headless or not.

### Page Tree

Most of Luxe pages live under the homepage; this is a common pattern in Jahia websites. **This is how the navigation menu is generated automatically**: we list all pages under the homepage to populate the navigation menu. Generating the menu this way ensures that editors can manage the menu themselves by adding/removing/reordering pages in the tree.

**Not all pages live under the homepage, however.** This is the case for legal pages (Privacy Policy, etc.): we don't want those pages to appear in the main navigation menu, so they are stored next to the homepage, not under it. They are manually linked in the footer.

Finally, landing pages are a special case. Like legal pages, we don't want them to appear in the main navigation menu, so they are not under the homepage. But unlike legal pages, they are not linked in the footer either. They are standalone pages that are not reachable from the main site, only through their direct URL. This is useful for advertising campaigns, for example.
