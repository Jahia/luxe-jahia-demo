import { buildUrl, HydrateInBrowser, useServerContext } from "@jahia/javascript-modules-library";
import type { RenderContext } from "org.jahia.services.render";
import LanguageSwitcherClient from "./LanguageSwitcher.client";

const getSiteLanguageAsLocales = (renderContext: RenderContext) => {
  const site = renderContext.getSite();

  if (renderContext.isLiveMode()) {
    return site.getActiveLiveLanguagesAsLocales();
  }

  return site.getLanguagesAsLocales();
};

export const LanguageSwitcher = () => {
  const { renderContext, currentResource } = useServerContext();
  const currentLocale = currentResource.getLocale();
  const currentLocaleCode = currentLocale.getLanguage();
  const currentLocaleName = currentLocale.getDisplayLanguage(currentLocale);
  const siteLocales = getSiteLanguageAsLocales(renderContext);

  const mainResourceNodePath = renderContext.getMainResource().getNode().getPath();

  const localesAndUrls = siteLocales?.map((locale) => {
    const localeCode = locale.getLanguage();
    return {
      localeName: locale.getDisplayLanguage(locale),
      isCurrent: currentLocaleCode === localeCode,
      url: buildUrl(
        { path: mainResourceNodePath, language: localeCode },
        renderContext,
        currentResource,
      ),
    };
  });

  return (
    <HydrateInBrowser
      child={LanguageSwitcherClient}
      props={{
        currentLocaleName,
        localesAndUrls,
      }}
    />
  );
};
