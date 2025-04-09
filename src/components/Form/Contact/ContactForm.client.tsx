import { type Dispatch, type SetStateAction, useState } from "react";
import { t } from "i18next";
import { submitContact } from "./utils.client";
import type { EmptyObject, FeedbackProps, MsgPropsProps } from "./types";
import classes from "~/components/Form/Contact/ContactForm.client.module.css";
import form from "~/templates/css/form.module.css";
import clsx from "clsx";

interface ContactFormProps {
  target?: string;
  prefill?: MsgPropsProps | EmptyObject;
  setFeedback: Dispatch<SetStateAction<FeedbackProps>>;
  setUnknownError: Dispatch<SetStateAction<boolean>>;
  mode: string;
}

const defaultPrefill = {};

const ContactFormClient = ({
  target,
  prefill = defaultPrefill,
  setFeedback,
  setUnknownError,
  mode,
}: ContactFormProps) => {
  const [firstName, setFirstName] = useState(prefill.firstName);
  const [lastName, setLastName] = useState(prefill.lastName);
  const [email, setEmail] = useState(prefill.email);
  const [message, setMessage] = useState(prefill.message);
  // Const formRef = useRef(null);

  const isFormValid = firstName && lastName && email && message && mode !== "edit";

  // useEffect(() => {
  //   const { firstName, lastName, email } = prefill;
  //
  //   if (firstName) {
  //     setFirstName(firstName);
  //   }
  //
  //   if (lastName) {
  //     setLastName(lastName);
  //   }
  //
  //   if (email) {
  //     setEmail(email);
  //   }
  // }, [prefill]);

  return (
    <form id="contactForm" className={classes.form}>
      <div>
        <label htmlFor="inputContactFirstName" className={classes.label}>
          {t("form.contact.firstName")}
        </label>
        <input
          autoFocus
          required
          id="inputContactFirstName"
          defaultValue={firstName}
          type="text"
          name="contact-firstName"
          placeholder={t("form.contact.firstName")}
          className={form.control}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="inputContactLastName" className={classes.label}>
          {t("form.contact.lastName")}
        </label>
        <input
          required
          id="inputContactLastName"
          defaultValue={lastName}
          type="text"
          name="contact-lastName"
          placeholder={t("form.contact.lastName")}
          className={form.control}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="inputContactEmail" className={classes.label}>
          {t("form.contact.email")}
        </label>
        <input
          required
          id="inputContactEmail"
          defaultValue={email}
          type="email"
          name="contact-email"
          placeholder={t("form.contact.email")}
          className={form.control}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="inputContactMsg" className={classes.label}>
          {t("form.contact.msg")}
        </label>
        <textarea
          required
          id="inputContactMsg"
          defaultValue={message}
          name="contact-message"
          placeholder={t("form.contact.msg")}
          className={form.control}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        type="button"
        form="contactForm"
        className={clsx(classes.btn)}
        disabled={!isFormValid}
        onClick={(e) =>
          submitContact({
            // @ts-expect-error form is not available in e.target
            form: e.target.form,
            target,
            body: {
              firstName,
              lastName,
              email,
              message,
            },
            setFeedback,
            setUnknownError,
          })
        }
      >
        {t("form.contact.submit")}
      </button>
    </form>
  );
};

export default ContactFormClient;
