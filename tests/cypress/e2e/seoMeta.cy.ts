import { deleteSite, publishAndWaitJobEnding, uploadFile } from '@jahia/cypress'

import { GENERIC_SITE_KEY } from '../support/constants'

describe('SEO meta test', () => {
	const homePath = `/sites/${GENERIC_SITE_KEY}/home`

	before('Create site and add SEO meta props to home', () => {
		cy.login()

		uploadFile('data/seoMeta/image.jpg', `/sites/${GENERIC_SITE_KEY}/files`, 'metaImage.jpg', 'image/jpeg').then(
			(node) => {
				const imageUuid = node?.data?.jcr.addNode.uuid
				cy.apollo({
					mutationFile: 'graphql/mutation/addMetaProps.graphql',
					variables: { pathOrId: homePath, imageUuid },
				})
				publishAndWaitJobEnding(homePath, ['en', 'fr'])
			},
		)

		cy.logout()
	})

	after('Delete site', () => {
		deleteSite(GENERIC_SITE_KEY)
		cy.logout()
	})

	beforeEach('Login', () => {
		cy.login()
	})

	const testMetaTags = (propName: string, expectedValue: string) => {
		cy.get(`head meta[name="${propName}"]`).should('have.attr', 'content', expectedValue)
	}

	const testOgMetaTags = (propName: string, expectedValue: string) => {
		cy.get(`head meta[property="og:${propName}"]`).should('have.attr', 'content').and('contain', expectedValue)
	}

	it('should contain meta tags in the home page', () => {
		cy.visit(`/sites/${GENERIC_SITE_KEY}/home.html`)

		testMetaTags('description', 'description en')
		testMetaTags('keywords', 'en1,en2')

		testOgMetaTags('title', 'Home')
		testOgMetaTags('description', 'description en')
		testOgMetaTags('image', `/files/live/sites/${GENERIC_SITE_KEY}/files/metaImage.jpg`)
		testOgMetaTags('url', `/sites/${GENERIC_SITE_KEY}/home.html`)

		cy.logout()
	})

	it('should contain meta tags with i18n fr values', () => {
		cy.visit(`fr/sites/${GENERIC_SITE_KEY}/home.html`)

		testMetaTags('description', 'description fr')
		testMetaTags('keywords', 'fr1,fr2')

		testOgMetaTags('title', 'Accueil')
		testOgMetaTags('description', 'description fr')
		testOgMetaTags('image', `/files/live/sites/${GENERIC_SITE_KEY}/files/metaImage.jpg`)
		testOgMetaTags('url', `/fr/sites/${GENERIC_SITE_KEY}/home.html`)

		cy.logout()
	})

	it('should not contain meta tags for non-existing meta values', () => {
		cy.visit(`/sites/${GENERIC_SITE_KEY}/home/nonMetaPage.html`)

		testOgMetaTags('title', 'Page test 1')
		testOgMetaTags('url', `sites/${GENERIC_SITE_KEY}/home/nonMetaPage.html`)

		const notExist = (propName) => cy.get('meta').find(`[name="${propName}"]`).should('not.exist')
		const ogNotExist = (propName) => cy.get('meta').find(`[property="og:${propName}"]`).should('not.exist')

		notExist('keywords')
		notExist('description')
		ogNotExist('description')
		ogNotExist('image')

		cy.logout()
	})
})
