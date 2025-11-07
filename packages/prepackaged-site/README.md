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

### Data organization

The way data (content-items) is inputted in Jahia can have significant impacts on

- The editorial experience

- The ability to manage content efficiently over time

- The performances

- The permissions management

We’ve decided to store some content directly in pages, notably all the “static” content (mostly text + images, paragraphs, hero sections, etc.) but as Luxe is supposed to be a real-estate agency, some content are obviously repetitive and required a better approach, so we’ve decided to store the agencies and the real-estate listings and the realtors in content folders, and create content-templates for those three types of items. As a consequence, when a visitor clicks on a link to view a real-estate listing, an agency page or a realtor portrait, Jahia will automatically use the content-template associated to that content-type and render the html page.

The benefits for the editors are easy to understand: they don’t have to manually create a page, then add a listing in that page, they just enter the listing in a folder and voilà ! This approach also known as folder-based in Jahia is in fact very close to how headless CMS work with “collections”, also this is the approach used by Wordpress or Drupal when they were created (and at that time they were only based on such mechanism : un content + a template, the notion of composite page and “static” blocs of content did not really exist to do manual pages).

Also the folder-based approach is easier to set the rights (ACL) once for all on an agency, and even to organize listings automatically if necessary (for instance set an automatic storage by date or any other parameter) to avoid having too many items at the same level, which is not a good practice both from a performance standpoint and for the user experience.

### Landing pages

Luxe prepackaged website comes with two landing pages. Those pages have been created manually in the tree. They are **not** under the /home page but at the same level as the homepage. Why did we do it this way ? Because by default those pages will have URLs of the type [luxe-domain.com/landing-page-name](http://luxe-domain.com/landing-page-name), instead of [luxe-domain.com/home/landing-page-name](http://luxe-domain.com/home/landing-page-name). Also by moving them outside of the /home path, they won’t be automatically called in the main navigation menu, they are kept apart. Finally, it seemed easier for the editors to have those pages in a separate branch, most probably in a real-life scenario, it’s not always the same people that will manage landing-pages and the rest of the site.

Note that those pages could have been created anywhere under the homepage and using [vanity URLs](https://academy.jahia.com/documentation/jahia-cms/jahia-8.2/end-user/using-jahia-seo-features/using-vanity-urls-site-settings-seo) still have nice and short URLs but it then requires more work from the editors that must not forget to set those URLs.
