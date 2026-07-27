import { publishAndWaitJobEnding, setNodeProperty } from '@jahia/cypress'
import { GENERIC_SITE_KEY } from '../../support/constants'
import { createAgency, createContentFolder, createEstate, createRealtor, uploadImage } from '../../support/fixtures'

const sitePath = `/sites/${GENERIC_SITE_KEY}`
const realtorsFolder = `${sitePath}/contents/realtors`
const agenciesFolder = `${sitePath}/contents/agencies`

describe('Content - 21 Realtor detail page', () => {
	before('Create realtors, agency and estates', () => {
		cy.login()
		createContentFolder(`${sitePath}/contents`, 'realtors')
		createContentFolder(`${sitePath}/contents`, 'agencies')

		// A realtor referenced by no agency (audit C-3)
		createRealtor(realtorsFolder, {
			name: 'lone-realtor',
			firstName: 'John',
			lastName: 'Solo',
			description: '<p>Works alone.</p>',
		})

		// A realtor referenced by an agency owning two estates
		uploadImage(`${sitePath}/files`, 'agency.jpg').then((imageUuid) => {
			createRealtor(realtorsFolder, {
				name: 'team-realtor',
				firstName: 'Jane',
				lastName: 'Team',
				description: '<p>Works in an agency.</p>',
			}).then(({ uuid }) => {
				createAgency(agenciesFolder, {
					name: 'test-agency',
					agencyName: 'Luxe Testing Agency',
					description: '<p>The testing agency.</p>',
					imageUuid,
					realtorUuids: [uuid],
				}).then(({ path }) => {
					createEstate(path, { name: 'estate-a', title: 'Estate A', price: 100000, imageUuids: [imageUuid] })
					createEstate(path, { name: 'estate-b', title: 'Estate B', price: 200000, imageUuids: [imageUuid] })
				})
			})
		})

		publishAndWaitJobEnding(sitePath, ['en'])
		cy.logout()
	})

	it('lists no estates for a realtor referenced by no agency (audit C-3)', () => {
		cy.visit(`${realtorsFolder}/lone-realtor.html`)
		cy.get('h1').should('contain.text', 'John Solo')
		// C-3 regression: the estate query once ran without a WHERE clause and
		// listed every estate of the repository
		cy.contains('exclusive properties').should('not.exist')
		cy.get('a[class*="_card_"]').should('not.exist')
	})

	it("shows the agency's estates for a referenced realtor", () => {
		cy.visit(`${realtorsFolder}/team-realtor.html`)
		cy.get('h1').should('contain.text', 'Jane Team')
		cy.contains('dd', 'Luxe Testing Agency').should('be.visible')
		cy.contains('h2', 'exclusive properties').should('be.visible')
		cy.get('a[class*="_card_"]').should('have.length', 2)
	})

	it('reflects an agency rename without a manual cache flush (audit C-4)', () => {
		// Prime the live cache with the current agency name
		cy.visit(`${realtorsFolder}/team-realtor.html`)
		cy.contains('dd', 'Luxe Testing Agency').should('be.visible')

		cy.login()
		setNodeProperty(`${agenciesFolder}/test-agency`, 'name', 'Renamed Testing Agency', 'en')
		publishAndWaitJobEnding(`${agenciesFolder}/test-agency`, ['en'])
		cy.logout()

		// C-4 regression: the realtor fragment cached the agency name without a
		// cache dependency on the agency node and served the stale value
		cy.visit(`${realtorsFolder}/team-realtor.html`)
		cy.contains('dd', 'Renamed Testing Agency').should('be.visible')
	})
})
