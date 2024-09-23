import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {submitContact} from './ContactUtils';

const ContactForm = ({target, prefill, setFeedback, setUnknownError, mode}) => {
    const {t} = useTranslation();
    const [firstname, setFirstname] = useState(prefill.firstname);
    const [lastname, setLastname] = useState(prefill.lastname);
    const [email, setEmail] = useState(prefill.email);
    const [message, setMessage] = useState(prefill.message);

    const isFormValid = firstname && lastname && email && message && mode !== 'edit';

    useEffect(() => {
        if (prefill && prefill.firstname) {
            setFirstname(prefill.firstname);
        }

        if (prefill && prefill.lastname) {
            setLastname(prefill.lastname);
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
                <label htmlFor="inputContactFirstName" className="form-label fs-6 lux-capitalize">{t('form.contact.firstname')}</label>
                <input
                    autoFocus
                    required
                    id="inputContactFirstName"
                    defaultValue={firstname}
                    type="text"
                    name="contact-firstname"
                    placeholder={t('form.contact.firstname')}
                    className="form-control"
                    onChange={e => setFirstname(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="inputContactLastName" className="form-label fs-6 lux-capitalize">{t('form.contact.lastname')}</label>
                <input
                    required
                    id="inputContactLastName"
                    defaultValue={lastname}
                    type="text"
                    name="contact-lastname"
                    placeholder={t('form.contact.lastname')}
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
                    onClick={() => submitContact({
                            target,
                            body: {
                                firstname,
                                lastname,
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
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        email: PropTypes.string,
        message: PropTypes.string
    }),
    setFeedback: PropTypes.func.isRequired,
    setUnknownError: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired
};

export default ContactForm;
