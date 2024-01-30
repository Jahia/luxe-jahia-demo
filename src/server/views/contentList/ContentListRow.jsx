import React from 'react';
import PropTypes from 'prop-types';
import {
    useServerContext,
    JRender, JAddContentButtons, getChildNodes
} from '@jahia/js-server-engine';
import clsx from 'clsx';

export const ContentListRow = ({alignment}) => {
    const {currentNode} = useServerContext();
    const listContent = getChildNodes(currentNode);

    return (
        <>
            <div className={clsx('row', alignment)}>
                {listContent.map(content => (<JRender key={content.getIdentifier()} node={content}/>))}
            </div>
            <JAddContentButtons/>
        </>

    );
};

ContentListRow.propTypes = {
    alignment: PropTypes.string
};

ContentListRow.jahiaComponent = {
    id: 'contentListRowCmp',
    nodeType: 'jnt:contentList',
    name: '[Luxe] ContentList Row',
    componentType: 'view'
};
