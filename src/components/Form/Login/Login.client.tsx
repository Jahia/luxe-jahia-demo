import { type MouseEvent, useRef, useState } from "react";
import LoginFormClient from "./LoginForm.client.js";
import WorkspaceNavigationClient from "./WorkspaceNavigation.client.js";
import { t } from "i18next";
import type { JahiaUrlsProps } from "./types";
import classes from "~/components/Form/Login/Login.client.module.css";

interface LoginClientProps {
  isLoggedIn: boolean;
  userHydrated?: string;
  urls: JahiaUrlsProps;
  mode: string;
  nodePath: string;
  isShowRememberMe: boolean;
  siteKey?: string;
}

export default function LoginClient({
  isLoggedIn,
  userHydrated,
  urls,
  mode,
  nodePath,
  isShowRememberMe,
  siteKey,
}: LoginClientProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [user, setUser] = useState(userHydrated);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const showModal = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    modalRef.current?.showModal();
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === modalRef.current) {
      modalRef.current?.close();
    }
  };

  const logout = async () => {
    await fetch(urls.logoutUrl);
    setLoggedIn(false);
  };

  if (mode === "edit") {
    return (
      <div className={classes.alertDark} role="alert">
        {t("form.login.editModeWarning")}
      </div>
    );
  }

  return loggedIn ? (
    <>
      <h5>{user}</h5>
      <ul className={classes.list}>
        <WorkspaceNavigationClient
          {...{
            urls,
            mode,
            nodePath,
          }}
        />
        <li>
          <button type="button" className={classes.btn} onClick={logout}>
            {t("form.login.logout")}
          </button>
        </li>
      </ul>
    </>
  ) : (
    <>
      <h5>{t("footer.backOffice")}</h5>
      <dialog
        ref={modalRef}
        id="loginModal"
        className={classes.dialog}
        onClick={(event) => handleOverlayClick(event)}
      >
        <div className={classes.content} aria-labelledby="loginModalTitle">
          <LoginFormClient
            loginUrl={urls.loginUrl}
            isShowRememberMe={isShowRememberMe}
            setUser={setUser}
            setLoggedIn={setLoggedIn}
            siteKey={siteKey}
          />
        </div>
      </dialog>
      <p>
        <a href={urls.loginUrl} className={classes.capitalize} onClick={showModal}>
          {t("form.login.login")}
        </a>
      </p>
    </>
  );
}
