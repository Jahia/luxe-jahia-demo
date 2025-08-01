import { useState } from "react";
import { HeadingSection } from "~/commons/HeadingSection";
import { t } from "i18next";
import classes from "./Contact.client.module.css";
import { Dialog } from "design-system";
import ContactFormClient from "~/components/Form/Contact/Contact.client";

export interface ContactProps {
	addresses: { address: string; id: string }[];
	phone?: string;
	email?: string;
	contactTarget?: string;
	feedbackMsg?: string;
	contextMode?: string;
}

const ContactClient = ({
	addresses,
	phone,
	email,
	contactTarget,
	feedbackMsg = "",
	contextMode = "default",
}: ContactProps) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<HeadingSection title={t("section.heading.contact")} />
			<address>
				<div className={classes.row}>
					<strong className={classes.label}>{t("section.contact.address")}</strong>
					{addresses.map(({ address, id }) => {
						return <span key={id}>{address}</span>;
					})}
				</div>
				<div className={classes.row}>
					<strong className={classes.label}>{t("section.contact.phone")}</strong>
					<a href={`tel:${phone}`}>{phone}</a>
				</div>
				<div className={classes.row}>
					<strong className={classes.label}>{t("section.contact.email")}</strong>
					<a href={`mailto:${email}`}>{email}</a>
				</div>
			</address>
			<button type="button" className={classes.btn} onClick={() => setIsOpen(true)}>
				{t("section.contact.btn")}
			</button>

			<Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} className={classes.dialog}>
				{/* Contact form inside the dialog */}
				<div className={classes.formWrapper}>
					<h2 className={classes.title}>{t("form.contact.dialog.title")}</h2>
					<ContactFormClient target={contactTarget} feedbackMsg={feedbackMsg} mode={contextMode} />
				</div>
			</Dialog>
		</>
	);
};

export default ContactClient;
