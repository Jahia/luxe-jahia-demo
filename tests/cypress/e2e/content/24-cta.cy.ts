import { deleteNodeProperty, publishAndWaitJobEnding } from '@jahia/cypress'
import { GENERIC_SITE_KEY } from '../../support/constants'
import { addSimplePage } from '../../support/test-helpers'
import { createTextIllustrated, uploadImage } from '../../support/fixtures'

const sitePath = `/sites/${GENERIC_SITE_KEY}`
const pagePath = `${sitePath}/home/cta-page`
const areaPath = `${pagePath}/main`

/** Find the CTA anchor of the TextIllustrated component titled `title`. */
const ctaOf = (title: string) => cy.contains('h2', title).parent().find('a')

describe('Content - 24 CTA mixin (TextIllustrated)', () => {
	before('Create a page with one TextIllustrated per CTA variant', () => {
		cy.login()

		addSimplePage(`${sitePath}/home`, 'cta-page', 'CTA Page', 'en', 'centered', [
			{ name: 'main', primaryNodeType: 'jnt:contentList' },
		])

		uploadImage(`${sitePath}/files`, 'cta.jpg').then((imageUuid) => {
			addSimplePage(`${sitePath}/home`, 'cta-linked', 'Linked Page', 'en', 'centered').then((result) => {
				const linkedUuid = result?.data?.jcr?.addNode?.uuid as string

				createTextIllustrated(areaPath, {
					name: 'cta-internal',
					title: 'Internal CTA',
					text: '<p>Internal link.</p>',
					imageUuid,
					cta: { ctaType: 'internal', linkNodeUuid: linkedUuid, ctaLabel: 'Discover more' },
				})

				// No label: the link text must fall back to the linked page title
				createTextIllustrated(areaPath, {
					name: 'cta-internal-no-label',
					title: 'Internal CTA without label',
					text: '<p>Internal link, no label.</p>',
					imageUuid,
					cta: { ctaType: 'internal', linkNodeUuid: linkedUuid },
				})

				createTextIllustrated(areaPath, {
					name: 'cta-external',
					title: 'External CTA',
					text: '<p>External link.</p>',
					imageUuid,
					cta: { ctaType: 'external', url: 'https://example.com/luxe', ctaLabel: 'Visit example' },
				})

				createTextIllustrated(areaPath, {
					name: 'cta-none',
					title: 'No CTA',
					text: '<p>No link.</p>',
					imageUuid,
					cta: { ctaType: 'none' },
				})

				// Legacy content predating the CTA mixin has no ctaType at all (audit S-6)
				createTextIllustrated(areaPath, {
					name: 'cta-legacy',
					title: 'Legacy CTA',
					text: '<p>Legacy content.</p>',
					imageUuid,
					cta: { ctaType: 'none' },
				}).then(({ path }) => {
					deleteNodeProperty(path, 'ctaType', 'en')
				})
			})
		})

		publishAndWaitJobEnding(sitePath, ['en'])
		cy.logout()
	})

	beforeEach(() => {
		cy.visit(`${pagePath}.html`)
	})

	it('renders an internal CTA resolved from j:linknode', () => {
		ctaOf('Internal CTA')
			.should('have.attr', 'href', `${sitePath}/home/cta-linked.html`)
			.and('contain.text', 'Discover more')
	})

	it('falls back to the linked page title when the label is empty', () => {
		ctaOf('Internal CTA without label').should('contain.text', 'Linked Page')
	})

	it('renders an external CTA from j:url', () => {
		ctaOf('External CTA')
			.should('have.attr', 'href', 'https://example.com/luxe')
			.and('contain.text', 'Visit example')
	})

	it('renders no link at all when ctaType is none', () => {
		cy.contains('h2', 'No CTA').parent().find('a').should('not.exist')
	})

	it('renders no dead link on legacy content without ctaType (audit S-6)', () => {
		cy.contains('h2', 'Legacy CTA').parent().find('a').should('not.exist')
	})
})
