import { type Dispatch, type SetStateAction, useState } from "react";
import LoginCardClient from "./LoginCard.client";
import { t } from "i18next";
import { login } from "./utils.client";
import type { LoginCommonProps } from "./types";
import classes from "~/components/Form/Login/LoginForm.client.module.css";
import alert from "~/templates/css/alert.module.css";
import form from "~/templates/css/form.module.css";
import clsx from "clsx";

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

interface LoginFormClientProps {
  loginUrl: string;
  setUser: Dispatch<SetStateAction<string | undefined>>;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  isShowRememberMe: boolean;
  siteKey?: string;
}

const LoginFormClient = ({
  loginUrl,
  setUser,
  setLoggedIn,
  siteKey,
  isShowRememberMe = true,
}: LoginFormClientProps) => {
  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const [unknownError, setUnknownError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const loginCommonProps: LoginCommonProps = {
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
    <div className={classes.main}>
      <header>
        <h2 id="loginModalTitle" className={classes.title}>
          {t("form.login.login")}
        </h2>
      </header>
      <div className={classes.body}>
        <div className={classes.loginCardSection}>
          <h3>{t("form.login.sections.persona.title")}</h3>
          <p>{t("form.login.sections.persona.teaser")}</p>
          <div>
            {userMocks?.map((user) => (
              <LoginCardClient key={user.username} {...user} {...{ loginCommonProps }} />
            ))}
          </div>
        </div>
        <div className={classes.loginFormSection}>
          <h3>{t("form.login.sections.login.title")}</h3>
          <p>{t("form.login.sections.login.teaser")}</p>
          <form id="loginForm" className={form.root}>
            {incorrectLogin && (
              <p className={clsx(alert.danger, classes.fs6)} role="alert">
                {t("form.login.badCreds")}
              </p>
            )}

            {unknownError && (
              <p className={clsx(alert.danger, classes.fs6)} role="alert">
                {t("form.login.unknownError")}
              </p>
            )}

            <div>
              <label htmlFor="inputUser" className={classes.label}>
                {t("form.login.username")}
              </label>
              <input
                autoFocus
                id="inputUser"
                type="text"
                name="username"
                placeholder="robin"
                className={form.control}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="inputPassword" className={classes.label}>
                {t("form.login.password")}
              </label>
              <input
                id="inputPassword"
                type="password"
                name="password"
                className={form.control}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </div>
            {isShowRememberMe && (
              <div className={classes.checkBox}>
                <input
                  id="remember"
                  type="checkbox"
                  name="remember"
                  className={classes.formCheckInput}
                  defaultChecked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember" className={classes.formCheckLabel}>
                  {t("form.login.rememberMe")}
                </label>
              </div>
            )}
            <button type="button" form="loginForm" className={classes.btn} onClick={handleLogin}>
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
