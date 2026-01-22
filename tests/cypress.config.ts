import { defineConfig } from 'cypress'
import fs from 'fs'

export default defineConfig({
	chromeWebSecurity: false,
	defaultCommandTimeout: 10000,
	requestTimeout: 300000, // 5 minutes - needed for site provisioning
	responseTimeout: 300000, // 5 minutes - needed for site provisioning
	// videoUploadOnPasses: false,
	reporter: 'cypress-multi-reporters',
	reporterOptions: {
		configFile: 'reporter-config.json',
	},
	screenshotsFolder: './results/screenshots',
	videosFolder: './results/videos',
	viewportWidth: 1366,
	viewportHeight: 768,
	watchForFileChanges: false,
	experimentalModifyObstructiveThirdPartyCode: true, // Required for SSO/social authentication
	includeShadowDom: true, // Enable automatic shadow DOM traversal (including closed shadow roots)
	e2e: {
		specPattern: ['**/**.cy.ts'],
		// We've imported your old cypress plugins here.
		// You may want to clean this up later by importing these.
		setupNodeEvents(on, config) {
			on('task', {
				readFileMaybe(filename) {
					if (fs.existsSync(filename)) {
						return fs.readFileSync(filename, 'utf8')
					}

					return null
				},
			})

			// eslint-disable-next-line @typescript-eslint/no-require-imports
			return require('./cypress/plugins/index.js')(on, config)
		},
		excludeSpecPattern: ['**/*.ignore.ts'],
		baseUrl: 'http://localhost:8080',
	},
})
// export default defineConfig({
// 	chromeWebSecurity: false,
// 	failOnStatusCode: false,
// 	defaultCommandTimeout: 30000,
// 	videoUploadOnPasses: false,
// 	watchForFileChanges: false,
// 	reporter: 'cypress-multi-reporters',
// 	reporterOptions: {
// 		configFile: 'reporter-config.json',
// 	},
// 	env: {
// 		JAHIA_USERNAME: 'root',
// 		JAHIA_PASSWORD: 'root1234',
// 	},
// 	screenshotsFolder: './results/screenshots',
// 	videosFolder: './results/videos',
// 	viewportWidth: 1366,
// 	viewportHeight: 768,
// 	e2e: {
// 		// We've imported your old cypress plugins here.
// 		// You may want to clean this up later by importing these.
// 		setupNodeEvents(on, config) {
// 			// eslint-disable-next-line @typescript-eslint/no-require-imports
// 			return require('./cypress/plugins/index.js')(on, config)
// 		},
// 		excludeSpecPattern: 'fileInstallTest.spec.ts',
// 	},
// })
