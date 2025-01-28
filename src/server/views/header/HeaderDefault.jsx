import React from 'react';
import {useServerContext, getNodeProps, server, defineJahiaComponent} from '@jahia/javascript-modules-library';

export const HeaderDefault = () => {
    const {currentNode, renderContext} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'image']);

    if (header.image) {
        server.render.addCacheDependency({node: header.image}, renderContext);
    }

    return (
        <section className="lux-cover">
            {/* If you use one of our external DAM plugins, you can specify the image width or height
            to enable live image resizing performed by the DAM provider. */}
            {header.image &&
                <picture>
                    <source media="(min-width: 960px)" srcSet={`${header.image.getUrl(['width:1920'])}?w=1920&h=695`}/>
                    <source media="(min-width: 480px)" srcSet={`${header.image.getUrl(['width:960'])}?w=960&h=695`}/>
                    <img
                        src={`${header.image.getUrl(['width:480'])}?w=480&h=695`}
                        alt={header.image.getDisplayableName()}
                        className="lux-cover_img"
                        height="695px"
                    />
                </picture>}

            <h1 className="lux-cover_caption">
                {header.title}
            </h1>
        </section>
    );
};

HeaderDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:header',
    name: 'default',
    componentType: 'view'
});
