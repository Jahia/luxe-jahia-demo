import { publishAndWaitJobEnding } from '@jahia/cypress'
import { GENERIC_SITE_KEY } from '../../support/constants'
import { addSimplePage } from '../../support/test-helpers'
import { createContactForm } from '../../support/fixtures'

const sitePath = `/sites/${GENERIC_SITE_KEY}`
const demoPagePath = `${sitePath}/home/contact-demo-page`
const targetPagePath = `${sitePath}/home/contact-target-page`

// Fake endpoint, intercepted by the tests — never actually served by Jahia
const TARGET_ENDPOINT = '/e2e-contact-endpoint'

const fillForm = () => {
	cy.get('#inputContactFirstName').type('John')
	cy.get('#inputContactLastName').type('Doe')
	cy.get('#inputContactEmail').type('john.doe@example.com')
	cy.get('#inputContactMsg').type('Hello from Cypress')
}

const submitButton = () => cy.get('#contactForm button')

describe('Forms - 60 Contact form', () => {
	before('Create one page per form variant (the field ids are hardcoded)', () => {
		cy.login()

		addSimplePage(`${sitePath}/home`, 'contact-demo-page', 'Contact Demo', 'en', 'centered', [
			{ name: 'main', primaryNodeType: 'jnt:contentList' },
		]).then(() => {
			createContactForm(`${demoPagePath}/main`, { name: 'contact-demo' })
		})

		addSimplePage(`${sitePath}/home`, 'contact-target-page', 'Contact Target', 'en', 'centered', [
			{ name: 'main', primaryNodeType: 'jnt:contentList' },
		]).then(() => {
			createContactForm(`${targetPagePath}/main`, {
				name: 'contact-target',
				target: TARGET_ENDPOINT,
			})
		})

		publishAndWaitJobEnding(sitePath, ['en'])
		cy.logout()
	})

	it('keeps the submit button disabled until every field is filled', () => {
		cy.visit(`${demoPagePath}.html`)

		submitButton().should('be.disabled')

		cy.get('#inputContactFirstName').type('John')
		submitButton().should('be.disabled')

		cy.get('#inputContactLastName').type('Doe')
		cy.get('#inputContactEmail').type('john.doe@example.com')
		submitButton().should('be.disabled')

		cy.get('#inputContactMsg').type('Hello from Cypress')
		submitButton().should('be.enabled')
	})

	it('shows the personalized demo feedback in a polite live region, with no console errors', () => {
		cy.visitAndCaptureConsole(`${demoPagePath}.html`)

		fillForm()
		submitButton().click()

		// The demo feedback replaces the $name placeholder and must be announced
		// to screen readers (role="status", audit S-2)
		cy.get('[role="status"]').should('be.visible').and('contain.text', 'Dear John Doe, your message was received.')
		cy.get('#contactForm').should('not.exist')

		cy.assertNoConsoleErrors()
	})

	it('posts the payload to the configured target and shows the feedback', () => {
		cy.intercept('POST', TARGET_ENDPOINT, { statusCode: 200, body: {} }).as('contactPost')
		cy.visitAndCaptureConsole(`${targetPagePath}.html`)

		fillForm()
		submitButton().click()

		cy.wait('@contactPost').then(({ request }) => {
			expect(request.body).to.deep.equal({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com',
				message: 'Hello from Cypress',
			})
			expect(request.headers['content-type']).to.equal('application/json')
		})

		cy.get('[role="status"]').should('be.visible').and('contain.text', 'Dear John Doe, your message was received.')

		cy.assertNoConsoleErrors()
	})

	it('shows the error alert when the target replies with an error status', () => {
		cy.intercept('POST', TARGET_ENDPOINT, { statusCode: 500, body: {} }).as('contactPost')
		cy.visit(`${targetPagePath}.html`)

		fillForm()
		submitButton().click()

		cy.wait('@contactPost')
		cy.get('[role="alert"]').should('be.visible').and('contain.text', 'an error occurred')
	})
})
