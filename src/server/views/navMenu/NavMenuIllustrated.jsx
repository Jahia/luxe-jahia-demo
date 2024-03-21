import React from 'react';
import {useServerContext, getNodeProps, jBuildNavMenu, jAddCacheDependency, jUrl} from '@jahia/js-server-engine';
import {Section, TextIllustrated} from '../../components';
import PropTypes from 'prop-types';
import todoI18n from '../../temp/locales/fr';

const NavMenuItem = ({pageNode, arrangement}) => {
    const {renderContext} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const page = getNodeProps(pageNode, ['jcr:title', 'subtitle', 'image']);
    if (page.image) {
        jAddCacheDependency({node: page.image});
    }

    return (
        <TextIllustrated {...{
            title: page['jcr:title'],
            text: page.subtitle,
            arrangement,
            image: {
                src: page.image?.getUrl() || `${modulePath}/assets/img/img-placeholder.jpg`,
                alt: page.image?.getDisplayableName() || 'placeholder'
            },
            link: {
                href: jUrl({path: pageNode.getPath()}),
                label: todoI18n.link.labels.knowMore
            }
        }}/>
    );
};

NavMenuItem.propTypes = {
    pageNode: PropTypes.object.isRequired,
    arrangement: PropTypes.string.isRequired
};

const arrangement = ['left', 'right'];
export const NavMenuIllustrated = () => {
    const {currentNode} = useServerContext();

    const nav = getNodeProps(currentNode, [
        'base',
        'maxDepth',
        'startLevel',
        'menuItemView'
    ]);

    const menu = jBuildNavMenu(
        nav.maxDepth,
        nav.base,
        nav.menuItemView,
        nav.startLevel
    );
    // Todo filter to flatten and remove jnt:navMenuText
    // menu.filter(({node, children}) => {
    //     if (node.isNodeType('jnt:navMenuText')) {
    //         return flatten(children);
    //     }
    //
    //     return node;
    // });
    return (
        <>
            {menu.map(({node}, index) => (
                <Section key={node.getIdentifier()}>
                    <NavMenuItem pageNode={node} arrangement={arrangement[index % 2]}/>
                </Section>
            ))}
        </>

    );
};

NavMenuIllustrated.jahiaComponent = {
    nodeType: 'luxe:navMenu',
    name: 'navIllustrated',
    displayName: 'Nav Illustrated',
    componentType: 'view'
};
