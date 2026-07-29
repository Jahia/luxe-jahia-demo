import { deleteSite, getNodeByPath } from '@jahia/cypress'
import { LUXE_PREPACKAGED_SITE, LUXE_SITE_KEY } from '../../support/constants'
import { createLuxeSite } from '../../support/test-helpers'

/**
 * Import process coverage (external QA recommendation): a fresh import of the
 * prepackaged site must complete, publish, render anonymously in both site
 * languages and contain every content family.
 *
 * NOTE: the QA recommendation also asked for imports under *different site
 * keys*, but the core provisioning `importSite` operation of Jahia 8.2.4 only
 * reads the archive URL (no `siteKey` override — verified in
 * org.jahia.bundles.provisioning ImportSite): the key is pinned inside the
 * zip. Parameterized keys need a core evolution first.
 *
 * The import takes 2-3 minutes; this spec leaves the site in place so the
 * `luxe-prepackaged-website/` specs reuse it (see ensureLuxeSite).
 */
const IMPORT_SOFT_THRESHOLD_MS = 5 * 60 * 1000

const countByType = (type: string) =>
	cy
		.request({
			method: 'POST',
			url: '/modules/graphql',
			headers: { Referer: String(Cypress.config('baseUrl')) },
			body: {
				query: `query ($query: String!) {
					jcr(workspace: LIVE) { nodesByQuery(query: $query) { pageInfo { totalCount } } }
				}`,
				variables: {
					query: `SELECT * FROM [${type}] WHERE ISDESCENDANTNODE('/sites/${LUXE_SITE_KEY}')`,
				},
			},
		})
		.then(({ body }) => body.data.jcr.nodesByQuery.pageInfo.totalCount as number)

describe('Import - 90 Prepackaged site import', () => {
	before('Delete any existing luxe site to measure a fresh import', () => {
		cy.login()
		deleteSite(LUXE_SITE_KEY)
	})

	it('imports and publishes the prepackaged site (duration reported, warn-only)', () => {
		let start: number
		cy.then(() => {
			start = Date.now()
		})

		createLuxeSite(LUXE_SITE_KEY, LUXE_PREPACKAGED_SITE)

		cy.then(() => {
			const elapsedMs = Date.now() - start
			cy.log(`Prepackaged site import + publication took ${Math.round(elapsedMs / 1000)}s`)
			if (elapsedMs > IMPORT_SOFT_THRESHOLD_MS) {
				// Warn-only performance signal: report, do not fail
				cy.log(`WARNING: import exceeded the ${IMPORT_SOFT_THRESHOLD_MS / 60000} min soft threshold`)
			}
		})

		getNodeByPath(`/sites/${LUXE_SITE_KEY}`).its('data.jcr.nodeByPath.uuid').should('be.a', 'string')
		cy.logout()
	})

	it('renders the imported home anonymously in both site languages', () => {
		cy.visit(`/sites/${LUXE_SITE_KEY}/home.html`)
		cy.get('h1').should('have.length', 1)
		cy.get('nav a').should('have.length.greaterThan', 0)

		cy.visit(`/fr/sites/${LUXE_SITE_KEY}/home.html`)
		cy.get('h1').should('have.length', 1)
	})

	it('imported live content contains every content family (light integrity scan)', () => {
		countByType('luxe:estate').should('be.greaterThan', 0)
		countByType('luxe:realtor').should('be.greaterThan', 0)
		countByType('luxe:agency').should('be.greaterThan', 0)
		countByType('luxe:blogPost').should('be.greaterThan', 0)
		countByType('jnt:page').should('be.greaterThan', 1)
	})
})
