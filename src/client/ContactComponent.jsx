import React, {useEffect} from 'react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';

// Const prefillWithUserContext = (cxs, setPrefill) => {
//     const contextServerPublicUrl = window.digitalData.contextServerPublicUrl;
//     const body = {
//         requiredProfileProperties: ['firstname', 'lastname', 'email'],
//         sessionId: cxs.sessionId,
//         source: {
//             itemId: window.digitalData.page.pageInfo.pageID,
//             itemType: 'page',
//             scope: window.digitalData.scope
//         }
//     };
//     fetch(`${contextServerPublicUrl}/context.json`, {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//             'allow-redirects': 'false'
//         },
//         body: JSON.stringify(body)
//     }).then(response => {
//         if (response.status === 200) {
//             const {firstname, lastname, email} = response.data.requiredProfileProperties;
//             setPrefill({firstname, lastname, email});
//         } else {
//             console.log('Failed to retrieve user profile: ');
//             console.error(response);
//         }
//     }).catch(error => {
//         console.log('Error in the call to retrieve user profiles data: ');
//         console.error(error);
//     });
// };

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

    // UseEffect(() => {
    //     if (window.cxs) {
    //         prefillWithUserContext(window.cxs, setPrefill);
    //     }
    // }, [window]);

    const handleRedo = e => {
        e.preventDefault();
        setFeedback({show: false, msgProps: {}});
        return false;
    };

    // If (mode === 'edit') {
    //     return <div className="alert alert-dark fs-6" role="alert">{t('form.contact.editModeWarning')}</div>;
    // }

    if (feedback.show) {
        const {firstname, lastname, email, message} = feedback.msgProps;
        const name = `${firstname} ${lastname}`;
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
                {t('form.unknownError')}
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
