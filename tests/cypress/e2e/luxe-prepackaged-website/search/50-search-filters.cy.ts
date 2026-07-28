import { LUXE_SITE_KEY } from '../../../support/constants'

interface EstateNode {
	url: string
	bedrooms: { longValue: number } | null
}

const CARD = 'a[class*="_card_"]'

/**
 * Alias the estate search GraphQL round-trip. The island posts to
 * /modules/graphql on every filter change; other GraphQL traffic on the same
 * endpoint is ignored by matching on the operation name.
 */
const interceptEstateSearch = () => {
	cy.intercept('POST', '**/modules/graphql', (req) => {
		if (typeof req.body?.query === 'string' && req.body.query.includes('GetContentPropertiesQuery')) {
			req.alias = 'estateSearch'
		}
	})
}

/**
 * Check a filter option, then wait for the resulting search round-trip AND for
 * the client island to commit the new result set to the DOM. The old cards
 * match the same selector as the new ones, so asserting existence alone races
 * with the re-render (the test used to click a stale card from the previous
 * result set). Syncing the cards' hrefs against the intercepted response is
 * deterministic. Yields the estate nodes returned by the search.
 */
const applyFilterAndWaitForResults = (placeholder: string, optionLabel: string) => {
	cy.contains('li[class*="_placeholder_"]', placeholder).click()
	cy.get('div[class*="_dropdown_"][role="listbox"]')
		.should('be.visible')
		.within(() => {
			cy.contains('label', optionLabel).find('input[type="checkbox"]').check({ force: true })
		})

	// Close the dropdown
	cy.get('body').click(0, 0)

	return cy.wait('@estateSearch').then(({ response }) => {
		const nodes: EstateNode[] = response?.body?.data?.jcr?.nodesByCriteria?.nodes ?? []
		expect(nodes, `search results for ${placeholder}=${optionLabel}`).to.have.length.greaterThan(0)

		// Retry until the DOM shows exactly the cards from this response
		cy.get(CARD).should(($cards) => {
			const hrefs = $cards.toArray().map((card) => card.getAttribute('href'))
			expect(hrefs).to.deep.equal(nodes.map((node) => node.url))
		})

		return cy.wrap(nodes, { log: false })
	})
}

describe('Search Estate - Buy page', () => {
	beforeEach(() => {
		interceptEstateSearch()
		cy.visit(`/sites/${LUXE_SITE_KEY}/home/buy.html`)
		cy.get('form').should('be.visible')
	})

	it('should filter estates by number of bedrooms and display correct results', () => {
		applyFilterAndWaitForResults('# bedrooms', '2').then((nodes) => {
			// The search itself must honour the filter...
			nodes.forEach((node) => expect(node.bedrooms?.longValue).to.equal(2))
		})

		// ...and every rendered card must show it
		cy.get(CARD).each(($card) => {
			cy.wrap($card).should('contain', '2').and('contain', 'bedrooms')
		})
	})

	it('should filter estates by property type and verify detail page shows correct type', () => {
		applyFilterAndWaitForResults('type', 'house')

		// Click on the first search result
		cy.get(CARD).first().click()

		// Verify the type is "house" in the detail page
		cy.get('div[class*="_row_"]')
			.contains('dt', 'type', { matchCase: false })
			.parent()
			.within(() => {
				cy.get('dd[class*="_value_"]').should('contain.text', 'house')
			})
	})

	it('should combine multiple filters and display relevant results', () => {
		applyFilterAndWaitForResults('# bedrooms', '2')
		applyFilterAndWaitForResults('type', 'apartment').then((nodes) => {
			nodes.forEach((node) => expect(node.bedrooms?.longValue).to.equal(2))
		})

		// Verify all results contain 2 bedrooms
		cy.get(CARD).each(($card) => {
			cy.wrap($card).should('contain', '2').and('contain', 'bedrooms')
		})

		// Click on the first result and verify it's an apartment
		cy.get(CARD).first().click()

		cy.get('div[class*="_row_"]')
			.contains('dt', 'type', { matchCase: false })
			.parent()
			.within(() => {
				cy.get('dd[class*="_value_"]').should('contain.text', 'apartment')
			})
	})
})
