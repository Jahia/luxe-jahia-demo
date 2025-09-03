import {
	buildNodeUrl,
	getSiteLocales,
	Island,
	useServerContext,
} from "@jahia/javascript-modules-library";
import LanguageSwitcherClient from "./LanguageSwitcher.client";

export const LanguageSwitcher = () => {
	const { renderContext, currentResource } = useServerContext();
	const currentLocale = currentResource.getLocale();
	const currentLocaleCode = currentLocale.toString();
	const currentLocaleName = currentLocale.getDisplayLanguage(currentLocale);
	const mode = renderContext.getMode();

	const localesAndUrls = Object.entries(getSiteLocales()).map(([language, locale]) => {
		return {
			localeName: locale.getDisplayLanguage(locale),
			isCurrent: language === currentLocaleCode,
			url: buildNodeUrl(renderContext.getMainResource().getNode(), { language }),
		};
	});

	return (
		<Island
			component={LanguageSwitcherClient}
			props={{ currentLocaleName, localesAndUrls, mode }}
		/>
	);
};
