import { publishAndWaitJobEnding } from '@jahia/cypress'
import { GENERIC_SITE_KEY } from '../../support/constants'
import { Footer } from '../../page-object'

const sitePath = `/sites/${GENERIC_SITE_KEY}`
const homeUrl = `${sitePath}/home.html`

describe('Content - 25 Layout shell', () => {
	before('Publish the home page', () => {
		cy.login()
		publishAndWaitJobEnding(`${sitePath}/home`, ['en'])
		cy.logout()
	})

	beforeEach(() => {
		cy.visit(homeUrl)
	})

	it('shows the current copyright year computed client-side (audit W-6)', () => {
		// The CopyrightYear island recomputes the year in the browser so a cached
		// footer fragment can never keep a stale year
		Footer.get().getCopyright().should('contain.text', `2002-${new Date().getFullYear()}`)
	})

	it('opens external footer links in a new tab with rel=noopener noreferrer', () => {
		// The platform link API adds `noopener` to every `_blank` link: the hand-written anchors
		// only carried `noreferrer`, which leaves the opened page a handle on this one
		Footer.get()
			.getResourceLinks()
			.should('have.length.at.least', 3)
			.each(($link) => {
				cy.wrap($link).should('have.attr', 'target', '_blank').and('have.attr', 'rel', 'noopener noreferrer')
			})
	})

	it('starts the page with a skip link targeting an existing main landmark', () => {
		cy.get('body a').first().should('have.attr', 'href', '#main')
		cy.get('main#main').should('exist')
	})

	it('renders a title tag', () => {
		cy.title().should('not.be.empty')
	})
})
