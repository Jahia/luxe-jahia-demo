import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "./ContactForm";
import { getCookie, prefillWithUserContext } from "./ContactUtils";
import { ContactComponentTypes, EmptyObject, FeedbackTypes, MsgPropsTypes } from "./types";

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
export default function ContactComponent({ target, feedbackMsg, mode }: ContactComponentTypes) {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState<FeedbackTypes>({ show: false, msgProps: {} });
  const [unknownError, setUnknownError] = useState<boolean>(false);
  // const [prefill, setPrefill] = useState<MsgPropsTypes | EmptyObject>({});

  const prefill = useMemo<MsgPropsTypes | EmptyObject>(
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
          className="info fs-6"
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
          className="alert alert-danger fs-6"
          role="alert"
        />

        <p>
          <a href="" className="lux-capitalize" onClick={handleRedo}>
            {t("form.contact.sendMessageAgain")}
          </a>
        </p>
      </>
    );
  }

  if (unknownError) {
    return (
      <p className="alert alert-danger fs-6" role="alert">
        {t("form.unknownError")} et voilà
      </p>
    );
  }

  return (
    <ContactForm
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
