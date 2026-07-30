import { BaseComponent } from '@jahia/cypress'

/**
 * Page object for the `luxe:navigationMenu` component rendered by the Layout.
 * The menu entries are hydrated client-side by the NavigationToggler island.
 */
export class NavMenu extends BaseComponent {
	static defaultSelector = 'body nav'

	static get(): NavMenu {
		return new NavMenu(cy.get(NavMenu.defaultSelector))
	}

	/** Brand link (logo/text), always points to the site home. */
	getBrandLink(): Cypress.Chainable<JQuery> {
		return this.get().find('a').first()
	}

	/** All top-level menu entries (one per page under `home`). */
	getEntries(): Cypress.Chainable<JQuery> {
		return this.get().find('#navbarSupportedContent ul li a')
	}

	/** The entry marked active for the current main resource. */
	getActiveEntry(): Cypress.Chainable<JQuery> {
		return this.get().find('#navbarSupportedContent ul li a.active')
	}

	/** The language switcher dropdown root. */
	getLanguageSwitcher(): Cypress.Chainable<JQuery> {
		return this.get().find('[aria-expanded]').last()
	}
}
