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
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setIncorrectLogin: Dispatch<SetStateAction<boolean>>;
  setUnknownError: Dispatch<SetStateAction<boolean>>;
}
