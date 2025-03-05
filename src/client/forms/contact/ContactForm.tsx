// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { submitContact } from "./ContactUtils.js";
import { ContactFormTypes } from "./types";

const defaultPrefill = {};

const ContactForm = ({
  target,
  prefill = defaultPrefill,
  setFeedback,
  setUnknownError,
  mode,
}: ContactFormTypes) => {
  const { t } = useTranslation();
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
    <form id="contactForm" className="modal-body d-flex flex-column gap-3">
      <div>
        <label htmlFor="inputContactFirstName" className="form-label fs-6 lux-capitalize">
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
          className="form-control"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="inputContactLastName" className="form-label fs-6 lux-capitalize">
          {t("form.contact.lastName")}
        </label>
        <input
          required
          id="inputContactLastName"
          defaultValue={lastName}
          type="text"
          name="contact-lastName"
          placeholder={t("form.contact.lastName")}
          className="form-control"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="inputContactEmail" className="form-label fs-6 lux-capitalize">
          {t("form.contact.email")}
        </label>
        <input
          required
          id="inputContactEmail"
          defaultValue={email}
          type="email"
          name="contact-email"
          placeholder={t("form.contact.email")}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="inputContactMsg" className="form-label fs-6 lux-capitalize">
          {t("form.contact.msg")}
        </label>
        <textarea
          required
          id="inputContactMsg"
          defaultValue={message}
          name="contact-message"
          placeholder={t("form.contact.msg")}
          className="form-control"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        type="button"
        form="contactForm"
        className="btn btn-primary lux-capitalize"
        disabled={!isFormValid}
        onClick={(e) =>
          submitContact({
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

export default ContactForm;
