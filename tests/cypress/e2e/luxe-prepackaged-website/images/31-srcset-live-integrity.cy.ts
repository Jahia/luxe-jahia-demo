import { LUXE_SITE_KEY } from '../../../support/constants'

/**
 * Guard against the core srcset URL-rewriting corruption (SrcSetURLReplacer
 * splits on every comma): the module percent-encodes commas inside srcset
 * URLs, so every candidate served in live mode must stay parseable —
 * `<absolute url> [<width descriptor>]`, separated by ", ".
 */
describe('Images - 31 srcset integrity in live', () => {
	const CANDIDATE_PATTERN = /^\S+(\s+\d+(\.\d+)?[wx])?$/

	// Pages known to serve srcSet in live: the home page (hero + estate cards
	// through LuxeImage) and a blog post detail. The buy page is NOT covered:
	// its estate cards come from the SearchEstate client island, which renders
	// plain src URLs without srcSet.
	;[`/sites/${LUXE_SITE_KEY}/home.html`, `/sites/${LUXE_SITE_KEY}/home/blog/main/blog-posts/geneva.html`].forEach(
		(url) => {
			it(`serves parseable srcset attributes on ${url}`, () => {
				cy.visit(url)
				cy.get('img[srcset]')
					.should('have.length.greaterThan', 0)
					.each(($img) => {
						const srcset = $img.attr('srcset') ?? ''
						srcset.split(/,\s+/).forEach((candidate) => {
							const trimmed = candidate.trim()
							expect(trimmed, `candidate "${trimmed}" of "${srcset}"`).to.match(CANDIDATE_PATTERN)

							const candidateUrl = trimmed.split(/\s+/)[0]
							// A fragment produced by a corrupted split would be relative garbage
							expect(candidateUrl, `URL of candidate "${trimmed}"`).to.match(/^(\/|https?:\/\/)/)
							expect(candidateUrl, 'URL must not start or end with a comma').to.not.match(/^,|,$/)
						})
					})
			})
		},
	)
})
