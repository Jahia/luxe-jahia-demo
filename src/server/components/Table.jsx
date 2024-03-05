import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// data = [
//     {
//         k: "Nombre d’experts",
//         v: "2",
//     },
// ];

export const Table = ({ data = [], className, ...props }) => {
    return (
        <dl className="lux-table">
            {data.map((row) => (
                <div key={row.k} className="lux-table_row d-flex">
                    <dt className="lux-table_key">{row.k}</dt>
                    <dd className="lux-table_value">{row.v}</dd>
                </div>
            ))}
        </dl>
    );
};

Table.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            k: PropTypes.string.isRequired,
            v: PropTypes.element.isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
};
