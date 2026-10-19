import { LUXE_SITE_KEY } from '../../../support/constants'
import { LanguageSwitcher, SearchEstatePage } from '../../../page-object'

const homeUrl = `/sites/${LUXE_SITE_KEY}/home.html`

/**
 * The prepackaged `luxe` site ships two published locales (en + fr): the
 * switcher must list both, mark the rendered one with `aria-current="page"`,
 * and keep the visitor on the same page — including mainResource detail
 * pages — when switching.
 */
describe('i18n - 70 Language switcher', () => {
	it('lists both site locales with aria-current on the active one', () => {
		cy.visit(homeUrl)

		LanguageSwitcher.get().getLocaleLinks().should('have.length', 2)
		LanguageSwitcher.get().getToggle().should('contain.text', 'English')
		LanguageSwitcher.get().getActiveLocale().should('contain.text', 'English')
		// An inactive locale carries no aria-current at all: `aria-current="false"` is what the
		// hand-written switcher used to emit, and the platform link API emits the attribute only
		// on the page being rendered
		LanguageSwitcher.get()
			.getLocaleLink('français')
			.should('not.have.attr', 'aria-current')
			.and('have.attr', 'href')
			.and('include', `/fr/sites/${LUXE_SITE_KEY}/home.html`)
	})

	it('switches home EN→FR: URL gains /fr/ and UI labels are translated', () => {
		cy.visit(homeUrl)

		// Server-rendered UI label in the default locale (skip link is the first anchor)
		cy.get('body a').first().should('have.text', 'Skip to content')

		LanguageSwitcher.get().switchTo('français')

		cy.url().should('include', `/fr/sites/${LUXE_SITE_KEY}/home.html`)
		cy.get('body a').first().should('have.text', 'Aller au contenu')
		LanguageSwitcher.get().getActiveLocale().should('contain.text', 'français')
		LanguageSwitcher.get().getToggle().should('contain.text', 'français')
	})

	it('keeps the current main resource when switching on a detail page, both ways', () => {
		// Reach a detail page the way a visitor does: through the buy page cards
		SearchEstatePage.visit()
		SearchEstatePage.getCards().first().click()

		cy.location('pathname').then((estatePathname) => {
			expect(estatePathname, 'estate detail pathname').to.not.include('/fr/')

			LanguageSwitcher.get().switchTo('français')

			// Same node, French URL: the /fr/ segment is the only difference
			cy.location('pathname').should('eq', `/fr${estatePathname}`)
			LanguageSwitcher.get().getActiveLocale().should('contain.text', 'français')

			// And back: the English URL is restored exactly
			LanguageSwitcher.get().switchTo('English')
			cy.location('pathname').should('eq', estatePathname)
			LanguageSwitcher.get().getActiveLocale().should('contain.text', 'English')
		})
	})
})
