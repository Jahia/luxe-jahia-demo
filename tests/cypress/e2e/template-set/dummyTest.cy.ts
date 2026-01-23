import { GENERIC_SITE_KEY } from '../../support/constants'

describe('Dummy test', () => {
	it('should pass', () => {
		cy.login()
		cy.visit(`/cms/render/default/en/sites/${GENERIC_SITE_KEY}/home.html`)
		cy.logout()
	})
})
