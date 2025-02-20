import React from 'react';
import {
    buildNavMenu,
    defineJahiaComponent,
    getNodeProps,
    server,
    useServerContext,
    useUrlBuilder
} from '@jahia/javascript-modules-library';
import {Section, TextIllustrated} from '../../components';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

const NavMenuItem = ({pageNode, arrangement}) => {
    const {t} = useTranslation();
    const {renderContext} = useServerContext();
    const {buildStaticUrl} = useUrlBuilder();
    const page = getNodeProps(pageNode, ['jcr:title', 'subtitle', 'image']);

    const image = {
        src: buildStaticUrl({assetPath: 'img/agency-placeholder.jpg'}),
        alt: 'Placeholder'
    };

    if (page.image) {
        image.src = page.image.getUrl();
        image.alt = t('alt.destination', {dest: page['jcr:title']});

        server.render.addCacheDependency({node: page.image}, renderContext);
    }

    return (
        <TextIllustrated {...{
            title: page['jcr:title'],
            text: page.subtitle,
            arrangement,
            image,
            link: {
                href: pageNode.getUrl(),
                label: t('link.labels.readMore')
            }
        }}/>
    );
};

NavMenuItem.propTypes = {
    pageNode: PropTypes.object.isRequired,
    arrangement: PropTypes.string.isRequired
};

const arrangement = ['right', 'left'];
export const JcrQueryIllustrated = () => {
    const {currentNode, currentResource, renderContext} = useServerContext();

    const nav = getNodeProps(currentNode, [
        'base',
        'maxDepth',
        'startLevel',
        'menuItemView'
    ]);

    // Remove content in the menu which is not a jnt:page and get jnt:page under jnt:navMenuText
    // Return an array of jnt:page node
    const flatMapMe = array =>
        array.flatMap(({node, children}) => {
            if (node.isNodeType('jnt:navMenuText')) {
                if (!children) {
                    return [];
                } // Depends of the maxDepth props

                return flatMapMe(children); // Recursively flat map the children
            }

            if (node.isNodeType('jnt:page')) {
                return [node]; // Return node in an array to match the expected structure
            }

            return []; // Return an empty array if none of the conditions match
        });

    const menu = flatMapMe(buildNavMenu(
        nav.maxDepth,
        nav.base,
        nav.menuItemView,
        nav.startLevel,
        renderContext,
        currentResource
    ));

    return (
        <>
            {menu.map((node, index) => (
                <Section key={node.getIdentifier()}>
                    <NavMenuItem pageNode={node} arrangement={arrangement[index % 2]}/>
                </Section>
            ))}
        </>

    );
};

JcrQueryIllustrated.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:navMenu',
    name: 'navIllustrated',
    displayName: 'Nav Illustrated',
    componentType: 'view',
    properties: {
        'cache.mainResource': 'true'
    }
});
