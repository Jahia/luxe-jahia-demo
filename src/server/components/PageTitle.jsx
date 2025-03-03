import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export const PageTitle = ({ title, description, className }) => {
  return (
    <hgroup className={clsx("row", "mb-0", className)}>
      <h1 className="mb-0 lux-hasDiamond">{title}</h1>
      {description && <p className="text-body-secondary">{description}</p>}
    </hgroup>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  className: PropTypes.string,
};
