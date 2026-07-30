import { publishAndWaitJobEnding } from '@jahia/cypress'
import { ContentEditor } from '@jahia/jcontent-cypress/dist/page-object/contentEditor'
import { ContentTypeSelector } from '@jahia/jcontent-cypress/dist/page-object/createContent'
import { DeleteDialog } from '@jahia/jcontent-cypress/dist/page-object/deleteDialog'
import { JContent } from '@jahia/jcontent-cypress/dist/page-object/jcontent'
import { GENERIC_SITE_KEY } from '../../support/constants'
import { addSimplePage } from '../../support/test-helpers'
import { uploadImage } from '../../support/fixtures'

const sitePath = `/sites/${GENERIC_SITE_KEY}`
const pagePath = `${sitePath}/home/pb-page`
const areaPath = `${pagePath}/main`
const sectionPath = `${areaPath}/pb-section`
const illustratedPath = `${sectionPath}/pb-illustrated`

/**
 * Page Builder CRUD on the module's own components: drop a `luxe:section`
 * into the page area, nest a `luxe:textIllustrated` (title + richtext +
 * mandatory image picker), edit a property, check the live render and delete.
 * The tests are sequential steps of one editing session — order matters.
 *
 * NOTE: `luxe:section` renders only its children (no title markup), so render
 * assertions go through the nested textIllustrated.
 */
describe('Editing - 81 Page Builder CRUD', () => {
	before('Create the target page and a media fixture', () => {
		cy.login()
		addSimplePage(`${sitePath}/home`, 'pb-page', 'PB Page', 'en', 'centered', [
			{ name: 'main', primaryNodeType: 'jnt:contentList' },
		])
		uploadImage(`${sitePath}/files`, 'pb-image.jpg')
		cy.logout()
	})

	beforeEach('Login', () => {
		cy.login()
	})

	afterEach('Logout', () => {
		cy.logout()
	})

	const openPageBuilder = () => JContent.visit(GENERIC_SITE_KEY, 'en', 'pages/home/pb-page').switchToPageBuilder()

	/** The unrestricted areas show a single "New content" button opening the type selector. */
	const createContentOfType = (
		pb: ReturnType<typeof openPageBuilder>,
		modulePath: string,
		displayName: string,
		type: string,
	) => {
		pb.getModule(modulePath).getCreateButtons().getButton('New content').click()
		const typeSelector = new ContentTypeSelector(cy.get(ContentTypeSelector.defaultSelector))
		typeSelector.searchForContentType(displayName)
		typeSelector.selectContentType(type)
		typeSelector.create()
	}

	/** Pin the system name (long forms hide the field — force the interaction). */
	const pinSystemName = (ce: ContentEditor, name: string) => {
		ce.getSmallTextField('nt:base_ce:systemName').clearValue(true).addNewValue(name, true)
	}

	it('creates a luxe:section from the empty area create button', () => {
		const pb = openPageBuilder()
		createContentOfType(pb, areaPath, 'Page Section', 'luxe:section')

		const ce = ContentEditor.getContentEditor()
		ce.getSmallTextField('luxe:section_jcr:title').addNewValue('PB Section')
		// The module paths asserted by every following step depend on the name
		pinSystemName(ce, 'pb-section')
		ce.create()

		// Creating reloads the PB iframe: reopen to get a fresh frame reference
		openPageBuilder().getModule(sectionPath).getBox().get().should('exist')
	})

	it('nests a luxe:textIllustrated inside the section (mandatory image picker)', () => {
		const pb = openPageBuilder()
		createContentOfType(pb, sectionPath, 'Text Illustrated', 'luxe:textIllustrated')

		const ce = ContentEditor.getContentEditor()
		ce.getSmallTextField('luxe:textIllustrated_title').addNewValue('PB Illustrated')
		pinSystemName(ce, 'pb-illustrated')
		ce.getRichTextField('luxe:textIllustrated_text').type('An illustrated text created from Page Builder')
		// The media picker opens in grid (thumbnail) mode — picker.search()
		// asserts on the table view, so pick the card directly (single media)
		const picker = ce.getPickerField('luxe:textIllustrated_image').open()
		picker.getGrid().getCardByName('pb-image.jpg').click()
		picker.select()
		ce.create()

		openPageBuilder().getModule(illustratedPath).get().should('contain.text', 'PB Illustrated')
	})

	it('edits the textIllustrated title and sees the render update', () => {
		const pb = openPageBuilder()
		// Double-clicking a module is the canonical way to open its editor
		pb.getModule(illustratedPath).doubleClick({ force: true })

		const ce = ContentEditor.getContentEditor()
		ce.getSmallTextField('luxe:textIllustrated_title').clearValue().addNewValue('PB Illustrated Updated')
		ce.save()

		openPageBuilder().getModule(illustratedPath).get().should('contain.text', 'PB Illustrated Updated')
	})

	it('renders the created content on the published live page', () => {
		// The whole site must go live: the Layout resolves the site home in the
		// live workspace (nav menu), which must exist for any page to render
		publishAndWaitJobEnding(sitePath, ['en'])
		cy.visit(`${pagePath}.html`)

		cy.contains('h2', 'PB Illustrated Updated').should('be.visible')
		cy.contains('An illustrated text created from Page Builder').should('be.visible')
		cy.get('img[src*="pb-image.jpg"]').should('exist')
	})

	// KNOWN CORE BUG: selecting "Delete" in the Page Builder module context
	// menu crashes jContent ("Cannot read properties of undefined (reading
	// 'sort')") and blanks the app — the deletion is driven through the list
	// view instead, and the Page Builder is only used to assert the states.
	it('deletes the textIllustrated and publishes the deletion', () => {
		// The page list view flattens area lists: components are direct rows
		const openContentList = () => JContent.visit(GENERIC_SITE_KEY, 'en', 'pages/home/pb-page').switchToListMode()

		openContentList().getTable().getRowByName('pb-illustrated').contextMenu().select('Delete')
		new DeleteDialog(cy.get(DeleteDialog.defaultSelector)).markForDeletion()

		// The Page Builder shows the module as marked for deletion
		openPageBuilder().getModule(illustratedPath).getForDeletionStatus().should('exist')

		// Publishing the deletion removes the node from both workspaces
		openContentList().getTable().getRowByName('pb-illustrated').contextMenu().select('Publish deletion')
		// The publication dashboard opens on the deletion summary
		cy.contains('button', 'Publish now').click()
		cy.waitUntil(
			() => cy.request(`${pagePath}.html`).then((response) => !response.body.includes('PB Illustrated Updated')),
			{ timeout: 60000, interval: 1000, errorMsg: 'live page still shows the deleted content' },
		)

		const after = openPageBuilder()
		after.getModule(sectionPath).getBox().get().should('exist')
		after.iframe().get().find(`[jahiatype="module"][path="${illustratedPath}"]`).should('not.exist')
	})
})
