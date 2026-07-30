import { BaseComponent } from '@jahia/cypress'

/**
 * Page object for the LanguageSwitcher island rendered inside the nav.
 *
 * Selector notes:
 * - the locale anchors are the only elements carrying `aria-current` in the
 *   whole layout (menu entries use an `active` class instead);
 * - the dropdown toggle is the only `aria-expanded` button WITHOUT
 *   `aria-controls` (the mobile nav toggler has one);
 * - the dropdown menu is `display: none` until the island toggles the `show`
 *   class, so opening it must go through `clickUntilVisible` (hydration race).
 */
export class LanguageSwitcher extends BaseComponent {
	static defaultSelector = 'body nav'

	// No `body` prefix: clickUntilVisible resolves the expect selector with
	// `$body.find(...)`, where a body-prefixed selector can never match.
	static readonly toggleSelector = 'nav button[aria-expanded]:not([aria-controls])'
	static readonly localeLinkSelector = 'nav a[aria-current]'

	static get(): LanguageSwitcher {
		return new LanguageSwitcher(cy.get(LanguageSwitcher.defaultSelector))
	}

	/** The dropdown toggle showing the current locale name. */
	getToggle(): Cypress.Chainable<JQuery> {
		return this.get().find('button[aria-expanded]:not([aria-controls])')
	}

	/** All locale anchors (rendered server-side, hidden until the dropdown opens). */
	getLocaleLinks(): Cypress.Chainable<JQuery> {
		return this.get().find('a[aria-current]')
	}

	/** The anchor of the locale currently rendered (`aria-current="true"`). */
	getActiveLocale(): Cypress.Chainable<JQuery> {
		return this.get().find('a[aria-current="true"]')
	}

	/** The anchor for a locale by its display name (e.g. `français`). */
	getLocaleLink(localeName: string): Cypress.Chainable<JQuery> {
		return this.getLocaleLinks().contains(localeName)
	}

	/** Open the dropdown (post-hydration) and follow the locale link. */
	switchTo(localeName: string): void {
		cy.clickUntilVisible(LanguageSwitcher.toggleSelector, LanguageSwitcher.localeLinkSelector)
		this.getLocaleLink(localeName).click()
	}
}
