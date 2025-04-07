import { useEffect, useMemo, useState } from "react";
import { t } from "i18next";
import ContactFormClient from "./ContactForm.client";
import { getCookie, prefillWithUserContext } from "./utils.client";
import type { EmptyObject, FeedbackProps, MsgPropsProps } from "./types";
import classes from "~/components/Form/Contact/Contact.client.module.css";

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
export default function ContactClient({
  target,
  feedbackMsg,
  mode,
}: {
  target?: string;
  feedbackMsg: string;
  mode: string;
}) {
  const [feedback, setFeedback] = useState<FeedbackProps>({ show: false, msgProps: {} });
  const [unknownError, setUnknownError] = useState<boolean>(false);
  // const [prefill, setPrefill] = useState<MsgPropsProps | EmptyObject>({});

  const prefill = useMemo<MsgPropsProps | EmptyObject>(
    () => (Object.keys(feedback.msgProps).length ? feedback.msgProps : {}),
    [feedback],
  );
  // useEffect(() => {
  // if (Object.keys(feedback.msgProps).length) {
  //   setPrefill(feedback.msgProps);
  // }
  // }, [feedback]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.digitalData) {
      const sessionId = window.cxs?.sessionId || getCookie("wem-session-id");
      prefillWithUserContext(sessionId, setFeedback);
    }
  }, []);

  const handleRedo = (e) => {
    e.preventDefault();
    setFeedback({ show: false, msgProps: {} });
    return false;
  };

  if (feedback.show) {
    const { firstName, lastName, email, message } = feedback.msgProps;
    const name = `${firstName} ${lastName}`;
    if (feedback.ok || feedback.status === 200) {
      const personalizedFeedbackMsg = feedbackMsg
        .replace("$name", name)
        .replace("$email", email)
        .replace("$message", message);
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: personalizedFeedbackMsg,
          }}
          className={classes.fs6}
          role="info"
        />
      );
    }

    return (
      <>
        <p
          dangerouslySetInnerHTML={{
            __html: t("form.contact.sendMessageError", { name, status: feedback.status }),
          }}
          className={classes.alert}
          role="alert"
        />

        <p>
          <a href="" className={classes.capitalize} onClick={handleRedo}>
            {t("form.contact.sendMessageAgain")}
          </a>
        </p>
      </>
    );
  }

  if (unknownError) {
    return (
      <p className={classes.alert} role="alert">
        {t("form.unknownError")}
      </p>
    );
  }

  return (
    <ContactFormClient
      {...{
        target,
        prefill,
        setFeedback,
        setUnknownError,
        mode,
      }}
    />
  );
}
