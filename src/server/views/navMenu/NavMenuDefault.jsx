import React from 'react';
import {useServerContext, getNodeProps, buildNavMenu, buildUrl, server} from '@jahia/js-server-core';
import clsx from 'clsx';
import {LanguageSwitcher} from './LanguageSwitcher';

export const NavMenuDefault = () => {
    const {currentNode, renderContext, currentResource} = useServerContext();

    const nav = getNodeProps(currentNode, [
        'base',
        'maxDepth',
        'startLevel',
        'menuItemView',
        'brandText',
        'brandImage'
    ]);

    const menu = buildNavMenu(
        nav.maxDepth,
        nav.base,
        nav.menuItemView,
        nav.startLevel,
        renderContext,
        currentResource
    );

    const mainPath = renderContext.getMainResource().getPath();
    const siteName = renderContext.getSite().getName();
    const home = renderContext.getSite().getHome();

    if (nav.brandImage) {
        server.render.addCacheDependency({node: nav.brandImage}, renderContext);
    }

    return (
        <nav
            className={clsx(
                'navbar',
                'navbar-expand-lg',
                'bg-body',
                'px-5',
                'py-4'
            )}
        >
            <div className="container-fluid gap-5">
                <a href={buildUrl({path: home.getPath()}, renderContext, currentResource)} className="navbar-brand">
                    {nav.brandImage &&
                        <img src={nav.brandImage?.getUrl()}
                             alt={`Logo-${siteName}`}
                             width="100px"/>}
                    {nav.brandText}
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>
                <div
                    id="navbarSupportedContent"
                    className="collapse navbar-collapse"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-4">
                        {menu.map(({node, selected}) => (
                            <li key={node.getIdentifier()} className="nav-item">
                                <a href={buildUrl({path: node.getPath()}, renderContext, currentResource)}
                                   className={clsx('nav-link', {
                                       active: selected || mainPath.includes(node.getPath())
                                   })}
                                >
                                    {node.getDisplayableName()}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <LanguageSwitcher/>
            </div>
        </nav>
    );
};

NavMenuDefault.jahiaComponent = {
    nodeType: 'luxe:navMenu',
    displayName: 'Navbar Nav Menu',
    componentType: 'view'
};
