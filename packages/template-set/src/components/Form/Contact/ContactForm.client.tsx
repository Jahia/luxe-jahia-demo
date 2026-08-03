import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react";
import { submitContact } from "./utils.client";
import type { EmptyObject, FeedbackProps, MsgPropsProps } from "./types";
import classes from "~/components/Form/Contact/ContactForm.client.module.css";
import form from "~/templates/css/form.module.css";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation();
	const formRef = useRef<HTMLFormElement>(null);
	const [firstName, setFirstName] = useState(prefill.firstName);
	const [lastName, setLastName] = useState(prefill.lastName);
	const [email, setEmail] = useState(prefill.email);
	const [message, setMessage] = useState(prefill.message);

	// The SSR markup accepts input before the island hydrates, and that text
	// never fires onChange — sync it from the DOM once handlers are attached,
	// otherwise the submit button stays disabled despite a fully filled form
	useEffect(() => {
		const form = formRef.current;
		if (!form) {
			return;
		}

		const domValue = (name: string) =>
			(form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? "";
		/* eslint-disable @eslint-react/set-state-in-effect --
		   reading the DOM is only possible after mount, and the extra render only
		   happens when pre-hydration input is actually recovered */
		setFirstName((current) => current || domValue("contact-firstName"));
		setLastName((current) => current || domValue("contact-lastName"));
		setEmail((current) => current || domValue("contact-email"));
		setMessage((current) => current || domValue("contact-message"));
		/* eslint-enable @eslint-react/set-state-in-effect */
	}, []);

	const isFormValid = firstName && lastName && email && message && mode !== "edit";

	return (
		<form id="contactForm" ref={formRef} className={classes.form}>
			<div>
				<label htmlFor="inputContactFirstName" className={classes.label}>
					{t("form.contact.firstName")}
				</label>
				<input
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
