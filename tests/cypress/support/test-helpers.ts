import { createSite, deleteSite, addPage, getNodeByPath, publishAndWaitJobEnding } from '@jahia/cypress'

export const addSimplePage = (
	parentPathOrId: string,
	pageName: string,
	pageTitle: string,
	language: string,
	template = 'home',
	children = [],
	mixins = [],
	properties = [],
): Cypress.Chainable =>
	addPage({
		parentPathOrId: parentPathOrId,
		name: pageName,
		title: pageTitle,
		language: language,
		template: template,
		mixins: mixins,
		properties: properties,
		children: children,
	})

export const createLuxeSite = (siteKey: string, prepackagedSiteURL: string) => {
	cy.log('Creating sample site ' + siteKey + '...')
	cy.log('Cypress prepackaged site URL', prepackagedSiteURL)

	if (prepackagedSiteURL && prepackagedSiteURL.startsWith('jar:mvn:')) {
		// The prepackaged site should be fetched from a Maven URL
		cy.runProvisioningScript({
			script: {
				fileContent: `- importSite: "${prepackagedSiteURL}"`,
				type: 'application/yaml',
			},
		}).then(() => publishAndWaitJobEnding(`/sites/${siteKey}`, ['en', 'fr']))
	} else {
		// Otherwise, assume it's a glob filename related to the ./artifacts/ folder
		cy.log(`Unzipping ${prepackagedSiteURL}...`)
		const prepackagedArchivePath = 'META-INF/prepackagedSites/luxe-prepackaged.zip'
		cy.task('unzipArtifact', {
			artifactFilename: prepackagedSiteURL,
			filteredPath: prepackagedArchivePath,
		})
			.then(() => {
				cy.log(`Extracting site.zip from ${prepackagedArchivePath}...`)
				return cy.task('unzipArtifact', {
					artifactFilename: prepackagedArchivePath,
					filteredPath: 'site.zip',
				})
			})
			.then(() => {
				cy.log('Importing site.zip...')
				const siteArchivePath = '../artifacts/site.zip'
				return cy.runProvisioningScript({
					script: {
						fileContent: `- importSite: "${siteArchivePath}"`,
						type: 'application/yaml',
					},
					files: [{ fileName: siteArchivePath }],
				})
			})
			.then(() => {
				cy.log(`Publishing site '${siteKey}'...`)
				publishAndWaitJobEnding(`/sites/${siteKey}`, ['en'])
			})
	}
}

/**
 * Import the prepackaged luxe site only when it is not already on the
 * instance. The import takes 2-3 minutes, so it must NOT run per spec file:
 * every spec under `luxe-prepackaged-website/` treats the site as a read-only
 * fixture and reuses it. Delete `/sites/luxe` manually (or via jContent) to
 * force a fresh import.
 */
export const ensureLuxeSite = (siteKey: string, prepackagedSiteURL: string) => {
	getNodeByPath(`/sites/${siteKey}`).then((response) => {
		if (response?.data?.jcr?.nodeByPath?.uuid) {
			cy.log(`Site ${siteKey} already present, reusing it`)
			return
		}

		createLuxeSite(siteKey, prepackagedSiteURL)
	})
}

export const createTestSite = (siteKey: string) => {
	cy.step('Cleanup previous state: delete site', () => {
		deleteSite(siteKey)
	})

	cy.step(`Create test site: ${siteKey}`, () => {
		createSite(siteKey, {
			templateSet: 'luxe-jahia-demo',
			locale: 'en',
			languages: 'en,fr',
			serverName: 'localhost',
		})

		addSimplePage(`/sites/${siteKey}/home`, 'testPage', 'testPage', 'en', 'simple', [
			{
				name: 'pagecontent',
				primaryNodeType: 'jnt:contentList',
			},
		]).then(() => {
			// AddNode({
			// 	parentPathOrId: `/sites/${siteKey}/home/testPage/pagecontent`,
			// 	name: 'test',
			// 	primaryNodeType: 'javascriptExample:test',
			// 	properties: [
			// 		{ name: 'jcr:title', value: 'test component' },
			// 		{ name: 'prop1', value: 'prop1 value' },
			// 		{ name: 'propMultiple', values: ['value 1', 'value 2', 'value 3'] },
			// 		{
			// 			name: 'propRichText',
			// 			value: '<p data-testid="propRichTextValue">Hello this is a sample rich text</p>',
			// 		},
			// 	],
			// })
		})
	})
}
