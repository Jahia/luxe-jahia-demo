import React from 'react';
import {useServerContext, jBuildNavMenu, jUrl} from '@jahia/js-server-engine';
import clsx from 'clsx';

const navMenu = {
    base: 'home',
    maxDepth: '1',
    startLevel: '0',
    menuItemView: 'menuElement'
};

export const NavMenuDefault = () => {
    const {currentNode, renderContext} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();

    const menu = jBuildNavMenu(
        navMenu.maxDepth,
        navMenu.base,
        navMenu.menuItemView,
        navMenu.startLevel
    );

    const logo = jUrl({value: `${modulePath}/assets/logo-luxe.svg`});
    const currentPath = currentNode.getPath();
    const home = renderContext.getSite().getHome();

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
                    <img src={logo} alt="" width="100px"/>
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
                                       active: currentPath.includes(node.getPath())
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
    id: 'luxeJahiaDemo_views_navMenu_NavMenuDefault',
    nodeType: 'luxe:navMenu',
    displayName: 'Nav Menu',
    componentType: 'view'
};
