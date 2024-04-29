import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const ContentHeader = ({
    title,
    description,
    image,
    className
}) => {
    return (
        <header
            className={clsx('lux-contentHeader', 'container', 'd-flex', 'flex-column', 'flex-lg-row', 'mb-0', 'pb-0', className)}
        >
            <img className="lux-contentHeader_image"
                 src={image.src}
                 alt={image.alt}
                 width="500"
                 height="500"
            />
            <div className="d-flex flex-column flex-fill gap-5">
                <h1 className="lux-contentHeader_title display-2 d-flex align-items-center mb-0 ms-5">
                    {title}
                </h1>
                {description && (
                    <article className="lux-contentHeader_description bg-secondary">
                        {/* eslint-disable-next-line react/no-danger */}
                        <unwanteddiv dangerouslySetInnerHTML={{
                            __html: description
                        }}/>
                    </article>
                )}
            </div>
        </header>
    );
};

ContentHeader.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.object.isRequired,
    className: PropTypes.string
};
