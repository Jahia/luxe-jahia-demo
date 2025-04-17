import clsx from "clsx";
import { Col, Row } from "~/commons/grid";
import classes from "./TextIllustrated.module.css";
type textIllustratedTypes = {
  title: string;
  text: string;
  arrangement: "left" | "right";
  image: {
    src: string;
    alt: string;
  };
  link?: {
    href: string;
    label: string;
  };
};

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
export const TextIllustrated = ({
  title,
  text,
  arrangement,
  image,
  link,
}: textIllustratedTypes) => {
  return (
    <Row className={classes.main}>
      <Col className={classes.image}>
        <img src={image.src} alt={image.alt} height="480px" />
      </Col>
      <Col className={clsx(classes.text, classes[arrangement])}>
        <h2 className={classes.title}>{title}</h2>
        {/* @ts-expect-error <unwanteddiv> is not a valid HTML element */}
        <unwanteddiv
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
        {link && (
          <a className={classes.link} href={link.href}>
            {link.label}
          </a>
        )}
      </Col>
    </Row>
  );
};
