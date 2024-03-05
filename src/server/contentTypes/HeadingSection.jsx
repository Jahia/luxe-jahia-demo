import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { getAlignCSS } from "../scripts/utils";

export const HeadingSection = ({ className, alignment, title, ...props }) => {
    return (
        <header
            className={clsx("row", "pb-2", getAlignCSS(alignment))}
            {...props}
        >
            <h2 className="lux-heading_title mb-0">{title}</h2>
        </header>
    );
};

HeadingSection.propTypes = {
    title: PropTypes.node.isRequired,
    alignment: PropTypes.oneOf(["left", "center", "right"]),
    className: PropTypes.string,
};
