import { GENERIC_SITE_KEY } from '../../support/constants'
import { createAgency, createContentFolder, createEstate, createRealtor, uploadImage } from '../../support/fixtures'

const sitePath = `/sites/${GENERIC_SITE_KEY}`

// The jContent preview drawer simply fetches this editframe URL and injects
// the returned HTML into its iframe (the cm views of Estate/Realtor/Agency
// wrap their fullPage view with CMPreview). Asserting on that markup directly
// covers the module's contract without driving jContent's UI machinery.
const editframeUrl = (nodePath: string) => `/cms/editframe/default/en${nodePath}.html?redirect=false`

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

	/** Fetch the cm view markup of a node the way the jContent preview panel does. */
	const requestCmMarkup = (nodePath: string): Cypress.Chainable<string> =>
		cy.request(editframeUrl(nodePath)).then((response) => {
			expect(response.status).to.equal(200)
			return cy.wrap(response.body as string, { log: false })
		})

	it('renders the estate cm view in the preview markup', () => {
		requestCmMarkup(`${sitePath}/contents/agencies/preview-agency/preview-estate`).then((html) => {
			const doc = Cypress.$(html)
			expect(doc.find('main'), '<main> from CMPreview').to.have.length.at.least(1)
			expect(doc.find('h1, h2').text()).to.contain('Preview Estate')
			expect(html).to.contain('750,000')
		})
	})

	it('renders the realtor cm view in the preview markup', () => {
		requestCmMarkup(`${sitePath}/contents/preview-realtor`).then((html) => {
			const doc = Cypress.$(html)
			expect(doc.find('main'), '<main> from CMPreview').to.have.length.at.least(1)
			expect(doc.text()).to.contain('Jane')
			expect(doc.text()).to.contain('Preview')
		})
	})

	it('renders the agency cm view in the preview markup', () => {
		requestCmMarkup(`${sitePath}/contents/agencies/preview-agency`).then((html) => {
			const doc = Cypress.$(html)
			expect(doc.find('main'), '<main> from CMPreview').to.have.length.at.least(1)
			expect(doc.text()).to.contain('Preview Agency')
		})
	})
})
