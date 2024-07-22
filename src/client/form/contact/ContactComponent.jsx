import React from 'react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

const ContactComponent = ({target, feedbackMsg}) => {
    const {t} = useTranslation();
    const [showFeedback, setShowFeedback] = useState(false);

    const handleSubmit = event => {
        if (event.target === modalRef.current) {
            modalRef.current.close();
        }
    };

    if (mode === 'edit') {
        return <div className="alert alert-dark fs-6" role="alert">{t('login.editModeWarning')}</div>;
    }

    return showFeedback ? (
        <div className="info fs-6" role="info">{feedbackMsg}</div>
    ) : (
        <form
            id="contactForm"
            className="modal-body d-flex flex-column gap-3"
        >
            <div>
                <label htmlFor="inputFirstName" className="form-label fs-6">{t('form.contact.firstname')}</label>
                <input
                    autoFocus
                    id="inputFirstName"
                    type="text"
                    name="firstname"
                    placeholder={t('form.contact.firstname')}
                    className="form-control"
                />
            </div>
        </form>
    );
};

ContactComponent.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userHydrated: PropTypes.string,
    urls: PropTypes.shape({
        liveUrl: PropTypes.string.isRequired,
        previewUrl: PropTypes.string.isRequired,
        editUrl: PropTypes.string.isRequired
    }).isRequired,
    mode: PropTypes.string.isRequired,
    nodePath: PropTypes.string.isRequired,
    isShowRememberMe: PropTypes.bool.isRequired
};

export default ContactComponent;
