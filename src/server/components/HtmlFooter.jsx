import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Col, Row, Section} from './grid';

export const HtmlFooter = ({className}) => {
    return (
        <Section component="footer" className={clsx('lux-site-footer', className)}>
            <Row>
                <Col className="col-3">
                    <h5>Resources</h5>
                    <ul className="list-unstyled">
                        <li>
                            <a href="">Academy</a>
                        </li>
                        <li>
                            <a href="">Tutorials</a>
                        </li>
                        <li>
                            <a href="">Source code</a>
                        </li>
                    </ul>
                </Col>
                <Col>
                    <h5>Backoffice</h5>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#">Connection</a>
                        </li>
                    </ul>
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
                <Col>
                    <a href="#">Privacy Policy</a>
                    <span className="lux-site-footer_disclaimer_seprator">
                        /
                    </span>
                    <a href="#">Terms of Use</a>
                </Col>
                <Col className="text-end">
                    <span>
                        Copyrights © 2002-2024 All Rights Reserved by Jahia
                        Solutions Group SA
                    </span>
                </Col>
            </Row>
        </Section>
    );
};

HtmlFooter.propTypes = {
    className: PropTypes.string
};
