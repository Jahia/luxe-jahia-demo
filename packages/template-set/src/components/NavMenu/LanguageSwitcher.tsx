import {
	getLinkProps,
	getSiteLocales,
	Island,
	useServerContext,
} from "@jahia/javascript-modules-library";
import LanguageSwitcherClient from "./LanguageSwitcher.client";

export const LanguageSwitcher = () => {
	const context = useServerContext();
	const { renderContext, currentResource } = context;
	const currentLocale = currentResource.getLocale();
	const currentLocaleCode = currentLocale.toString();
	const currentLocaleName = currentLocale.getDisplayLanguage(currentLocale);
	const mode = renderContext.getMode();
	const mainNode = renderContext.getMainResource().getNode();

	const localesAndUrls = Object.entries(getSiteLocales()).map(([language, locale]) => {
		const { anchor } = getLinkProps(
			mainNode,
			{
				language,
				// Every entry points at the page being rendered, so node identity would mark all of
				// them current: the switcher is what knows which one the visitor is reading
				isCurrent: language === currentLocaleCode,
				// A locale the page has no translation in is still offered — Jahia serves the page
				// in its fallback language, which is what a language switcher is for
				requireTranslation: false,
				// The nav is keyed on the main resource already, and every entry here is that node
				cacheDependency: false,
			},
			context,
		);

		return {
			language,
			localeName: locale.getDisplayLanguage(locale),
			isCurrent: language === currentLocaleCode,
			anchor,
		};
	});

	return (
		<Island
			component={LanguageSwitcherClient}
			props={{ currentLocaleName, localesAndUrls, mode }}
		/>
	);
};
