import { deleteNode, publishAndWaitJobEnding } from '@jahia/cypress'
import { GENERIC_SITE_KEY } from '../../support/constants'
import { addSimplePage } from '../../support/test-helpers'
import {
	createBlogPost,
	createCategory,
	createContentFolder,
	createJcrQuery,
	deleteCategoryIfExists,
	uploadImage,
} from '../../support/fixtures'

const sitePath = `/sites/${GENERIC_SITE_KEY}`
const pagePath = `${sitePath}/home/query-edge-page`
const areaPath = `${pagePath}/main`
const blogFolder = `${sitePath}/contents/blog`

// Global system-site fixture, deleted mid-setup to produce the dangling ref
const CAT_DELETED = 'luxe-e2e-query-cat-deleted'

/** The edit-mode render of the page, as served to the Page Builder iframe. */
const visitEditMode = () => cy.visit(`/cms/editframe/default/en${pagePath}.html`)

/** Scope assertions to the jcrQuery component named `name` (by node path). */
const componentRoot = (name: string) => cy.get(`[path="${areaPath}/${name}"]`)

describe('Query - 41 luxe:jcrQuery edge cases', () => {
	before('Create queries with no results and dangling references', () => {
		cy.login()
		deleteCategoryIfExists(CAT_DELETED)

		createContentFolder(`${sitePath}/contents`, 'blog')
		addSimplePage(`${sitePath}/home`, 'query-edge-page', 'Query Edge Page', 'en', 'centered', [
			{ name: 'main', primaryNodeType: 'jnt:contentList' },
		]).then((result) => {
			expect(result?.errors, 'GraphQL errors creating query-edge-page').to.equal(undefined)

			// Scoped to a folder that stays empty: these two queries return nothing
			// (the site itself does hold blog posts, created below)
			createContentFolder(`${sitePath}/contents`, 'empty').then((emptyRef) => {
				createJcrQuery(areaPath, {
					name: 'query-empty-custom',
					title: 'Empty Custom',
					type: 'luxe:blogPost',
					startNodeUuid: emptyRef.uuid,
					noResultText: 'Nothing to display here',
				})
				createJcrQuery(areaPath, {
					name: 'query-empty-default',
					title: 'Empty Default',
					type: 'luxe:blogPost',
					startNodeUuid: emptyRef.uuid,
				})
			})

			uploadImage(`${sitePath}/files`, 'edge.jpg').then((imageUuid) => {
				createBlogPost(blogFolder, { name: 'edge-post', title: 'Edge Post', imageUuid })

				// Dangling category: reference it, then delete the category
				createCategory(CAT_DELETED).then((cat) => {
					createJcrQuery(areaPath, {
						name: 'query-broken-cat',
						title: 'Broken Category',
						type: 'luxe:blogPost',
						filterCategoryUuids: [cat.uuid],
					}).then(() => {
						deleteNode(cat.path)
					})
				})

				// Dangling excludeNodes: reference a post, then delete it
				createBlogPost(blogFolder, { name: 'doomed-post', title: 'Doomed Post', imageUuid }).then((doomed) => {
					createJcrQuery(areaPath, {
						name: 'query-broken-exclude',
						title: 'Broken Exclude',
						type: 'luxe:blogPost',
						excludeNodeUuids: [doomed.uuid],
					}).then(() => {
						deleteNode(doomed.path)
					})
				})
			})
		})

		publishAndWaitJobEnding(sitePath, ['en'])
		cy.logout()
	})

	it('shows the authored noResultText in edit mode when the query is empty', () => {
		cy.login()
		visitEditMode()
		componentRoot('query-empty-custom').find('[role="alert"]').should('contain.text', 'Nothing to display here')
	})

	it('falls back to the default no-result message in edit mode', () => {
		cy.login()
		visitEditMode()
		componentRoot('query-empty-default')
			.find('[role="alert"]')
			.should('contain.text', 'no result returned for this query')
	})

	it('warns about a removed category in edit mode and still lists results', () => {
		cy.login()
		visitEditMode()
		componentRoot('query-broken-cat').within(() => {
			cy.get('[role="alert"]').should(
				'contain.text',
				"one category was removed or is missing, please review the query  : 'Broken Category'",
			)
		})
	})

	it('warns about a removed excluded node in edit mode and still lists results', () => {
		cy.login()
		visitEditMode()
		componentRoot('query-broken-exclude').within(() => {
			cy.get('[role="alert"]').should(
				'contain.text',
				"one excluded node was removed or is missing, please review the query  : 'Broken Exclude'",
			)
			// The broken exclusion is ignored: the remaining post is still listed
			cy.contains('a[class*="_card_"] h2', 'Edge Post').should('exist')
		})
	})

	it('renders no alert and no empty section in live mode', () => {
		cy.visit(`${pagePath}.html`)
		cy.get('[role="alert"]').should('not.exist')
		cy.contains('Nothing to display here').should('not.exist')
		cy.contains('h2', 'Empty Custom').should('not.exist')
	})
})
