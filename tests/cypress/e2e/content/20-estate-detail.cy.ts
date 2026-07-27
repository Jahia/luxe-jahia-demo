import { deleteNode, publishAndWaitJobEnding } from '@jahia/cypress'
import { GENERIC_SITE_KEY } from '../../support/constants'
import { createAgency, createContentFolder, createEstate, uploadImage } from '../../support/fixtures'

const sitePath = `/sites/${GENERIC_SITE_KEY}`
const agenciesFolder = `${sitePath}/contents/agencies`
// Estates can only live under a luxe:agency (see the agency CND child node definition)
const agencyPath = `${agenciesFolder}/estate-agency`

describe('Content - 20 Estate detail page', () => {
	before('Create an agency and its estates', () => {
		cy.login()
		createContentFolder(`${sitePath}/contents`, 'agencies')
		uploadImage(`${sitePath}/files`, 'estate-1.jpg').then((firstImage) => {
			uploadImage(`${sitePath}/files`, 'estate-2.jpg').then((secondImage) => {
				createAgency(agenciesFolder, { name: 'estate-agency', imageUuid: firstImage }).then(() => {
					createEstate(agencyPath, {
						name: 'full-estate',
						title: 'Full Estate',
						titleFr: 'Propriété complète',
						description: '<p>A fully described estate.</p>',
						price: 1500000,
						surface: 250,
						type: 'house',
						imageUuids: [firstImage, secondImage],
					})

					// The JCR blocks creating an estate without its mandatory images, so
					// the missing-image scenario (audit W-1/W-2) is produced with a
					// dangling weakreference: the referenced image node is deleted
					uploadImage(`${sitePath}/files`, 'estate-to-delete.jpg').then((deletedImage) => {
						createEstate(agencyPath, {
							name: 'dangling-image-estate',
							title: 'Dangling Image Estate',
							imageUuids: [deletedImage],
						}).then(() => {
							deleteNode(deletedImage)
						})
					})
				})
			})
		})

		publishAndWaitJobEnding(sitePath, ['en', 'fr'])
		cy.logout()
	})

	it('formats price and surface per locale without stray characters (audit C-2)', () => {
		cy.visit(`${agencyPath}/full-estate.html`)
		cy.get('h1').should('contain.text', 'Full Estate')
		cy.contains('p', '1,500,000 €').should('be.visible')

		// C-2 regression: the surface once rendered as "$250 m²"
		cy.contains('dd', '250')
			.invoke('text')
			.should('match', /^250\s*m/)
			.and('not.contain', '$')
	})

	it('formats price with the French locale on the FR variant', () => {
		cy.visit(`/fr${agencyPath}/full-estate.html`)
		cy.get('h1').should('contain.text', 'Propriété complète')
		// French grouping uses (narrow) no-break spaces: match digits loosely
		cy.contains('p', '€')
			.invoke('text')
			.should('match', /1\D500\D000/)
	})

	it('falls back to the placeholder when the image reference is dangling (audit W-1/W-2)', () => {
		cy.visit(`${agencyPath}/dangling-image-estate.html`)
		cy.get('h1').should('contain.text', 'Dangling Image Estate')
		cy.get('img[data-part="mainImage"]').should('have.attr', 'src').and('include', 'img-placeholder')
	})

	it('opens the gallery slideshow from the main image (island hydration)', () => {
		cy.visit(`${agencyPath}/full-estate.html`)
		cy.get('img[data-part="mainImage"]').click()
		cy.get('button[aria-label="Next image"]').should('be.visible')
		cy.get('button[aria-label="Previous image"]').should('be.visible')
	})
})
