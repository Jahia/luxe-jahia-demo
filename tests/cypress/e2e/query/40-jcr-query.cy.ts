import { publishAndWaitJobEnding } from '@jahia/cypress'
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
const pagePath = `${sitePath}/home/query-page`
const areaPath = `${pagePath}/main`
const blogFolder = `${sitePath}/contents/blog`
const otherFolder = `${sitePath}/contents/other`

// Categories live under the global system site: unique names + cleanup
const CAT_A = 'luxe-e2e-query-cat-a'
const CAT_B = 'luxe-e2e-query-cat-b'

/** Titles of the blog-post cards listed by the jcrQuery titled `title`, in DOM order. */
const listedTitles = (title: string): Cypress.Chainable<string[]> =>
	cy
		.contains('h2', title)
		.closest('div[class*="_root_"]')
		.find('a[class*="_card_"] h2')
		.then(($titles) => $titles.toArray().map((el) => el.textContent?.trim() ?? ''))

describe('Query - 40 luxe:jcrQuery listing', () => {
	before('Create categorized blog posts and one jcrQuery per scenario', () => {
		cy.login()

		// Categories are global fixtures: remove leftovers from aborted runs,
		// sync the deletion to live, then recreate them fresh
		deleteCategoryIfExists(CAT_A)
		deleteCategoryIfExists(CAT_B)
		publishAndWaitJobEnding('/sites/systemsite/categories', ['en'])

		createCategory(CAT_A).then((catA) => {
			createCategory(CAT_B).then((catB) => {
				createContentFolder(`${sitePath}/contents`, 'blog').then((blogRef) => {
					createContentFolder(`${sitePath}/contents`, 'other')

					uploadImage(`${sitePath}/files`, 'query.jpg').then((imageUuid) => {
						// Sequential creation fixes the jcr:created order: One is oldest
						createBlogPost(blogFolder, { name: 'post-1', title: 'Post One', imageUuid }).then((postOne) => {
							createBlogPost(blogFolder, {
								name: 'post-2',
								title: 'Post Two',
								imageUuid,
								categoryUuids: [catA.uuid],
							})
							createBlogPost(blogFolder, {
								name: 'post-3',
								title: 'Post Three',
								imageUuid,
								categoryUuids: [catA.uuid],
							})
							createBlogPost(blogFolder, {
								name: 'post-4',
								title: 'Post Four',
								imageUuid,
								categoryUuids: [catB.uuid],
							})
							// In a separate folder, outside the startNode of the scoped query
							createBlogPost(otherFolder, { name: 'post-5', title: 'Post Five', imageUuid })

							addSimplePage(`${sitePath}/home`, 'query-page', 'Query Page', 'en', 'centered', [
								{ name: 'main', primaryNodeType: 'jnt:contentList' },
							]).then((result) => {
								expect(result?.errors, 'GraphQL errors creating query-page').to.equal(undefined)

								createJcrQuery(areaPath, {
									name: 'query-desc',
									title: 'Query Desc',
									type: 'luxe:blogPost',
									criteria: 'jcr:created',
									sortDirection: 'desc',
								})
								createJcrQuery(areaPath, {
									name: 'query-asc',
									title: 'Query Asc',
									type: 'luxe:blogPost',
									criteria: 'jcr:created',
									sortDirection: 'asc',
								})
								createJcrQuery(areaPath, {
									name: 'query-max',
									title: 'Query Max',
									type: 'luxe:blogPost',
									criteria: 'jcr:created',
									sortDirection: 'desc',
									maxItems: 2,
								})
								createJcrQuery(areaPath, {
									name: 'query-scoped',
									title: 'Query Scoped',
									type: 'luxe:blogPost',
									criteria: 'jcr:created',
									sortDirection: 'desc',
									startNodeUuid: blogRef.uuid,
								})
								createJcrQuery(areaPath, {
									name: 'query-cat',
									title: 'Query Cat',
									type: 'luxe:blogPost',
									criteria: 'jcr:created',
									sortDirection: 'desc',
									filterCategoryUuids: [catA.uuid],
								})
								createJcrQuery(areaPath, {
									name: 'query-exclude',
									title: 'Query Exclude',
									type: 'luxe:blogPost',
									criteria: 'jcr:created',
									sortDirection: 'desc',
									excludeNodeUuids: [postOne.uuid],
								})
							})
						})
					})
				})
			})
		})

		// The jcrQuery `filter`/`startNode` weakrefs resolve in the live workspace too
		publishAndWaitJobEnding('/sites/systemsite/categories', ['en'])
		publishAndWaitJobEnding(sitePath, ['en'])
		cy.logout()
	})

	after('Remove the global category fixtures', () => {
		cy.login()
		deleteCategoryIfExists(CAT_A)
		deleteCategoryIfExists(CAT_B)
		publishAndWaitJobEnding('/sites/systemsite/categories', ['en'])
		cy.logout()
	})

	beforeEach(() => {
		cy.visit(`${pagePath}.html`)
	})

	it('lists items ordered by the sort criteria and direction', () => {
		listedTitles('Query Desc').should('deep.equal', [
			'Post Five',
			'Post Four',
			'Post Three',
			'Post Two',
			'Post One',
		])
		listedTitles('Query Asc').should('deep.equal', ['Post One', 'Post Two', 'Post Three', 'Post Four', 'Post Five'])
	})

	it('caps the list at maxItems', () => {
		listedTitles('Query Max').should('deep.equal', ['Post Five', 'Post Four'])
	})

	it('restricts the results to the startNode subtree', () => {
		listedTitles('Query Scoped').should('deep.equal', ['Post Four', 'Post Three', 'Post Two', 'Post One'])
	})

	it('filters items by category', () => {
		listedTitles('Query Cat').should('deep.equal', ['Post Three', 'Post Two'])
	})

	it('excludes the referenced nodes from the results', () => {
		listedTitles('Query Exclude').should('deep.equal', ['Post Five', 'Post Four', 'Post Three', 'Post Two'])
	})
})
