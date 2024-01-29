import React from 'react';
import PropTypes from 'prop-types';
import {
    useServerContext,
    getNodeProps,
    JArea
} from '@jahia/js-server-engine';
import clsx from 'clsx';

export const RowCols = ({alignment}) => {
    const {currentNode} = useServerContext();
    const content = getNodeProps(currentNode, ['j:colsNumber']);
    const limit = isNaN(parseInt(content['j:colsNumber'], 10)) ? 1 : parseInt(content['j:colsNumber'], 10);
    const cols = Array.from(Array(limit).keys());
    return (
        <div className={clsx('row', alignment)}>
            {cols.map(col => (
                <div key={col} className={clsx('col')}>
                    <JArea name={`col-${col}`}/>
                </div>
            )
            )}
        </div>
    );
};

RowCols.propTypes = {
    alignment: PropTypes.string
};

RowCols.jahiaComponent = {
    id: 'rowColsCmp',
    nodeType: 'jnt:rowCols',
    displayName: 'Default',
    componentType: 'view'
};
