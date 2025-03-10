import { clsx } from "clsx";
import { login } from "./utils.client";
import { useTranslation } from "react-i18next";
import { LoginCommonProps } from "./types";

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
  className,
  ...props
}: LoginCardClientProps) => {
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
      {userinfo.avatar && (
        <img
          src={userinfo.avatar.url}
          className="img-fluid rounded-circle me-3"
          alt={t(userinfo.avatar.alt, { username })}
          width="90"
          height="90"
        />
      )}
      <div className="flex-fill">
        <h2 className="lux-loginCard_title my-0">{userinfo.fullname}</h2>
        {userinfo.function && <h4 className="lux-loginCard_subtitle">{t(userinfo.function)}</h4>}
        {userinfo.description && t(userinfo.description)}
      </div>
    </div>
  );
};

export default LoginCardClient;
