import { BaseComponent } from '@jahia/cypress'

/** Page object for the Layout footer (resources links, login form, copyright island). */
export class Footer extends BaseComponent {
	static defaultSelector = 'body footer'

	static get(): Footer {
		return new Footer(cy.get(Footer.defaultSelector))
	}

	/** External resource links (Academy, tutorial, source code). */
	getResourceLinks(): Cypress.Chainable<JQuery> {
		return this.get().find('ul li a[target="_blank"]')
	}

	/** Copyright line rendered client-side by the CopyrightYear island. */
	getCopyright(): Cypress.Chainable<JQuery> {
		return this.get().contains('copyrights')
	}
}
