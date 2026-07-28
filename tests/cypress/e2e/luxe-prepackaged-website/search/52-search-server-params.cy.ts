import { LUXE_SITE_KEY } from '../../../support/constants'
import { SearchEstatePage } from '../../../page-object'

const BUY_PAGE = `/sites/${LUXE_SITE_KEY}/home/buy.html`

/**
 * Server-side rendering of the buy page driven by URL parameters (validates
 * the results view param parsing and its `cache.requestParameters`
 * declaration). Everything goes through `cy.request`: the raw HTML is
 * asserted before any JavaScript runs, so the client island cannot mask a
 * server-side regression.
 */

/** Extract the result-card hrefs from raw server-rendered HTML. */
const cardHrefs = (html: string): string[] => {
	const doc = new DOMParser().parseFromString(html, 'text/html')
	return Array.from(doc.querySelectorAll(SearchEstatePage.cardSelector)).map((a) => a.getAttribute('href') ?? '')
}

const requestSsrCards = (query = '') => cy.request(`${BUY_PAGE}${query}`).then(({ body }) => cardHrefs(body as string))

/**
 * Expected estate URLs straight from GraphQL, using the same criteria as the
 * view (site-scoped, ordered by price DESC). Anonymous request: the live
 * workspace is guest-readable, but Jahia's CSRF guard wants a Referer.
 */
const fetchExpectedUrls = (params: Record<string, string[]>, offset = 0, limit = 30) =>
	cy
		.request({
			method: 'POST',
			url: '/modules/graphql',
			headers: { Referer: String(Cypress.config('baseUrl')) },
			body: {
				query: `query ($criteria: InputGqlJcrNodeCriteriaInput!, $offset: Int!, $limit: Int!) {
					jcr(workspace: LIVE) {
						nodesByCriteria(criteria: $criteria, offset: $offset, limit: $limit) {
							nodes { url: renderUrl(language: "en", workspace: LIVE) }
						}
					}
				}`,
				variables: {
					criteria: {
						paths: [`/sites/${LUXE_SITE_KEY}`],
						nodeType: 'luxe:estate',
						ordering: { property: 'price', orderType: 'DESC' },
						nodeConstraint:
							Object.keys(params).length > 0
								? {
										all: Object.entries(params).map(([property, values]) => ({
											any: values.map((value) => ({ property, equals: value })),
										})),
									}
								: null,
					},
					offset,
					limit,
				},
			},
		})
		.then(({ body }) => {
			expect(body.errors, 'GraphQL errors').to.equal(undefined)
			return body.data.jcr.nodesByCriteria.nodes.map((node: { url: string }) => node.url)
		})

describe('Search Estate - server-side URL parameters', () => {
	it('should render filtered results server-side for a direct URL with filter params', () => {
		fetchExpectedUrls({ type: ['house'], bedrooms: ['6'] }).then((expected: string[]) => {
			expect(expected, 'fixture sanity: house with 6 bedrooms').to.have.length.greaterThan(0)
			requestSsrCards('?type=house&bedrooms=6').then((hrefs) => {
				expect(hrefs).to.deep.equal(expected)
			})
		})
	})

	it('should render the requested page server-side', () => {
		fetchExpectedUrls({}, 30, 30).then((expected: string[]) => {
			requestSsrCards('?page=2').then((hrefs) => {
				expect(hrefs).to.deep.equal(expected)
			})
		})
	})

	it('should clamp the limit parameter to 100', () => {
		requestSsrCards('?limit=500').then((hrefs) => {
			expect(hrefs).to.have.length(100)
		})
	})

	it('should clamp a negative limit to a single item', () => {
		requestSsrCards('?limit=-5').then((hrefs) => {
			expect(hrefs).to.have.length(1)
		})
	})

	it('should fall back to the defaults for non-numeric page and limit', () => {
		requestSsrCards().then((firstPage) => {
			expect(firstPage).to.have.length(30)
			requestSsrCards('?page=abc&limit=abc').then((hrefs) => {
				expect(hrefs).to.deep.equal(firstPage)
			})
		})
	})

	it('should treat page zero as the first page', () => {
		requestSsrCards('?limit=9').then((firstPage) => {
			expect(firstPage).to.have.length(9)
			requestSsrCards('?page=0&limit=9').then((hrefs) => {
				expect(hrefs).to.deep.equal(firstPage)
			})
		})
	})

	it('should render the empty state for an out-of-range page', () => {
		cy.request(`${BUY_PAGE}?page=9999`).then(({ body }) => {
			expect(cardHrefs(body as string)).to.have.length(0)
			expect(body as string).to.contain('No results found.')
		})
	})
})
