import { deleteNode, publishAndWaitJobEnding } from '@jahia/cypress'
import { GENERIC_SITE_KEY } from '../../support/constants'
import { createBlogPost, createContentFolder, uploadImage, type NodeRef } from '../../support/fixtures'

const sitePath = `/sites/${GENERIC_SITE_KEY}`
const blogFolder = `${sitePath}/contents/blog`
const mainPostUrl = `${blogFolder}/main-post.html`

describe('Content - 23 Blog post detail page', () => {
	before('Create a blog post with four related posts', () => {
		cy.login()
		createContentFolder(`${sitePath}/contents`, 'blog')

		uploadImage(`${sitePath}/files`, 'blog.jpg').then((imageUuid) => {
			const relatedRefs: NodeRef[] = []
			for (let index = 1; index <= 4; index++) {
				createBlogPost(blogFolder, {
					name: `related-${index}`,
					title: `Related Post ${index}`,
					body: `<p>Related content ${index}.</p>`,
					imageUuid,
				}).then((ref) => relatedRefs.push(ref))
			}

			cy.then(() => {
				createBlogPost(blogFolder, {
					name: 'main-post',
					title: 'Main Post',
					body: '<p>The main article body.</p>',
					imageUuid,
					relatedUuids: relatedRefs.map(({ uuid }) => uuid),
				})
			})
		})

		publishAndWaitJobEnding(sitePath, ['en'])
		cy.logout()
	})

	it('renders title, publication date and body', () => {
		cy.visit(mainPostUrl)
		cy.get('h1').should('contain.text', 'Main Post')
		cy.contains('The main article body.').should('be.visible')
		cy.get('time[datetime]')
			.should('have.attr', 'datetime')
			.then((datetime) => {
				expect(Number.isNaN(new Date(String(datetime)).getTime()), `datetime "${datetime}"`).to.equal(false)
			})
	})

	it('caps related posts at 3 items', () => {
		cy.visit(mainPostUrl)
		cy.contains('h2', 'recommended Blog Posts')
			.closest('section')
			.find('a[class*="_card_"]')
			.should('have.length', 3)
	})

	it('still renders after a related post is deleted (audit W-2)', () => {
		cy.login()
		deleteNode(`${blogFolder}/related-1`)
		publishAndWaitJobEnding(blogFolder, ['en'])
		cy.logout()

		cy.visit(mainPostUrl)
		cy.get('h1').should('contain.text', 'Main Post')
	})
})
