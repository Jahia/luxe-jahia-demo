import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Footer = ({className, ...props}) => {
    return (
        <footer className={clsx('lux-site-footer', className)} {...props}>
            <div className="container">
                <div className="row">
                    <div className="col-3">
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
                    </div>
                    <div className="col">
                        <h5>Backoffice</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#">Connection</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-3">
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
                    </div>
                </div>
                <div className="row lux-site-footer_disclaimer pb-3">
                    <div className="col">
                        <a href="#">Privacy Policy</a>
                        <span className="lux-site-footer_disclaimer_seprator">
                            /
                        </span>
                        <a href="#">Terms of Use</a>
                    </div>
                    <div className="col text-end">
                        <span>
                            Copyrights © 2002-2024 All Rights Reserved by Jahia
                            Solutions Group SA
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    className: PropTypes.string
};
