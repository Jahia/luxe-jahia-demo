import React from 'react';
import {buildUrl, useServerContext} from '@jahia/javascript-modules-library';
import clsx from 'clsx';

const getSiteLanguageAsLocales = renderContext => {
    const site = renderContext.getSite();

    if (renderContext.isLiveMode()) {
        return site.getActiveLiveLanguagesAsLocales().toArray();
    }

    return site.getLanguagesAsLocales().toArray();
};

export const LanguageSwitcher = () => {
    const {renderContext, currentResource} = useServerContext();
    const currentLocale = currentResource.getLocale();
    const currentLocaleCode = currentLocale.getLanguage();
    const currentLocaleName = currentLocale.getDisplayLanguage(currentLocale);
    const siteLocales = getSiteLanguageAsLocales(renderContext);

    const mainResourceNodePath = renderContext.getMainResource().getNode().getPath();

    return (
        <div className="dropdown">
            <button
                className="btn dropdown-toggle lux-capitalize"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {currentLocaleName}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                {siteLocales?.map(locale => {
                    const localeCode = locale.getLanguage();
                    const localeName = locale.getDisplayLanguage(locale);
                    const isCurrent = currentLocaleCode === localeCode;
                    const url = buildUrl({path: mainResourceNodePath, language: localeCode}, renderContext, currentResource);
                    return (
                        <li key={locale}>
                            <a
                                href={url}
                                className={clsx('dropdown-item', 'lux-capitalize', {active: isCurrent})}
                                aria-current={isCurrent}
                            >
                                {localeName}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
