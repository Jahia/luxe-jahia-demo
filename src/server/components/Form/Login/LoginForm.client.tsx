import React, { useState } from "react";
import LoginCardClient from "./LoginCard.client";
import { useTranslation } from "react-i18next";
import { login } from "./LoginUtils.js";
import { LoginCommonPropsTypes } from "./types.js";
import { LoginFormTypes } from "./types";

const userMocks = [
  {
    username: "pam",
    password: "password",
    userinfo: {
      fullname: "Pam Pasteur",
      function: "form.login.userMocks.pam.function",
      avatar: {
        url: "https://placehold.co/90x90",
        alt: "form.login.userMocks.pam.alt",
      },
      description: "form.login.userMocks.pam.description",
    },
  },
  {
    username: "penny",
    password: "password",
    userinfo: {
      fullname: "Penny Galileo",
      function: "form.login.userMocks.penny.function",
      avatar: {
        url: "https://placehold.co/90x90",
        alt: "form.login.userMocks.penny.alt",
      },
      description: "form.login.userMocks.penny.description",
    },
  },
  {
    username: "robin",
    password: "password",
    userinfo: {
      fullname: "Robin Lovelace ",
      function: "form.login.userMocks.robin.function",
      avatar: {
        url: "https://placehold.co/90x90",
        alt: "form.login.userMocks.robin.alt",
      },
      description: "form.login.userMocks.robin.description",
    },
  },
];

const LoginFormClient = ({
  loginUrl,
  setUser,
  setLoggedIn,
  siteKey,
  isShowRememberMe = true,
}: LoginFormTypes) => {
  const { t } = useTranslation();

  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const [unknownError, setUnknownError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const loginCommonProps: LoginCommonPropsTypes = {
    siteKey,
    loginUrl,
    setUser,
    setLoggedIn,
    setIncorrectLogin,
    setUnknownError,
  };

  const handleLogin = () =>
    login({
      username,
      password,
      rememberMe,
      ...loginCommonProps,
    });

  return (
    <div className="modal-content">
      <header className="modal-header p-5">
        <h2 id="loginModalTitle" className="lux-capitalize text-center w-100 display-4 m-0">
          {t("form.login.login")}
        </h2>
      </header>
      <div className="modal-body d-flex flex-row p-6 gap-6">
        <div className="d-flex flex-column w-50">
          <h3 className="m0">{t("form.login.sections.persona.title")}</h3>
          <p className="text-muted small">{t("form.login.sections.persona.teaser")}</p>
          <div className="d-flex flex-column gap-2">
            {userMocks?.map((user) => (
              <LoginCardClient key={user.username} {...user} {...{ loginCommonProps }} />
            ))}
          </div>
        </div>
        <div className="w-50">
          <h3 className="m0">{t("form.login.sections.login.title")}</h3>
          <p className="text-muted small">{t("form.login.sections.login.teaser")}</p>
          <form id="loginForm" className="d-flex flex-column gap-3">
            {incorrectLogin && (
              <p className="alert alert-danger fs-6" role="alert">
                {t("form.login.badCreds")}
              </p>
            )}

            {unknownError && (
              <p className="alert alert-danger fs-6" role="alert">
                {t("form.login.unknownError")}
              </p>
            )}

            <div>
              <label htmlFor="inputUser" className="form-label fs-6">
                {t("form.login.username")}
              </label>
              <input
                autoFocus
                id="inputUser"
                type="text"
                name="username"
                placeholder="robin"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="inputPassword" className="form-label fs-6">
                {t("form.login.password")}
              </label>
              <input
                id="inputPassword"
                type="password"
                name="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </div>
            {isShowRememberMe && (
              <div className="form-check d-flex align-items-center">
                <input
                  id="remember"
                  type="checkbox"
                  name="remember"
                  className="form-check-input me-2 mt-0"
                  defaultChecked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember" className="form-check-label lux-capitalize fs-6">
                  {t("form.login.rememberMe")}
                </label>
              </div>
            )}
            <button
              type="button"
              form="loginForm"
              className="btn btn-primary lux-capitalize"
              onClick={handleLogin}
            >
              {t("form.login.login")}
            </button>
          </form>
        </div>
      </div>
      {/* <footer className="modal-footer p-6">
                <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
                <button type="button"
                        form="loginForm"
                        className="btn btn-primary lux-capitalize"
                        onClick={login}
                >
                    {t('form.login.login')}
                </button>
            </footer> */}
    </div>
  );
};

export default LoginFormClient;
