import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// data = [
//     {
//         k: "Nombre d’experts",
//         v: "2",
//     },
// ];

export const Table = ({ rows = [], className, ...props }) => {
    return (
        <dl className="lux-table">
            {rows.map((row) => (
                <div key={row.title} className="lux-table_row d-flex">
                    <dt className="lux-table_key">{row.title}</dt>
                    <dd className="lux-table_value">{row.value}</dd>
                </div>
            ))}
        </dl>
    );
};

Table.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            value: PropTypes.element.isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
};
