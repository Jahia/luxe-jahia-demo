---
# Allowed version bumps: patch, minor, major
luxe-jahia-demo: patch
---

Correct translations for "unknown errors" (#405)

The translations for the `form.login.unknownError` were stored under `form.unknownError` for all locales, causing the error message not to be displayed.
Also, fix a typo ("occured" -> "occurred") in the English translation.
