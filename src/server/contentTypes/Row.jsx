import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { getAlignCSS, getGutterCSS, getGridCSS } from "../scripts/utils";

export const Row = ({
    children,
    alignment,
    gutter,
    type = "columns",
    columnSpacing,
    grid,
    className,
    ...props
}) => {
    return (
        <div
            className={clsx(
                "row",
                getAlignCSS(alignment),
                getGutterCSS(gutter),
                [type === "grid" ? getGridCSS(grid) : null],
                className
            )}
            {...props}
        >
            {React.Children.map(children, (content) => (
                <div className={clsx("col", getGutterCSS(columnSpacing))}>
                    {content}
                </div>
            ))}
        </div>
    );
};

Row.propTypes = {
    gutter: PropTypes.oneOf([
        "none",
        "nano",
        "small",
        "medium",
        "large",
        "huge",
    ]),
    columnSpacing: PropTypes.oneOf([
        "none",
        "nano",
        "small",
        "medium",
        "large",
        "huge",
    ]),
    type: PropTypes.oneOf(["columns", "grid"]),
    grid: PropTypes.oneOf(["1", "2", "3", "4"]),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    alignment: PropTypes.oneOf(["left", "center", "right"]),
};
