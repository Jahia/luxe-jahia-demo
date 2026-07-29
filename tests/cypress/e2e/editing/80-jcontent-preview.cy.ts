import { JContent } from '@jahia/jcontent-cypress/dist/page-object/jcontent'
import { GENERIC_SITE_KEY } from '../../support/constants'
import { createAgency, createContentFolder, createEstate, createRealtor, uploadImage } from '../../support/fixtures'

const sitePath = `/sites/${GENERIC_SITE_KEY}`

// JContent renders the internal preview inside this drawer iframe (the cm
// views of Estate/Realtor/Agency wrap their fullPage view with CMPreview)
const previewIframe = 'iframe[data-sel-role="edit-preview-frame"]'

describe('Editing - 80 jContent preview (cm views)', () => {
	before('Create one node of each previewable type', () => {
		cy.login()
		createContentFolder(`${sitePath}/contents`, 'agencies')
		uploadImage(`${sitePath}/files`, 'preview.jpg').then((imageUuid) => {
			createRealtor(`${sitePath}/contents`, {
				name: 'preview-realtor',
				firstName: 'Jane',
				lastName: 'Preview',
				imageUuid,
			})
			createAgency(`${sitePath}/contents/agencies`, {
				name: 'preview-agency',
				agencyName: 'Preview Agency',
				imageUuid,
			}).then(() => {
				createEstate(`${sitePath}/contents/agencies/preview-agency`, {
					name: 'preview-estate',
					title: 'Preview Estate',
					price: 750000,
					imageUuids: [imageUuid],
				})
			})
		})

		cy.logout()
	})

	beforeEach('Login', () => {
		cy.login()
	})

	afterEach('Logout', () => {
		cy.logout()
	})

	/** Open the internal preview of a row and yield the preview document body. */
	const openPreview = (folderPath: string, nodeName: string): Cypress.Chainable<JQuery> => {
		const jcontent = JContent.visit(GENERIC_SITE_KEY, 'en', `content-folders/${folderPath}`).switchToListMode()
		jcontent.getTable().getRowByName(nodeName).contextMenu().select('Preview')
		return cy
			.get(previewIframe)
			.its('0.contentDocument.body')
			.should('not.be.empty')
			.then((body) => cy.wrap(body as JQuery))
	}

	it('renders the estate cm view in the preview panel', () => {
		openPreview('contents/agencies/preview-agency', 'preview-estate').within(() => {
			cy.get('main').should('exist')
			cy.contains('h1, h2', 'Preview Estate').should('be.visible')
			cy.contains('750,000').should('be.visible')
		})
	})

	it('renders the realtor cm view in the preview panel', () => {
		openPreview('contents', 'preview-realtor').within(() => {
			cy.get('main').should('exist')
			cy.contains('Jane').should('be.visible')
			cy.contains('Preview').should('be.visible')
		})
	})

	it('renders the agency cm view in the preview panel', () => {
		openPreview('contents/agencies', 'preview-agency').within(() => {
			cy.get('main').should('exist')
			cy.contains('Preview Agency').should('be.visible')
		})
	})
})
