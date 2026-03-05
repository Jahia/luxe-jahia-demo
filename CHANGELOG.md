# luxe-jahia-demo Changelog

## 0.0.1

* Correct translations for "unknown errors" (#405)

  The translations for the `form.login.unknownError` were stored under `form.unknownError` for all locales, causing the error message not to be displayed.
  Also, fix a typo ("occured" -> "occurred") in the English translation.

* Prevent failure when importing several copies of Luxe on the same Jahia instance with the prepackaged website.

* Render a placeholder until the [Leaflet](https://leafletjs.com/) map has loaded (#410)
