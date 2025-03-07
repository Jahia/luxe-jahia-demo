import { Dispatch, SetStateAction } from "react";

declare global {
  interface Window {
    digitalData: {
      contextServerPublicUrl?: string;
      scope?: string;
      page: {
        pageInfo: {
          pageID: string;
        };
      };
    };
    cxs?: {
      sessionId: string;
    };
    wem?: {
      buildFormEvent: (name: string) => object;
      _extractFormData: string[];
    };
  }
}

export type EmptyObject = Record<string, never>;

export type ContactComponentTypes = {
  target?: string;
  feedbackMsg: string;
  mode: string;
};

export type MsgPropsTypes = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export type FeedbackTypes = {
  show: boolean;
  msgProps: MsgPropsTypes | EmptyObject;
  ok?: boolean;
  status?: number;
};

export type ContactFormTypes = {
  target?: string;
  prefill?: MsgPropsTypes | EmptyObject;
  setFeedback: Dispatch<SetStateAction<FeedbackTypes>>;
  setUnknownError: Dispatch<SetStateAction<boolean>>;
  mode: string;
};

export type ContactFormServerTypes = {
  target?: string;
  feedbackMsg: string;
};
