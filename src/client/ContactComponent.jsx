import React, {useEffect} from 'react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';
import {getCookie, prefillWithUserContext} from './ContactUtils';

const ContactComponent = ({target, feedbackMsg, mode}) => {
    const {t} = useTranslation();
    const [feedback, setFeedback] = useState({show: false, msgProps: {}});
    const [unknownError, setUnknownError] = useState(false);
    const [prefill, setPrefill] = useState({});

    useEffect(() => {
        if (Object.keys(feedback.msgProps).length) {
            setPrefill(feedback.msgProps);
        }
    }, [feedback]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.digitalData) {
            const sessionId = window.cxs?.sessionId || getCookie('wem-session-id');
            prefillWithUserContext(sessionId, setPrefill);
        }
    }, []);

    const handleRedo = e => {
        e.preventDefault();
        setFeedback({show: false, msgProps: {}});
        return false;
    };

    if (feedback.show) {
        const {firstName, lastName, email, message} = feedback.msgProps;
        const name = `${firstName} ${lastName}`;
        if (feedback.ok || feedback.status === 200) {
            const personalizedFeedbackMsg = feedbackMsg
                .replace('$name', name)
                .replace('$email', email)
                .replace('$message', message);
            return (
                // eslint-disable-next-line react/no-danger
                <div dangerouslySetInnerHTML={{
                    __html: personalizedFeedbackMsg
                }}
                     className="info fs-6"
                     role="info"
                />
            );
        }

        return (
            <>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={{
                    __html: t('form.contact.sendMessageError', {name, status: feedback.status})
                }}
                   className="alert alert-danger fs-6"
                   role="alert"/>

                <p>
                    <a href="" className="lux-capitalize" onClick={handleRedo}>{t('form.contact.sendMessageAgain')}</a>
                </p>
            </>
        );
    }

    if (unknownError) {
        return (
            <p className="alert alert-danger fs-6" role="alert">
                {t('form.unknownError')} et voilà
            </p>
        );
    }

    return (
        <ContactForm {...{
                target,
                prefill,
                setFeedback,
                setUnknownError,
                mode
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
