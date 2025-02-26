import React from 'react';
// Import {useRef, useState} from 'react';
import {clsx} from 'clsx';
// Import LoginForm from './LoginForm';
// import WorkspaceNavigation from './WorkspaceNavigation';
// import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

export const LoginCard = ({userName, role, description, imgUrl, imgAlt, isSelected, className, ...props}) => {
    const styles = clsx(
        'lux-loginCard',
        {'lux-loginCard_selected': isSelected},
        'rounded-2',
        ' align-items-center',
        'p-3',
        'd-flex',
        'flex-row',
        className
    );

    return (
        <div className={styles} {...props}>
            <img src={imgUrl} className="img-fluid rounded-circle me-3" alt={imgAlt} width="90" height="90"/>
            <div className="flex-fill">
                <h2 className="lux-loginCard_title my-0">{userName}</h2>
                <h4 className="lux-loginCard_subtitle">{role}</h4>
                {description}
            </div>
        </div>
    );
};

LoginCard.propTypes = {
    userName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    description: PropTypes.node,
    imgAlt: PropTypes.string
};

export default LoginCard;
