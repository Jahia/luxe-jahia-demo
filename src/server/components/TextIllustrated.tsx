import clsx from "clsx";
import { Col, Row } from "./grid";

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
    <Row className="lux-textIllustrated gap-5">
      <Col className="lux-textIllustrated_image">
        <img src={image.src} alt={image.alt} height="480px" />
      </Col>
      <Col
        className={clsx(
          "d-flex",
          "flex-column",
          "align-center",
          "justify-content-center",
          "lux-textIllustrated_text",
          { "order-first": arrangement === "right" },
        )}
      >
        <h2 className="mb-4 lux-hasDiamond">{title}</h2>
        {/* @ts-expect-error <unwanteddiv> is not a valid HTML element */}
        <unwanteddiv
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
        {link && (
          <a className="lux-capitalize" href={link.href}>
            {link.label}
          </a>
        )}
      </Col>
    </Row>
  );
};
