import React from "react";
import { useRef, useState } from "react";
import LoginForm from "./LoginForm";
import WorkspaceNavigation from "./WorkspaceNavigation";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const LoginComponent = ({
  isLoggedIn,
  userHydrated,
  urls,
  mode,
  nodePath,
  isShowRememberMe,
  siteKey,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const [user, setUser] = useState(userHydrated);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const showModal = (event) => {
    event.preventDefault();
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const handleOverlayClick = (event) => {
    if (event.target === modalRef.current) {
      modalRef.current.close();
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
            close={closeModal}
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
};

LoginComponent.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userHydrated: PropTypes.string,
  urls: PropTypes.shape({
    logoutUrl: PropTypes.string.isRequired,
    loginUrl: PropTypes.string.isRequired,
  }).isRequired,
  mode: PropTypes.string.isRequired,
  nodePath: PropTypes.string.isRequired,
  isShowRememberMe: PropTypes.bool.isRequired,
  siteKey: PropTypes.string,
};

export default LoginComponent;
