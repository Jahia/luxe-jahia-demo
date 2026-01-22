import { LUXE_SITE_KEY } from '../../support/constants'

describe('Search Estate - Buy page', () => {
	it('should filter estates by number of bedrooms and display correct results', () => {
		// Visit the buy page
		cy.visit(`/sites/${LUXE_SITE_KEY}/home/buy.html`)

		// Wait for the page to load
		cy.get('form').should('be.visible')

		// Click on the bedrooms placeholder to open dropdown
		cy.contains('li[class*="_placeholder_"]', '# bedrooms').click()

		// Select 2 bedrooms checkbox from the dropdown
		cy.get('div[class*="_dropdown_"][role="listbox"]')
			.should('be.visible')
			.within(() => {
				cy.contains('label', '2').find('input[type="checkbox"]').check({ force: true })
			})

		// Close the dropdown by clicking on body
		cy.get('body').click(0, 0)

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
		cy.visit(`/sites/${LUXE_SITE_KEY}/home/buy.html`)

		// Wait for the page to load
		cy.get('form').should('be.visible')

		// Click on the type placeholder to open dropdown
		cy.contains('li[class*="_placeholder_"]', 'type').click()

		// Select "House" filter in property type
		cy.get('div[class*="_dropdown_"][role="listbox"]')
			.should('be.visible')
			.within(() => {
				cy.contains('label', 'house').find('input[type="checkbox"]').check({ force: true })
			})

		// Close the dropdown by clicking on body
		cy.get('body').click(0, 0)

		// Wait for results to load
		cy.get('a[class*="_card_"]').should('exist')

		// Click on the first search result
		cy.get('a[class*="_card_"]').first().click()

		// Wait for the detail page to load
		cy.get('div[class*="_row_"]').should('exist')

		// Verify the type is "house" in the detail page
		cy.get('div[class*="_row_"]')
			.contains('dt', 'type', { matchCase: false })
			.parent()
			.within(() => {
				cy.get('dd[class*="_value_"]').should('contain.text', 'house')
			})
	})

	it('should combine multiple filters and display relevant results', () => {
		// Visit the buy page
		cy.visit(`/sites/${LUXE_SITE_KEY}/home/buy.html`)

		// Wait for the page to load
		cy.get('form').should('be.visible')

		// Click on the bedrooms placeholder to open dropdown
		cy.contains('li[class*="_placeholder_"]', '# bedrooms').click()

		// Select 2 bedrooms
		cy.get('div[class*="_dropdown_"][role="listbox"]')
			.should('be.visible')
			.within(() => {
				cy.contains('label', '2').find('input[type="checkbox"]').check({ force: true })
			})

		// Close the dropdown
		cy.get('body').click(0, 0)

		// Click on the type placeholder to open dropdown
		cy.contains('li[class*="_placeholder_"]', 'type').click()

		// Select "Apartment" property type
		cy.get('div[class*="_dropdown_"][role="listbox"]')
			.should('be.visible')
			.within(() => {
				cy.contains('label', 'apartment').find('input[type="checkbox"]').check({ force: true })
			})

		// Close the dropdown
		cy.get('body').click(0, 0)

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
		cy.get('div[class*="_row_"]')
			.contains('dt', 'type', { matchCase: false })
			.parent()
			.within(() => {
				cy.get('dd[class*="_value_"]').should('contain.text', 'apartment')
			})
	})
})
