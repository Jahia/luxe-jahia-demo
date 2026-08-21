import { LUXE_SITE_KEY } from '../../../support/constants'

/**
 * Regression coverage for the image architecture (PR #436): hero images are
 * prioritized (LCP fix), lazy images reserve their dimensions (CLS), and JCR
 * raster images expose width-based srcset candidates.
 *
 * The agency and realtor detail pages cover the ContentHeader/LuxeImage path
 * (PR #452): they are the only views rendering an image through ContentHeader.
 */
const urls = [
	`/sites/${LUXE_SITE_KEY}/home.html`,
	`/sites/${LUXE_SITE_KEY}/contents/agencies/luxe-europe.html`,
	`/sites/${LUXE_SITE_KEY}/contents/realtors/eleanor-pearl.html`,
]

urls.forEach((url) =>
	describe(`Images - 30 Responsive image rendering on ${url}`, () => {
		beforeEach(() => {
			cy.visit(url)
		})

		it('renders the hero image eagerly with high fetch priority (LCP)', () => {
			// The hero is the image sharing the page-level h1 section
			// (Header views on home, ContentHeader on detail pages)
			cy.get('h1')
				.closest('section')
				.find('img')
				.first()
				.should('have.attr', 'fetchpriority', 'high')
				.and('not.have.attr', 'loading', 'lazy')
		})

		it('reserves dimensions on every lazy-loaded image (no CLS)', () => {
			cy.get('img[loading="lazy"]')
				.should('have.length.greaterThan', 0)
				.each(($img) => {
					expect($img.attr('width'), `width of ${$img.attr('src')}`).to.not.equal(undefined)
					expect($img.attr('height'), `height of ${$img.attr('src')}`).to.not.equal(undefined)
				})
		})

		it('exposes width-based srcset candidates on JCR raster images', () => {
			cy.get('img[srcset]').then(($imgs) => {
				const withSizedCandidates = $imgs
					.toArray()
					.filter((img) => /[?&](amp;)?w=\d+/.test(img.getAttribute('srcset') ?? ''))
				expect(withSizedCandidates.length, 'images with ?w= srcset candidates').to.be.greaterThan(0)
			})
		})

		it('sets an alt attribute on every image', () => {
			cy.get('img').each(($img) => {
				expect($img.attr('alt'), `alt of ${$img.attr('src')}`).to.not.equal(undefined)
			})
		})
	}),
)
