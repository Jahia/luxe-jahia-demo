import { LUXE_SITE_KEY } from '../support/constants'

/** Estate node as returned by the island's GetContentPropertiesQuery. */
export interface EstateNode {
	url: string
	title: { value: string } | null
	price: { longValue: number } | null
	surface: { longValue: number } | null
	bedrooms: { longValue: number } | null
}

export interface SearchResponse {
	nodes: EstateNode[]
	totalCount: number
}

/**
 * Page object for the buy page (`luxe:searchEstate` results view). The result
 * list is a client island: every filter/pagination interaction posts a
 * GetContentPropertiesQuery to /modules/graphql and re-renders the cards.
 *
 * The old cards match the same selectors as the new ones, so asserting on the
 * DOM right after an interaction races with the re-render. Always go through
 * `waitForResults` (or the helpers that call it): it waits for the aliased
 * round-trip and retries until the cards' hrefs match the response exactly.
 */
export class SearchEstatePage {
	static readonly cardSelector = 'a[class*="_card_"]'

	/** Alias the search round-trips. MUST be called before `visit`. */
	static interceptSearch(): void {
		cy.intercept('POST', '**/modules/graphql', (req) => {
			if (typeof req.body?.query === 'string' && req.body.query.includes('GetContentPropertiesQuery')) {
				req.alias = 'estateSearch'
			}
		})
	}

	/** Visit the buy page (optionally with a query string) and wait for the form. */
	static visit(query = ''): void {
		cy.visit(`/sites/${LUXE_SITE_KEY}/home/buy.html${query}`)
		cy.get('form').should('be.visible')
	}

	static getCards(): Cypress.Chainable<JQuery> {
		return cy.get(SearchEstatePage.cardSelector)
	}

	/** Open a filter dropdown and check one option (exact label match). */
	static checkFilterOption(placeholder: string, optionLabel: string): void {
		cy.contains('li[class*="_placeholder_"]', placeholder).click()
		cy.get('div[class*="_dropdown_"][role="listbox"]')
			.should('be.visible')
			.within(() => {
				cy.contains('label', new RegExp(`^${optionLabel}$`))
					.find('input[type="checkbox"]')
					.check({ force: true })
			})

		// Close the dropdown
		cy.get('body').click(0, 0)
	}

	/**
	 * Wait for the next aliased search round-trip, then retry until the DOM
	 * shows exactly the cards from that response. Yields the response data.
	 */
	static waitForResults({ allowEmpty = false } = {}): Cypress.Chainable<SearchResponse> {
		return cy.wait('@estateSearch').then(({ response }) => {
			const criteria = response?.body?.data?.jcr?.nodesByCriteria
			const nodes: EstateNode[] = criteria?.nodes ?? []
			const totalCount: number = criteria?.pageInfo?.totalCount ?? 0
			if (!allowEmpty) {
				expect(nodes, 'search results').to.have.length.greaterThan(0)
			}

			if (nodes.length === 0) {
				cy.get(SearchEstatePage.cardSelector).should('not.exist')
			} else {
				cy.get(SearchEstatePage.cardSelector).should(($cards) => {
					const hrefs = $cards.toArray().map((card) => card.getAttribute('href'))
					expect(hrefs).to.deep.equal(nodes.map((node) => node.url))
				})
			}

			return cy.wrap({ nodes, totalCount }, { log: false })
		})
	}

	/** Check a filter option and wait for the island to commit the new results. */
	static applyFilter(
		placeholder: string,
		optionLabel: string,
		options: { allowEmpty?: boolean } = {},
	): Cypress.Chainable<SearchResponse> {
		SearchEstatePage.checkFilterOption(placeholder, optionLabel)
		return SearchEstatePage.waitForResults(options)
	}

	// Pagination — aria-labels come from the `pagination.*` en resources

	static getPagination(): Cypress.Chainable<JQuery> {
		return cy.get('nav[aria-label="Pagination"]')
	}

	static getPageButton(page: number): Cypress.Chainable<JQuery> {
		return SearchEstatePage.getPagination().find(`button[aria-label="Page ${page}"]`)
	}

	static getNextPageButton(): Cypress.Chainable<JQuery> {
		return SearchEstatePage.getPagination().find('button[aria-label="Next"]')
	}

	static getPreviousPageButton(): Cypress.Chainable<JQuery> {
		return SearchEstatePage.getPagination().find('button[aria-label="Previous"]')
	}

	static getPageSizeSelect(): Cypress.Chainable<JQuery> {
		return cy.contains('label', 'Items per page:').find('select')
	}

	/** The "Showing X to Y of Z results" pagination header. */
	static getShowingLabel(): Cypress.Chainable<JQuery> {
		return cy.contains(/^Showing \d+ to \d+ of \d+ results$/)
	}

	static getEmptyMessage(): Cypress.Chainable<JQuery> {
		return cy.contains('p', 'No results found.')
	}
}
