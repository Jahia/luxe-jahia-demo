export const GENERIC_SITE_KEY = 'luxe-test-site'
export const LUXE_SITE_KEY = 'luxe'
export const LUXE_PATH_KEY = 'luxe-prepackaged-website'
/**
 * The prepackaged site under test: by default the one built from this branch, which CI copies to
 * ./artifacts/. Set CYPRESS_LUXE_PREPACKAGED_SITE to a `jar:mvn:` URL to test a published one, e.g.
 * `jar:mvn:org.jahia.modules/luxe-prepackaged-website/LATEST/zip/import!/luxe.zip`.
 *
 * The glob ends with a digit or the T of SNAPSHOT so it skips the `-sources.jar`.
 */
export const LUXE_PREPACKAGED_SITE: string =
	Cypress.env('LUXE_PREPACKAGED_SITE') ?? 'luxe-prepackaged-website-*[0-9T].jar'
