import { LUXE_SITE_KEY } from '../../../support/constants'
import { Footer, NavMenu } from '../../../page-object'

const homeUrl = `/sites/${LUXE_SITE_KEY}/home.html`

describe('Smoke - 10 Landing page', () => {
	it('renders the landing page with a single h1 and core landmarks', () => {
		cy.visit(homeUrl)
		cy.get('h1').should('have.length', 1).invoke('text').should('not.be.empty')
		cy.get('main#main').should('exist')
		cy.title().should('not.be.empty')
	})

	it('starts with a skip link targeting the main landmark', () => {
		cy.visit(homeUrl)
		// The skip link must be the first anchor of the page and its target must exist
		cy.get('body a').first().should('have.attr', 'href', '#main')
		cy.get('#main').should('exist')
	})

	it('renders a non-empty navigation with a brand link to home', () => {
		cy.visit(homeUrl)
		NavMenu.get().getEntries().should('have.length.greaterThan', 0)
		NavMenu.get().getBrandLink().should('have.attr', 'href').and('include', `/sites/${LUXE_SITE_KEY}/home.html`)
	})

	it('renders a non-empty footer with safe external links and the current copyright year', () => {
		cy.visit(homeUrl)
		Footer.get()
			.getResourceLinks()
			.should('have.length.at.least', 3)
			.each(($link) => {
				cy.wrap($link).should('have.attr', 'rel', 'noreferrer')
			})
		// CopyrightYear is a client island: the year must be the current one (audit W-6)
		Footer.get().getCopyright().should('contain.text', `2002-${new Date().getFullYear()}`)
	})
})
