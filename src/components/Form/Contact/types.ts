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

export interface MsgPropsProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export interface FeedbackProps {
  show: boolean;
  msgProps: MsgPropsProps | EmptyObject;
  ok?: boolean;
  status?: number;
}
