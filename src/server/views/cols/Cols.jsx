import React from 'react';
import {
    useServerContext,
    getNodeProps,
    JArea
} from '@jahia/js-server-engine';
import clsx from 'clsx';

export const Cols = () => {
    const {currentNode, currentResource} = useServerContext();
    const content = getNodeProps(currentNode, ['colsNumber']);
    const limit = isNaN(parseInt(content.colsNumber, 10)) ? 1 : parseInt(content.colsNumber, 10);
    const cols = Array.from(Array(limit).keys());

    const arrangement = currentResource.getModuleParams().get('arrangement');
    return (
        <div className={clsx('row', arrangement)}>
            {cols.map(col => (
                <div key={col} className={clsx('col')}>
                    <JArea name={`${currentNode.getName()}-col-${col}`}/>
                </div>
            )
            )}
        </div>
    );
};

Cols.jahiaComponent = {
    id: 'colsCmp',
    nodeType: 'luxe:cols',
    name: 'default',
    componentType: 'view'
};
