import { LUXE_SITE_KEY } from '../../../support/constants'

/**
 * SEO baseline of mainResource detail pages (rendered through the
 * `jmix:mainResource` template + Layout SeoMetaTags): locale-aware og meta,
 * absolute og:url and a single h1 on every content type.
 *
 * The paths below are stable content of the prepackaged site import
 * (read-only — never mutate this site).
 */
const SITE_NAME = 'Demo Site Luxe'

const detailPages = [
	{ label: 'estate', path: `/sites/${LUXE_SITE_KEY}/contents/agencies/luxe-asia/bien-immobilier.html` },
	{ label: 'realtor', path: `/sites/${LUXE_SITE_KEY}/contents/realtors/fox.html` },
	{ label: 'agency', path: `/sites/${LUXE_SITE_KEY}/contents/agencies/luxe-asia.html` },
	{ label: 'blog post', path: `/sites/${LUXE_SITE_KEY}/home/blog/main/blog-posts/mykonos.html` },
]

describe('SEO - 71 Main-resource detail pages', () => {
	detailPages.forEach(({ label, path }) => {
		it(`exposes locale-aware og meta and a single h1 on the ${label} page`, () => {
			cy.visit(path)

			cy.get('head meta[property="og:locale"]').should('have.attr', 'content', 'en')
			cy.get('head meta[property="og:type"]').should('have.attr', 'content', 'website')
			cy.get('head meta[property="og:site_name"]').should('have.attr', 'content', SITE_NAME)
			cy.get('head meta[property="og:url"]')
				.should('have.attr', 'content')
				.and('match', /^https?:\/\//)
				.and('include', path)

			cy.get('h1').should('have.length', 1).invoke('text').should('not.be.empty')
		})
	})

	it('switches og:locale and og:url to French on the FR URL', () => {
		const { path } = detailPages[0]
		cy.visit(`/fr${path}`)

		cy.get('head meta[property="og:locale"]').should('have.attr', 'content', 'fr')
		cy.get('head meta[property="og:url"]')
			.should('have.attr', 'content')
			.and('match', /^https?:\/\//)
			.and('include', `/fr/sites/${LUXE_SITE_KEY}/`)
			.and('include', path)
	})

	// KNOWN GAP (feeds the site-review findings of issue #435): mainResource
	// types store their name in a type-specific `title` property while the
	// Layout's SeoMetaTags only reads `jcr:title` — detail pages therefore
	// render NO <title> and no og:title today. Re-enable once SeoMetaTags
	// falls back on the node display name (expected: `{title} | {siteName}`).
	it.skip('renders a <title> tag on every detail page', () => {
		detailPages.forEach(({ path }) => {
			cy.visit(path)
			cy.title().should('not.be.empty').and('contain', SITE_NAME)
		})
	})
})
