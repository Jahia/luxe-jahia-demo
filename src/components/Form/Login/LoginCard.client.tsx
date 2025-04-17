import { login } from "./utils.client";
import { t } from "i18next";
import type { LoginCommonProps } from "./types";
import classes from "~/components/Form/Login/LoginCard.client.module.css";

interface LoginCardClientProps {
  username: string;
  password: string;
  userinfo: {
    fullname: string;
    function?: string;
    description?: string;
    avatar?: {
      url: string;
      alt: string;
    };
  };
  loginCommonProps: LoginCommonProps;
  className?: string;
}

export const LoginCardClient = ({
  username,
  password,
  userinfo,
  loginCommonProps,
  ...props
}: LoginCardClientProps) => {
  const handleClick = () =>
    login({
      username,
      password,
      rememberMe: true,
      ...loginCommonProps,
    });

  return (
    <div role="button" className={classes.card} {...props} onClick={handleClick}>
      {userinfo.avatar && (
        <img
          src={userinfo.avatar.url}
          alt={t(userinfo.avatar.alt, { username })}
          width="90"
          height="90"
        />
      )}
      <div>
        <h2>{userinfo.fullname}</h2>
        {userinfo.function && <h4>{t(userinfo.function)}</h4>}
        {userinfo.description && t(userinfo.description)}
      </div>
    </div>
  );
};

export default LoginCardClient;
