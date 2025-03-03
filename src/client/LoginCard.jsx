import React from "react";
// Import {useRef, useState} from 'react';
import { clsx } from "clsx";
// Import LoginForm from './LoginForm';
// import WorkspaceNavigation from './WorkspaceNavigation';
// import {useTranslation} from 'react-i18next';
import PropTypes from "prop-types";
import { login } from "./LoginUtils";
import { useTranslation } from "react-i18next";

export const LoginCard = ({
  username,
  password,
  userinfo,
  /* isSelected, */ loginCommonProps,
  className,
  ...props
}) => {
  const { t } = useTranslation();
  const styles = clsx(
    "lux-loginCard",
    // {'lux-loginCard_selected': isSelected},
    "rounded-2",
    " align-items-center",
    "p-3",
    "d-flex",
    "flex-row",
    className,
  );

  const handleClick = () =>
    login({
      username,
      password,
      rememberMe: true,
      ...loginCommonProps,
    });

  return (
    <div role="button" className={styles} {...props} onClick={handleClick}>
      <img
        src={userinfo.avatar.url}
        className="img-fluid rounded-circle me-3"
        alt={t(userinfo.avatar.alt, { username })}
        width="90"
        height="90"
      />
      <div className="flex-fill">
        <h2 className="lux-loginCard_title my-0">{userinfo.fullname}</h2>
        <h4 className="lux-loginCard_subtitle">{t(userinfo.function)}</h4>
        {t(userinfo.description)}
      </div>
    </div>
  );
};

LoginCard.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  userinfo: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    function: PropTypes.string,
    description: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
  }).isRequired,
  // IsSelected: PropTypes.bool.isRequired,
  loginCommonProps: PropTypes.PropTypes.shape({
    siteKey: PropTypes.string,
    loginUrl: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
    setIncorrectLogin: PropTypes.func.isRequired,
    setUnknownError: PropTypes.func.isRequired,
  }),
  className: PropTypes.string,
};

export default LoginCard;
