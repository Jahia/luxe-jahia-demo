import { Dispatch, SetStateAction } from "react";

type UserInfoTypes = {
  fullname: string;
  function?: string;
  description?: string;
  avatar?: {
    url: string;
    alt: string;
  };
};

type JahiaUrlsTypes = {
  liveUrl: string;
  previewUrl: string;
  logoutUrl: string;
  loginUrl: string;
  editUrl: string;
  gqlUrl: string;
};

export type LoginCommonPropsTypes = {
  siteKey?: string;
  loginUrl: string;
  setUser: Dispatch<SetStateAction<string | undefined>>;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setIncorrectLogin: Dispatch<SetStateAction<boolean>>;
  setUnknownError: Dispatch<SetStateAction<boolean>>;
};

export type LoginCardTypes = {
  username: string;
  password: string;
  userinfo: UserInfoTypes;
  loginCommonProps: LoginCommonPropsTypes;
  className?: string;
};

export type LoginFormTypes = {
  loginUrl: string;
  setUser: Dispatch<SetStateAction<string | undefined>>;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  isShowRememberMe: boolean;
  siteKey?: string;
};

export type LoginComponentTypes = {
  isLoggedIn: boolean;
  userHydrated?: string;
  urls: JahiaUrlsTypes;
  mode: string;
  nodePath: string;
  isShowRememberMe: boolean;
  siteKey?: string;
};

export type LoginTypes = LoginCommonPropsTypes & {
  username: string;
  password: string;
  rememberMe: boolean;
};

export type WorkspaceNavigationTypes = {
  urls: JahiaUrlsTypes;
  mode: string;
  nodePath: string;
};

export type LoginFormServerTypes = {
  "j:displayRememberMeButton"?: boolean;
};
