# luxe-jahia-demo Changelog

## 0.1.0

### New Features

* Added pagination to the "Buy" page. (#409)

* Clicking a persona card on the login dialog now opens the edition interface directly. (#445)

### Bug Fixes

* Template-set audit remediation, search-estate bug fixes & agentic tooling (#434)

* Fixed accessibility and SEO issues found by the full module review. (#440)

* Correct translations for "unknown errors" (#405)

  The translations for the `form.login.unknownError` were stored under `form.unknownError` for all locales, causing the error message not to be displayed.
  Also, fix a typo ("occured" -> "occurred") in the English translation.

* Added search engine descriptions to every demo page and cleaned up empty or misordered headings. (#449)

* Fixed known security vulnerabilities in the end-to-end test dependencies. (#443)

* Fixed known security vulnerabilities in the module's dependencies. (#444)

* Prevent failure when importing several copies of Luxe on the same Jahia instance with the prepackaged website.

* Render a placeholder until the [Leaflet](https://leafletjs.com/) map has loaded (#410)

* Improved image loading and resizing so pages render faster and images stay sharp. (#436)

* Updated the Cypress test framework to @jahia/cypress v8. (#419)

* Stopped shipping a copy of the Jahia root account (including its credentials) inside the prepackaged website archive: importing the demo site can no longer expose or interfere with the root user of the target instance. (#442)

* Removed global style on `<footer>` elements.
