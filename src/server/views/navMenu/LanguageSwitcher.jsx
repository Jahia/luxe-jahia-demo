import React from 'react';
import {buildUrl, useServerContext} from '@jahia/js-server-core';
import clsx from 'clsx';

const getSiteLanguageAsLocales = renderContext => {
    const site = renderContext.getSite();
    switch (true) {
        case renderContext.isLiveMode():
            return site.getActiveLiveLanguagesAsLocales().toArray();

        default:
            return site.getLanguagesAsLocales().toArray();
    }
};

export const LanguageSwitcher = () => {
    const {renderContext, currentResource} = useServerContext();
    const currentLocaleCode = currentResource.getLocale().getLanguage();
    const currentLocaleName = currentResource.getLocale().getDisplayLanguage();
    const siteLocales = getSiteLanguageAsLocales(renderContext);

    const mainResourceNodePath = renderContext.getMainResource().getNode().getPath();

    return (
        <div className="dropdown">
            <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {currentLocaleName}
            </button>
            <ul className="dropdown-menu">
                {siteLocales?.map(locale => {
                    const localeCode = locale.getLanguage();
                    const localeName = locale.getDisplayLanguage(locale);
                    const isCurrent = currentLocaleCode === localeCode;
                    const url = buildUrl({path: mainResourceNodePath, language: localeCode}, renderContext, currentResource);
                    return (
                        <li key={locale}>
                            <a
                                href={url}
                                className={clsx('dropdown-item', {active: isCurrent})}
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
