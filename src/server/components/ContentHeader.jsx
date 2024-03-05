import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const ContentHeader = ({
    title,
    description,
    imgURL,
    className,
    ...props
}) => {
    return (
        <header
            className={clsx("container", "d-flex", "mb-0", "pb-0", className)}
            {...props}
        >
            <img
                src={imgURL}
                alt=""
                className="lux-contentHeader_image"
                width="500"
                height="500"
            />
            <div className="d-flex flex-column flex-fill gap-5">
                <h1 className="lux-contentHeader_title display-2 d-flex align-items-center mb-0 ms-5">
                    {title}
                </h1>
                {description && (
                    <article className="lux-contentHeader_description bg-secondary">
                        {description}
                    </article>
                )}
            </div>
        </header>
    );
};

ContentHeader.propTypes = {
    title: PropTypes.string.isRequired,
    imgURL: PropTypes.string.isRequired,
    description: PropTypes.string,
    className: PropTypes.string,
};
