import React from 'react';
import {useServerContext, getNodeProps, jBuildNavMenu, jUrl} from '@jahia/js-server-engine';
import clsx from 'clsx';

export const NavMenuDefault = () => {
    // Const {currentResource} = useServerContext();
    const {currentNode, renderContext} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();

    // Const nav = getNodeProps(currentResource.getNode(), [
    const nav = getNodeProps(currentNode, [
        'base',
        'maxDepth',
        'startLevel',
        'menuItemView'
        // 'brandText',
        // 'brandImage'
    ]);

    const menu = jBuildNavMenu(nav.maxDepth, nav.base, nav.menuItemView, nav.startLevel);
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
                <a href="/" className="navbar-brand">
                    {/* <img src={nav.brandImage?.getUrl()} alt="" width="100px"/> */}
                    <img src={jUrl({value: `${modulePath}/images/logo-luxe.svg`})} alt="" width="100px"/>
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
                        {menu.map(page => (
                            <li key={page.node.getIdentifier()} className="nav-item">
                                {/* <Link */}
                                {/*    to={key === activePage ? '' : `/${key}`} */}
                                {/*    // Aria-current={ */}
                                {/*    //     key === activePage ? 'page' : null */}
                                {/*    // } */}
                                {/*    className={clsx('nav-link', { */}
                                {/*        active: key === activePage */}
                                {/*    })} */}
                                {/* > */}
                                {/*    {pages[key]} */}
                                {/* </Link> */}
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
