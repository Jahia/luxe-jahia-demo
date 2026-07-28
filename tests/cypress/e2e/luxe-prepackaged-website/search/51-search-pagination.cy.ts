import { SearchEstatePage } from '../../../page-object'

/**
 * Pagination of the buy page results (client island). The prepackaged site
 * ships enough estates (>100) for the default page size (30) to paginate.
 */
describe('Search Estate - pagination', () => {
	beforeEach(() => {
		SearchEstatePage.interceptSearch()
		SearchEstatePage.visit()
	})

	it('should navigate to page 2, sync the URL and mark the active page', () => {
		// Initial SSR state: header + pagination rendered, page 1 active
		SearchEstatePage.getShowingLabel().should('contain.text', 'Showing 1 to 30')
		SearchEstatePage.getPageButton(1).should('have.attr', 'aria-current', 'page')
		SearchEstatePage.getPreviousPageButton().should('be.disabled')

		SearchEstatePage.getPageButton(2).click()
		SearchEstatePage.waitForResults().then(({ totalCount }) => {
			cy.location('search').should('eq', '?page=2')
			SearchEstatePage.getPageButton(2).should('have.attr', 'aria-current', 'page')
			SearchEstatePage.getPageButton(1).should('not.have.attr', 'aria-current')
			SearchEstatePage.getPreviousPageButton().should('be.enabled')
			SearchEstatePage.getShowingLabel().should('contain.text', `Showing 31 to 60 of ${totalCount} results`)
		})
	})

	it('should change the page size and reset to the first page', () => {
		// Move to page 2 first to prove the page-size change resets to page 1
		SearchEstatePage.getPageButton(2).click()
		SearchEstatePage.waitForResults()

		SearchEstatePage.getPageSizeSelect().select('9')
		SearchEstatePage.waitForResults().then(({ nodes }) => {
			expect(nodes).to.have.length(9)
			// Page=1 again (no `page` param) and limit serialized in the URL
			cy.location('search').should('eq', '?limit=9')
			SearchEstatePage.getPageButton(1).should('have.attr', 'aria-current', 'page')
			SearchEstatePage.getShowingLabel().should('contain.text', 'Showing 1 to 9')
			SearchEstatePage.getCards().should('have.length', 9)
		})
	})

	it('should restore the previous URL with the browser back button', () => {
		SearchEstatePage.getPageButton(2).click()
		SearchEstatePage.waitForResults()
		cy.location('search').should('eq', '?page=2')

		// Filter/pagination interactions push history entries, so back/forward
		// restore the URLs. Note: the island has no popstate listener, so only
		// the URL is restored — the displayed results are not re-fetched.
		cy.go('back')
		cy.location('search').should('eq', '')
		cy.go('forward')
		cy.location('search').should('eq', '?page=2')
	})

	it('should scroll back to the top when changing page', () => {
		cy.scrollTo('bottom')
		cy.window().its('scrollY').should('be.greaterThan', 0)

		SearchEstatePage.getNextPageButton().click()
		SearchEstatePage.waitForResults()

		// The island smooth-scrolls to the top once the new results commit
		cy.window().its('scrollY').should('be.lessThan', 50)
	})

	it('should show the empty state when filters match no estate', () => {
		// The prepackaged site has no 1-bedroom house
		SearchEstatePage.applyFilter('type', 'house')
		SearchEstatePage.applyFilter('# bedrooms', '1', { allowEmpty: true }).then(({ nodes }) => {
			expect(nodes).to.have.length(0)
		})

		SearchEstatePage.getEmptyMessage().should('be.visible')
		SearchEstatePage.getCards().should('not.exist')
	})
})
