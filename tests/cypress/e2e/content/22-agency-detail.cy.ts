import { deleteNode, publishAndWaitJobEnding } from '@jahia/cypress'
import { GENERIC_SITE_KEY } from '../../support/constants'
import { createAgency, createContentFolder, createEstate, createRealtor, uploadImage } from '../../support/fixtures'

const sitePath = `/sites/${GENERIC_SITE_KEY}`
const realtorsFolder = `${sitePath}/contents/realtors`
const agenciesFolder = `${sitePath}/contents/agencies`
const agencyPath = `${agenciesFolder}/big-agency`

describe('Content - 22 Agency detail page', () => {
	before('Create an agency with two realtors and seven estates', () => {
		cy.login()
		createContentFolder(`${sitePath}/contents`, 'realtors')
		createContentFolder(`${sitePath}/contents`, 'agencies')

		uploadImage(`${sitePath}/files`, 'agency.jpg').then((imageUuid) => {
			createRealtor(realtorsFolder, { name: 'realtor-one', firstName: 'Alice', lastName: 'One' }).then(
				({ uuid: firstRealtor }) => {
					createRealtor(realtorsFolder, { name: 'realtor-two', firstName: 'Bob', lastName: 'Two' }).then(
						({ uuid: secondRealtor }) => {
							createAgency(agenciesFolder, {
								name: 'big-agency',
								agencyName: 'Big Agency',
								description: '<p>An agency with many estates.</p>',
								imageUuid,
								realtorUuids: [firstRealtor, secondRealtor],
							}).then(({ path }) => {
								for (let index = 1; index <= 7; index++) {
									createEstate(path, {
										name: `estate-${index}`,
										title: `Estate ${index}`,
										price: index * 10000,
										imageUuids: [imageUuid],
									})
								}
							})
						},
					)
				},
			)
		})

		publishAndWaitJobEnding(sitePath, ['en'])
		cy.logout()
	})

	it('renders the agency page and caps the estate listing at 6 items', () => {
		cy.visit(`${agencyPath}.html`)
		cy.get('h1').should('contain.text', 'Big Agency')
		cy.contains('h2', 'exclusive properties').closest('section').find('a[class*="_card_"]').should('have.length', 6)
	})

	it('still renders after a referenced realtor is deleted (audit W-2)', () => {
		cy.login()
		deleteNode(`${realtorsFolder}/realtor-two`)
		publishAndWaitJobEnding(realtorsFolder, ['en'])
		cy.logout()

		// W-2 regression: a deleted reference leaves a null entry in the
		// `realtors` weakreference array; the view must filter it out
		cy.visit(`${agencyPath}.html`)
		cy.get('h1').should('contain.text', 'Big Agency')
		cy.contains('One').should('exist')
	})
})
