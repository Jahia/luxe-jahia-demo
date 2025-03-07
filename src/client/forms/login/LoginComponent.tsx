import { MouseEvent, useRef, useState } from "react";
import LoginForm from "./LoginForm.jsx";
import WorkspaceNavigation from "./WorkspaceNavigation.jsx";
import { useTranslation } from "react-i18next";
import { LoginComponentTypes } from "./types";

export default function LoginComponent({
  isLoggedIn,
  userHydrated,
  urls,
  mode,
  nodePath,
  isShowRememberMe,
  siteKey,
}: LoginComponentTypes) {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [user, setUser] = useState(userHydrated);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const showModal = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    modalRef.current?.showModal();
  };

  // const closeModal = () => {
  //   modalRef.current?.close();
  // };

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
      <div className="alert alert-dark fs-6" role="alert">
        {t("form.login.editModeWarning")}
      </div>
    );
  }

  return loggedIn ? (
    <>
      <h5>{user}</h5>
      <ul className="list-unstyled">
        <WorkspaceNavigation
          {...{
            urls,
            mode,
            nodePath,
          }}
        />
        <li>
          <button
            type="button"
            className="d-block btn btn-link p-0 lux-capitalize border-0"
            onClick={logout}
          >
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
        className="lux-dialog modal modal-xl"
        onClick={(event) => handleOverlayClick(event)}
      >
        <div className="modal-dialog" aria-labelledby="loginModalTitle">
          <LoginForm
            loginUrl={urls.loginUrl}
            // close={closeModal}
            isShowRememberMe={isShowRememberMe}
            setUser={setUser}
            setLoggedIn={setLoggedIn}
            siteKey={siteKey}
          />
        </div>
      </dialog>
      <p>
        <a href={urls.loginUrl} className="lux-capitalize" onClick={showModal}>
          {t("form.login.login")}
        </a>
      </p>
    </>
  );
}
