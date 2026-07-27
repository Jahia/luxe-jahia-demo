import { LUXE_SITE_KEY } from '../../../support/constants'
import { NavMenu } from '../../../page-object'

const homeUrl = `/sites/${LUXE_SITE_KEY}/home.html`

/**
 * External QA recommendation: check browser logs for errors, with and without
 * a Jahia (authenticated) context.
 */
describe('Smoke - 12 Browser logs', () => {
	it('live pages log no console errors (anonymous)', () => {
		cy.visit(homeUrl)
		NavMenu.get()
			.getEntries()
			.then(($links) => {
				const urls = [homeUrl, ...new Set($links.toArray().map((link) => link.getAttribute('href')))]
				urls.forEach((url) => {
					cy.visitAndCaptureConsole(url)
					cy.assertNoConsoleErrors()
				})
			})
	})

	it('preview pages log no console errors (authenticated)', () => {
		cy.login()
		cy.visitAndCaptureConsole(`/cms/render/default/en/sites/${LUXE_SITE_KEY}/home.html`)
		cy.assertNoConsoleErrors()
		cy.logout()
	})
})
