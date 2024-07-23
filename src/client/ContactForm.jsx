import React, {useState} from 'react';
import {Col, Row, Section} from '../server/components';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import LoginForm from './LoginForm';

const submitContact = (
    target,
    firstname,
    lastname,
    email,
    message,
    setShowFeedback,
    setUnknownError) => {
    fetch(target || '/luxe/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'allow-redirects': 'false'
        },
        body: {
            firstname,
            lastname,
            email,
            message
        }
    }).then(response => {
        try {
            setShowFeedback(true);
        } catch (e) {
            console.error('Contact form error : ', e);
            setUnknownError(true);
        }
    });
};

const ContactForm = ({target, setShowFeedback, setUnknownError}) => {
    const {t} = useTranslation();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
        <Section>
            <Row>
                <Col>
                    <form
                        id="contactForm"
                        className="modal-body d-flex flex-column gap-3"
                    >
                        <div>
                            <label htmlFor="inputContactFirstName" className="form-label fs-6">{t('form.contact.firstname')}</label>
                            <input
                                autoFocus
                                id="inputContactFirstName"
                                type="text"
                                name="contact-firstname"
                                placeholder={t('form.contact.firstname')}
                                className="form-control"
                                onChange={e => setFirstname(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="inputContactLastName" className="form-label fs-6">{t('form.contact.lastname')}</label>
                            <input
                                id="inputContactLastName"
                                type="text"
                                name="contact-lastname"
                                placeholder={t('form.contact.lastname')}
                                className="form-control"
                                onChange={e => setLastname(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="inputContactEmail" className="form-label fs-6">{t('form.contact.lastname')}</label>
                            <input
                                id="inputContactEmail"
                                type="email"
                                name="contact-email"
                                placeholder={t('form.contact.lastname')}
                                className="form-control"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="inputContactMsg" className="form-label fs-6">{t('form.contact.msg')}</label>
                            <textarea
                                id="inputContactMsg"
                                name="contact-message"
                                placeholder={t('form.contact.msg')}
                                className="form-control"
                                onChange={e => setMessage(e.target.value)}
                            />
                        </div>
                        <button type="button"
                                form="contactForm"
                                className="btn btn-primary lux-capitalize"
                                onClick={() => submitContact(target,
                                    firstname,
                                    lastname,
                                    email,
                                    message,
                                    setShowFeedback,
                                    setUnknownError)}
                        >
                            {t('form.login.login')}
                        </button>
                    </form>
                </Col>
            </Row>
        </Section>

    );
};

ContactForm.propTypes = {
    target: PropTypes.string,
    setShowFeedback: PropTypes.func.isRequired,
    setUnknownError: PropTypes.func.isRequired
};

export default ContactForm;
