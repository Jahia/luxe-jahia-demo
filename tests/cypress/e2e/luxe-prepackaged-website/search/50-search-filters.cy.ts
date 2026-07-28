import { SearchEstatePage } from '../../../page-object'

describe('Search Estate - Buy page', () => {
	beforeEach(() => {
		SearchEstatePage.interceptSearch()
		SearchEstatePage.visit()
	})

	it('should filter estates by number of bedrooms and display correct results', () => {
		SearchEstatePage.applyFilter('# bedrooms', '2').then(({ nodes }) => {
			// The search itself must honour the filter...
			nodes.forEach((node) => expect(node.bedrooms?.longValue).to.equal(2))
		})

		// ...and every rendered card must show it
		SearchEstatePage.getCards().each(($card) => {
			cy.wrap($card).should('contain', '2').and('contain', 'bedrooms')
		})
	})

	it('should filter estates by property type and verify detail page shows correct type', () => {
		SearchEstatePage.applyFilter('type', 'house')

		// Click on the first search result
		SearchEstatePage.getCards().first().click()

		// Verify the type is "house" in the detail page
		cy.get('div[class*="_row_"]')
			.contains('dt', 'type', { matchCase: false })
			.parent()
			.within(() => {
				cy.get('dd[class*="_value_"]').should('contain.text', 'house')
			})
	})

	it('should combine multiple filters and display relevant results', () => {
		SearchEstatePage.applyFilter('# bedrooms', '2')
		SearchEstatePage.applyFilter('type', 'apartment').then(({ nodes }) => {
			nodes.forEach((node) => expect(node.bedrooms?.longValue).to.equal(2))
		})

		// Verify all results contain 2 bedrooms
		SearchEstatePage.getCards().each(($card) => {
			cy.wrap($card).should('contain', '2').and('contain', 'bedrooms')
		})

		// Click on the first result and verify it's an apartment
		SearchEstatePage.getCards().first().click()

		cy.get('div[class*="_row_"]')
			.contains('dt', 'type', { matchCase: false })
			.parent()
			.within(() => {
				cy.get('dd[class*="_value_"]').should('contain.text', 'apartment')
			})
	})
})
