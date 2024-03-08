import React from 'react';
import {useServerContext, getNodeProps, jBuildNavMenu, jUrl, jAddCacheDependency} from '@jahia/js-server-engine';
import clsx from 'clsx';

export const NavMenuDefault = () => {
    const {currentNode, renderContext} = useServerContext();

    const nav = getNodeProps(currentNode, [
        'base',
        'maxDepth',
        'startLevel',
        'menuItemView',
        'brandText',
        'brandImage'
    ]);

    const menu = jBuildNavMenu(
        nav.maxDepth,
        nav.base,
        nav.menuItemView,
        nav.startLevel
    );

    const mainPath = renderContext.getMainResource().getPath();
    const siteName = renderContext.getSite().getName();
    const home = renderContext.getSite().getHome();

    if (nav.brandImage) {
        jAddCacheDependency({node: nav.brandImage});
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
                <a href={jUrl({path: home.getPath()})} className="navbar-brand">
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
                        {menu.map(({node}) => (
                            <li key={node.getIdentifier()} className="nav-item">
                                <a href={jUrl({path: node.getPath()})}
                                   className={clsx('nav-link', {
                                       active: mainPath.includes(node.getPath())
                                   })}
                                >
                                    {node.getDisplayableName()}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="dropdown">
                    <button
                        className="btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Français
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <a
                                href="#"
                                className="dropdown-item active"
                                aria-current="true"
                            >
                                Français
                            </a>
                        </li>
                        <li>
                            <a href="#" className="dropdown-item">
                                English
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

NavMenuDefault.jahiaComponent = {
    nodeType: 'luxe:navMenu',
    displayName: 'Nav Menu',
    componentType: 'view'
};
