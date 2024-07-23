import React from 'react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';

const ContactComponent = ({target, feedbackMsg, mode}) => {
    const {t} = useTranslation();
    const [showFeedback, setShowFeedback] = useState(false);
    const [unknownError, setUnknownError] = useState(false);

    if (mode === 'edit') {
        return <div className="alert alert-dark fs-6" role="alert">{t('form.editModeWarning')}</div>;
    }

    if (showFeedback) {
        return (
            <div className="info fs-6" role="info">{feedbackMsg}</div>
        );
    }

    if (unknownError) {
        return (
            <p className="alert alert-danger fs-6" role="alert">
                {t('form.unknownError')}
            </p>
        );
    }

    return (
        <ContactForm {...{
                target,
                setShowFeedback,
                setUnknownError
            }}
        />
    );
};

ContactComponent.propTypes = {
    target: PropTypes.string,
    feedbackMsg: PropTypes.string,
    mode: PropTypes.string.isRequired
};

export default ContactComponent;
