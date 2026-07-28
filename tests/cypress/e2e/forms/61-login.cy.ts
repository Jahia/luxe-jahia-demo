import { publishAndWaitJobEnding } from '@jahia/cypress'
import { GENERIC_SITE_KEY } from '../../support/constants'

const sitePath = `/sites/${GENERIC_SITE_KEY}`

/**
 * The Layout footer renders a `luxe:loginForm` on every page (cache.perUser
 * fragment), so the spec exercises the footer instance on the home page.
 */
const footer = () => cy.get('body footer')

const openLoginDialog = () => {
	// Before the island hydrates, the login anchor has no click handler yet and
	// the browser would follow its href to /cms/login. The handler calls
	// preventDefault anyway, so dropping the href makes pre-hydration clicks
	// harmless, and clickUntilVisible retries until hydration catches up.
	footer().contains('a', 'login').invoke('removeAttr', 'href')
	cy.clickUntilVisible('footer a:contains("login")', 'dialog[open]')
	cy.get('dialog').should('be.visible')
}

const fillCredentials = (username: string, password: string) => {
	cy.get('#inputUser').type(username)
	cy.get('#inputPassword').type(password)
}

const assertLoggedInCard = (username: string) => {
	footer().contains('h5', username).should('be.visible')
	// In live mode, root gets the preview and edit workspace links
	footer().contains('a', 'preview').should('have.attr', 'href')
	footer().contains('a', 'edit').should('have.attr', 'href')
	footer().contains('button', 'logout').should('be.visible')
}

const assertAnonymousCard = () => {
	footer().contains('h5', 'manage website').should('be.visible')
	footer().contains('a', 'login').should('be.visible')
	footer().contains('button', 'logout').should('not.exist')
}

describe('Forms - 61 Login form (footer)', () => {
	before('Publish the site', () => {
		cy.login()
		publishAndWaitJobEnding(sitePath, ['en'])
		cy.logout()
	})

	beforeEach(() => {
		cy.visit(`${sitePath}/home.html`)
	})

	it('shows the back-office login entry to anonymous visitors', () => {
		assertAnonymousCard()
	})

	it('logs in from the dialog and shows the user card with workspace links', () => {
		openLoginDialog()
		fillCredentials('root', Cypress.env('SUPER_USER_PASSWORD'))
		cy.get('#loginForm button').click()

		cy.get('dialog').should('not.be.visible')
		assertLoggedInCard('root')
	})

	it('shows the translated error on wrong credentials', () => {
		openLoginDialog()
		fillCredentials('root', 'wrong-password')
		cy.get('#loginForm button').click()

		cy.get('#loginForm [role="alert"]').should('be.visible').and('contain.text', 'username or password incorrect')
		footer().contains('button', 'logout').should('not.exist')
	})

	it('submits with the Enter key and closes the dialog with Escape (S-2)', () => {
		// Escape closes the dialog without logging in
		openLoginDialog()
		cy.get('#inputUser').type('{esc}')
		cy.get('dialog').should('not.be.visible')

		// Enter in the password field submits
		openLoginDialog()
		fillCredentials('root', Cypress.env('SUPER_USER_PASSWORD'))
		cy.get('#inputPassword').type('{enter}')
		assertLoggedInCard('root')
	})

	it('logs out back to the anonymous card', () => {
		openLoginDialog()
		fillCredentials('root', Cypress.env('SUPER_USER_PASSWORD'))
		cy.get('#loginForm button').click()
		assertLoggedInCard('root')

		footer().contains('button', 'logout').click()
		assertAnonymousCard()
	})

	it('does not leak per-user cached fragments between sessions (cache.perUser)', () => {
		// Anonymous render is now cached
		assertAnonymousCard()

		// Log in and reload: the SSR fragment must be the logged-in variant
		openLoginDialog()
		fillCredentials('root', Cypress.env('SUPER_USER_PASSWORD'))
		cy.get('#loginForm button').click()
		assertLoggedInCard('root')
		cy.reload()
		assertLoggedInCard('root')

		// Back to anonymous: the cached logged-in fragment must not leak
		cy.clearCookies()
		cy.reload()
		assertAnonymousCard()
	})
})
