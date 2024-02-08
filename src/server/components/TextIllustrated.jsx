import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

export const TextIllustrated = ({title, text, arrangement, image, link}) => {
    return (
        <div className={clsx('row', 'gap-5')}>
            <div className="col">
                <img
                    src={image.src}
                    alt={image.alt}
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
                    {'order-first': arrangement === 'right'}
                )}
            >
                <h2 className="mb-4">{title}</h2>
                {/* eslint-disable-next-line react/no-danger */}
                <unwanteddiv dangerouslySetInnerHTML={{
                    __html: text
                }}/>
                {link && <a href={link.href}>{link.label}</a>}
            </div>
        </div>
    );
};

TextIllustrated.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    arrangement: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    link: PropTypes.object

};
