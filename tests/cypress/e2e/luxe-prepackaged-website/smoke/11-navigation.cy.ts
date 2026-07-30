import { LUXE_SITE_KEY } from '../../../support/constants'
import { NavMenu } from '../../../page-object'

const homeUrl = `/sites/${LUXE_SITE_KEY}/home.html`

describe('Smoke - 11 Navigation', () => {
	it('every navigation entry responds and renders a single h1 and a title', () => {
		cy.visit(homeUrl)
		NavMenu.get()
			.getEntries()
			.then(($links) => {
				const hrefs = [...new Set($links.toArray().map((link) => link.getAttribute('href')))]
				expect(hrefs.length, 'navigation entries').to.be.greaterThan(0)

				hrefs.forEach((href) => {
					cy.request(href).its('status').should('eq', 200)
				})

				hrefs.forEach((href) => {
					cy.visit(href)
					cy.get('h1').should('have.length', 1)
					cy.title().should('not.be.empty')
				})
			})
	})

	it('marks the visited page as active in the menu', () => {
		cy.visit(homeUrl)
		NavMenu.get()
			.getEntries()
			.first()
			.then(($link) => {
				const href = $link.attr('href')
				cy.visit(href)
				NavMenu.get().getActiveEntry().should('have.attr', 'href', href)
			})
	})
})
