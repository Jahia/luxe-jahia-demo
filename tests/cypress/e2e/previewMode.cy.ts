import { addNode, createSite, deleteSite, publishAndWaitJobEnding } from '@jahia/cypress'

const siteKey = 'previewMode'

describe('Preview mode', () => {
	function createPage(pageName: string) {
		addNode({
			parentPathOrId: `/sites/${siteKey}/home`,
			name: pageName,
			primaryNodeType: 'jnt:page',
			properties: [
				{ name: 'jcr:title', value: pageName, language: 'en' },
				{ name: 'j:templateName', value: 'centered' },
			],
		})
	}
	before('Create test data', () => {
		cy.login()
		createSite(siteKey, { templateSet: 'luxe-jahia-demo', locale: 'en', serverName: 'localhost' })
		createPage('subPage1')
		createPage('subPage2')
		publishAndWaitJobEnding(`/sites/${siteKey}`)
		cy.logout()
	})

	after('Delete test data', () => {
		cy.login()
		deleteSite(siteKey)
		cy.logout()
	})

	function testNavigationExists(baseUrl: string = '') {
		cy.visit(`${baseUrl}/sites/${siteKey}/home.html`)
		cy.get('body nav #navbarSupportedContent ul').within(() => {
			cy.get('li').should('have.length', 2)
			cy.get(`li a[href="${baseUrl}/sites/${siteKey}/home/subPage1.html"]`)
				.should('exist')
				.and('have.text', 'subPage1')
			cy.get(`li a[href="${baseUrl}/sites/${siteKey}/home/subPage2.html"]`)
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
