import React from 'react';
import PropTypes from 'prop-types';
import {
    useServerContext,
    getNodeProps,
    JArea
} from '@jahia/js-server-engine';

const getAlign = align => {
    switch (align) {
        case 'left': return 'align-items-start';
        case 'center': return 'align-items-center';
        case 'right': return 'align-items-end';
        default: return '';
    }
};

export const Section = ({className}) => {
    const {currentNode} = useServerContext();
    const content = getNodeProps(currentNode, ['j:alignment']);
    return (
        <section className={className}>
            <div className="container">
                <JArea name="section" alignment={getAlign(content['j:alignment'])}/>
            </div>
        </section>
    );
};

Section.propTypes = {
    className: PropTypes.string
};

Section.jahiaComponent = {
    id: 'sectionCmp',
    nodeType: 'jnt:section',
    displayName: 'Default',
    componentType: 'view'
};
