import { createSite, deleteSite, publishAndWaitJobEnding } from '@jahia/cypress'

const siteKey = 'luxeSearchEstate'

describe('Search Estate - Buy page', () => {
	before('Create site from prepackaged website', () => {
		cy.login()
		createSite(siteKey, {
			templateSet: 'luxe-jahia-demo',
			locale: 'en',
			serverName: 'localhost',
			sitePackage: 'luxe-prepackaged-website',
		})
		publishAndWaitJobEnding(`/sites/${siteKey}`)
		cy.logout()
	})

	after('Delete test site', () => {
		cy.login()
		deleteSite(siteKey)
		cy.logout()
	})

	it('should filter estates by number of bedrooms and display correct results', () => {
		// Visit the buy page
		cy.visit(`/sites/${siteKey}/home/buy.html`)

		// Wait for the page to load
		cy.get('form').should('be.visible')

		// Select 2 bedrooms filter
		cy.get('input[name="bedrooms"]').parent().click()
		cy.contains('2').click()

		// Wait for results to load
		cy.get('a[class*="_card_"]').should('exist')

		// Verify all result cards contain "2 bedrooms"
		cy.get('a[class*="_card_"]').each(($card) => {
			cy.wrap($card).should('contain', '2')
			cy.wrap($card).should('contain', 'bedrooms')
		})
	})

	it('should filter estates by property type and verify detail page shows correct type', () => {
		// Visit the buy page
		cy.visit(`/sites/${siteKey}/home/buy.html`)

		// Wait for the page to load
		cy.get('form').should('be.visible')

		// Select "House" filter in property type
		cy.get('input[name="type"]').parent().click()
		cy.contains('House').click()

		// Wait for results to load
		cy.get('a[class*="_card_"]').should('exist')

		// Click on the first search result
		cy.get('a[class*="_card_"]').first().click()

		// Wait for the detail page to load
		cy.get('div[class*="_row_"]').should('exist')

		// Verify the type is "house" in the detail page
		cy.get('div[class*="_row_"]').contains('dt', 'type', { matchCase: false }).parent().within(() => {
			cy.get('dd[class*="_value_"]').should('contain.text', 'house')
		})
	})

	it('should combine multiple filters and display relevant results', () => {
		// Visit the buy page
		cy.visit(`/sites/${siteKey}/home/buy.html`)

		// Wait for the page to load
		cy.get('form').should('be.visible')

		// Select 2 bedrooms
		cy.get('input[name="bedrooms"]').parent().click()
		cy.contains('2').click()
		// Close the dropdown
		cy.get('body').click(0, 0)

		// Select "Apartment" property type
		cy.get('input[name="type"]').parent().click()
		cy.contains('Apartment').click()

		// Wait for results to load
		cy.get('a[class*="_card_"]').should('exist')

		// Verify all results contain 2 bedrooms
		cy.get('a[class*="_card_"]').each(($card) => {
			cy.wrap($card).should('contain', '2')
			cy.wrap($card).should('contain', 'bedrooms')
		})

		// Click on the first result and verify it's an apartment
		cy.get('a[class*="_card_"]').first().click()

		// Verify the type is "apartment"
		cy.get('div[class*="_row_"]').contains('dt', 'type', { matchCase: false }).parent().within(() => {
			cy.get('dd[class*="_value_"]').should('contain.text', 'apartment')
		})
	})
})
