import React from 'react';
import PropTypes from 'prop-types';
import {
    useServerContext,
    getNodeProps,
    Render, AddContentButtons, getChildNodes
} from '@jahia/js-server-core';
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
        <Render node={content}/>
    </div>
);

Row.propTypes = {
    content: PropTypes.object.isRequired,
    arrangement: PropTypes.string.isRequired
};

export const SectionDefault = () => {
    const {currentNode} = useServerContext();
    const section = getNodeProps(currentNode, ['arrangement']);
    const sectionContents = getChildNodes(currentNode, 100);
    return (
        <section>
            <div className="container">
                {sectionContents.map(content => (
                    <Render key={content.getIdentifier()}
                            node={content}
                            parameters={{arrangement: getArrangement(section.arrangement)}}/>
                ))}
                <AddContentButtons/>
            </div>
        </section>
    );
};

SectionDefault.jahiaComponent = {
    nodeType: 'luxe:section',
    name: 'default',
    componentType: 'view'
};
