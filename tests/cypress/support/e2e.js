// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

import './commands'
import 'cypress-wait-until'
import addContext from 'mochawesome/addContext'
import { deleteSite } from '@jahia/cypress'
import { createLuxeSite, createTestSite } from './test-helpers'
import { GENERIC_SITE_KEY, LUXE_PATH_KEY, LUXE_PREPACKAGED_SITE, LUXE_SITE_KEY } from './constants'

// Ensure fetch is always bound to window
if (typeof window !== 'undefined' && window.fetch) {
	// eslint-disable-next-line no-undef
	globalThis.fetch = window.fetch.bind(window)
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('cypress-terminal-report/src/installLogsCollector')()
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@jahia/cypress/dist/support/registerSupport').registerSupport()

Cypress.on('uncaught:exception', () => {
	// Returning false here prevents Cypress from
	// failing the test
	return false
})
if (Cypress.browser.family === 'chromium') {
	Cypress.automation('remote:debugger:protocol', {
		command: 'Network.enable',
		params: {},
	})
	Cypress.automation('remote:debugger:protocol', {
		command: 'Network.setCacheDisabled',
		params: { cacheDisabled: true },
	})
}

Cypress.on('test:after:run', (test, runnable) => {
	let videoName = Cypress.spec.relative
	videoName = videoName.replace('/.cy.*', '').replace('cypress/e2e/', '')
	const videoUrl = 'videos/' + videoName + '.mp4'
	addContext({ test }, videoUrl)
	if (test.state === 'failed') {
		const screenshot = `screenshots/${Cypress.spec.relative.replace('cypress/e2e/', '')}/${runnable.parent.title} -- ${test.title} (failed).png`
		addContext({ test }, screenshot)
	}
})

before('Create test site', () => {
	// use separate hooks for Luxe and generic sites to avoid creating unnecessary data
	if (Cypress.spec.relative.includes(LUXE_PATH_KEY)) {
		// deleteSite(LUXE_SITE_KEY)
		// createLuxeSite(LUXE_SITE_KEY, LUXE_PREPACKAGED_SITE)
	} else {
		deleteSite(GENERIC_SITE_KEY)
		createTestSite(GENERIC_SITE_KEY)
	}
})
