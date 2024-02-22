import React from 'react';
import PropTypes from 'prop-types';
import {
    useServerContext,
    getNodeProps,
    JRender, JAddContentButtons, getChildNodes
} from '@jahia/js-server-engine';
import clsx from 'clsx';

const getArrangement = arrangement => {
    switch (arrangement) {
        case 'left': return 'align-items-start';
        case 'center': return 'align-items-center';
        case 'right': return 'align-items-end';
        default: return '';
    }
};

const Row = ({content, arrangement}) => (
    <div className={clsx('row', getArrangement(arrangement))}>
        <JRender node={content}/>
    </div>
);

Row.propTypes = {
    content: PropTypes.object.isRequired,
    arrangement: PropTypes.string.isRequired
};

export const SectionDefault = () => {
    const {currentNode} = useServerContext();
    const section = getNodeProps(currentNode, ['arrangement']);
    const sectionContents = getChildNodes(currentNode);
    return (
        <section>
            <div className="container">
                {sectionContents.map(content => (
                    <JRender key={content.getIdentifier()}
                             node={content}
                             parameters={{arrangement: getArrangement(section.arrangement)}}/>
                ))}
                <JAddContentButtons/>
            </div>
        </section>
    );
};

SectionDefault.jahiaComponent = {
    id: 'luxJahiaDemo_views_section_SectionDefault',
    nodeType: 'luxe:section',
    name: 'default',
    componentType: 'view'
};
