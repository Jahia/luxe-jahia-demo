import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Col, Row } from "./grid";

export const TextIllustrated = ({ title, text, arrangement, image, link }) => {
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
        {/* eslint-disable-next-line react/no-danger */}
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

TextIllustrated.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  arrangement: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
};
