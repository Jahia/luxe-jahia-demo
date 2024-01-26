import React from 'react';
import PropTypes from 'prop-types';
import {JRender, JAddContentButtons, useServerContext, getNodeProps, getChildNodes} from '@jahia/js-server-engine';
import clsx from 'clsx';

const getAlign = align => {
    switch (align) {
        case 'left': return 'align-items-start';
        case 'center': return 'align-items-center';
        case 'right': return 'align-items-end';
        default: return '';
    }
};

export const Section = ({className, ...props}) => {
    const {currentNode} = useServerContext();
    const content = getNodeProps(currentNode, ['j:alignment']);
    const subContents = getChildNodes(currentNode);

    return (
        <section className={className}>
            <div className="container">
                {subContents.map(subContent => (
                    <div key={subContent.getIdentifier()} className={clsx('row', getAlign(content['j:alignment']))}>
                        <JRender node={subContent} {...props} view="default"/>
                    </div>
                    )
                )}
                <JAddContentButtons/>
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
