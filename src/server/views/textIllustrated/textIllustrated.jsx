import React from 'react';
import {
    useServerContext,
    getNodeProps,
    JArea, jAddCacheDependency
} from '@jahia/js-server-engine';

import clsx from 'clsx';

export const TextIllustrated = () => {
    const {currentNode, renderContext} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const textIllustrated = getNodeProps(currentNode, ['title', 'text', 'image', 'arrangement']);

    const image = textIllustrated.image;
    jAddCacheDependency({node: image});

    return (
        <div className={clsx('row', 'gap-5')}>
            <div className="col">
                <img
                    src={image?.getUrl() || `${modulePath}/assets/img/img-placeholder.jpg`}
                    alt={image?.getDisplayableName() || 'placeholder'}
                    height="480px"
                />
            </div>
            <div
                className={clsx(
                    'col',
                    'd-flex',
                    'flex-column',
                    'align-center',
                    'justify-content-center',
                    {'order-first': textIllustrated.arrangement === 'right'}
                )}
            >
                <h2 className="mb-4">{textIllustrated.title}</h2>
                {/* eslint-disable-next-line react/no-danger */}
                <unwanteddiv dangerouslySetInnerHTML={{
                    __html: textIllustrated.text
                }}/>
            </div>
        </div>
    );
};

TextIllustrated.jahiaComponent = {
    id: 'textIllustratedCmp',
    nodeType: 'luxe:textIllustrated',
    name: 'default',
    componentType: 'view'
};
