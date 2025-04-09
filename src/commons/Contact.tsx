import { HeadingSection } from "~/commons/HeadingSection";
import { t } from "i18next";
import { Col, Row, Section } from "~/commons/grid";
import classes from "./Contact.module.css";

export interface ContactProps {
  addresses: { address?: string; id: string }[];
  phone?: string;
  email?: string;
}

export const Contact = ({ addresses, phone, email }: ContactProps) => {
  return (
    <Section>
      <HeadingSection title={t("section.heading.contact")} />
      <Row>
        <Col>
          <address>
            <div className={classes.row}>
              <strong className={classes.label}>{t("section.contact.address")}</strong>
              {addresses.map(({ address, id }) => {
                if (address) return <span key={id}>{address}</span>;
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
          <button type="button" className={classes.btn}>
            {t("section.contact.btn")}
          </button>
        </Col>
        <Col>
          <></>
          {/* <div className="d-flex justify-content-center align-items-center bg-secondary flex-fill h-100">
                            map here
                        </div> */}
        </Col>
      </Row>
    </Section>
  );
};
