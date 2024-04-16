import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
export const Table = ({rows = [], className}) => {
    return (
        <dl className={clsx('lux-table', className)}>
            {rows.map(row => (
                <div key={row.title} className="lux-table_row d-flex">
                    <dt className="lux-table_key">{row.title}</dt>
                    <dd className={clsx('lux-table_value', row.valueClassName)}>{row.value}</dd>
                </div>
            ))}
        </dl>
    );
};

Table.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            valueClassName: PropTypes.string
        })
    ).isRequired,
    className: PropTypes.string
};
