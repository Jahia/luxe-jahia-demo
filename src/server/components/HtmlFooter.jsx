import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Col, Row, Section} from './grid';
import {useTranslation} from 'react-i18next';
import {LoginForm} from '../views/loginForm';

export const HtmlFooter = ({className}) => {
    const {t} = useTranslation();

    return (
        <Section component="footer" className={clsx('lux-site-footer', className)}>
            <Row>
                <Col className="col-4">
                    <h5>{t('footer.resources')}</h5>
                    <ul className="list-unstyled">
                        <li>
                            <a href="">{t('footer.academy')}</a>
                        </li>
                        <li>
                            <a href="">{t('footer.tutorial')}</a>
                        </li>
                        <li>
                            <a href="">{t('footer.sourceCode')}</a>
                        </li>
                    </ul>
                </Col>
                <Col className="col-5">
                    {/* <h5>{t('footer.backOffice')}</h5> */}
                    <LoginForm />
                </Col>
                {/* <Col className="col-3">
                    <h5>Join us</h5>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="#">twitter</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#">youtube</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#">Github</a>
                        </li>
                    </ul>
                </Col> */}
            </Row>
            <Row className="lux-site-footer_disclaimer pb-3">
                {/* <Col> */}
                {/*    <a href="#">Privacy Policy</a> */}
                {/*    <span className="lux-site-footer_disclaimer_seprator"> */}
                {/*        / */}
                {/*    </span> */}
                {/*    <a href="#">Terms of Use</a> */}
                {/* </Col> */}
                <Col className="text-end">
                    <span>
                        {t('footer.copyright', {currentDate: new Date().getFullYear()})}
                    </span>
                </Col>
            </Row>
        </Section>
    );
};

HtmlFooter.propTypes = {
    className: PropTypes.string
};
