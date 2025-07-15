import type { Dispatch, SetStateAction } from "react";

export interface JahiaUrlsProps {
  liveUrl: string;
  previewUrl: string;
  logoutUrl: string;
  loginUrl: string;
  editUrl: string;
  gqlUrl: string;
}

export interface LoginCommonProps {
  siteKey?: string;
  loginUrl: string;
  setUser: Dispatch<SetStateAction<string | undefined>>;
  handleLoggedIn: () => void;
  setIncorrectLogin: Dispatch<SetStateAction<boolean>>;
  setUnknownError: Dispatch<SetStateAction<boolean>>;
}

export type LoginPersonaProps = {
  username: string;
  password: string;
  userinfo: {
    fullname: string;
    function: string;
    avatar: {
      image: {
        url: string;
        alt: string;
      };
      video: {
        url: string;
      };
    };
    description: string;
  };
};
