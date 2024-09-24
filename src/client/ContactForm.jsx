import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {submitContact} from './ContactUtils';

const ContactForm = ({target, prefill, setFeedback, setUnknownError, mode}) => {
    const {t} = useTranslation();
    const [firstName, setFirstname] = useState(prefill.firstName);
    const [lastName, setLastname] = useState(prefill.lastName);
    const [email, setEmail] = useState(prefill.email);
    const [message, setMessage] = useState(prefill.message);
    // Const formRef = useRef(null);

    const isFormValid = firstName && lastName && email && message && mode !== 'edit';

    useEffect(() => {
        if (prefill && prefill.firstName) {
            setFirstname(prefill.firstName);
        }

        if (prefill && prefill.lastName) {
            setLastname(prefill.lastName);
        }

        if (prefill && prefill.email) {
            setEmail(prefill.email);
        }
    }, [prefill]);

    return (

        <form
            id="contactForm"
            className="modal-body d-flex flex-column gap-3"
        >
            <div>
                <label htmlFor="inputContactFirstName" className="form-label fs-6 lux-capitalize">{t('form.contact.firstName')}</label>
                <input
                    autoFocus
                    required
                    id="inputContactFirstName"
                    defaultValue={firstName}
                    type="text"
                    name="contact-firstName"
                    placeholder={t('form.contact.firstName')}
                    className="form-control"
                    onChange={e => setFirstname(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="inputContactLastName" className="form-label fs-6 lux-capitalize">{t('form.contact.lastName')}</label>
                <input
                    required
                    id="inputContactLastName"
                    defaultValue={lastName}
                    type="text"
                    name="contact-lastName"
                    placeholder={t('form.contact.lastName')}
                    className="form-control"
                    onChange={e => setLastname(e.target.value)}
                            />
            </div>
            <div>
                <label htmlFor="inputContactEmail" className="form-label fs-6 lux-capitalize">{t('form.contact.email')}</label>
                <input
                    required
                    id="inputContactEmail"
                    defaultValue={email}
                    type="email"
                    name="contact-email"
                    placeholder={t('form.contact.email')}
                    className="form-control"
                    onChange={e => setEmail(e.target.value)}
                            />
            </div>
            <div>
                <label htmlFor="inputContactMsg" className="form-label fs-6 lux-capitalize">{t('form.contact.msg')}</label>
                <textarea
                    required
                    id="inputContactMsg"
                    defaultValue={message}
                    name="contact-message"
                    placeholder={t('form.contact.msg')}
                    className="form-control"
                    onChange={e => setMessage(e.target.value)}
                            />
            </div>
            <button type="button"
                    form="contactForm"
                    className="btn btn-primary lux-capitalize"
                    disabled={!isFormValid}
                    onClick={e => submitContact({
                        form: e.target.form,
                        target,
                        body: {
                            firstName,
                            lastName,
                            email,
                            message
                        },
                        setFeedback,
                        setUnknownError
                    })}
            >
                {t('form.contact.submit')}
            </button>
        </form>
    );
};

ContactForm.propTypes = {
    target: PropTypes.string,
    prefill: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        message: PropTypes.string
    }),
    setFeedback: PropTypes.func.isRequired,
    setUnknownError: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired
};

export default ContactForm;
