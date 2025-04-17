import { useTracker } from "apache-unomi-tracker";

declare global {
  interface Window {
    digitalData: ReturnType<typeof useTracker>["digitalData"];
    cxs?: {
      sessionId: string;
    };
    wem: ReturnType<typeof useTracker>;
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
