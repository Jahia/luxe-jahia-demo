import { addNode, createSite, deleteSite, publishAndWaitJobEnding } from '@jahia/cypress'

import { GENERIC_SITE_KEY } from '../../support/constants'

describe('Preview mode', () => {
	function createPage(pageName: string) {
		addNode({
			parentPathOrId: `/sites/${GENERIC_SITE_KEY}/home`,
			name: pageName,
			primaryNodeType: 'jnt:page',
			properties: [
				{ name: 'jcr:title', value: pageName, language: 'en' },
				{ name: 'j:templateName', value: 'centered' },
			],
		})
	}
	before('Create test data', () => {
		createPage('subPage1')
		createPage('subPage2')
		publishAndWaitJobEnding(`/sites/${GENERIC_SITE_KEY}`)
	})

	function testNavigationExists(baseUrl: string = '') {
		cy.visit(`${baseUrl}/sites/${GENERIC_SITE_KEY}/home.html`)
		cy.get('body nav #navbarSupportedContent ul').within(() => {
			cy.get('li').should('have.length', 2)
			cy.get(`li a[href="${baseUrl}/sites/${GENERIC_SITE_KEY}/home/subPage1.html"]`)
				.should('exist')
				.and('have.text', 'subPage1')
			cy.get(`li a[href="${baseUrl}/sites/${GENERIC_SITE_KEY}/home/subPage2.html"]`)
				.should('exist')
				.and('have.text', 'subPage2')
		})
	}

	it('the navigation menu should be visible in live mode', () => {
		testNavigationExists()
	})

	it('the navigation menu should be visible in preview mode', () => {
		cy.login()
		testNavigationExists('/cms/render/default/en')
		cy.logout()
	})
})
