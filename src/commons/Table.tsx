import clsx from "clsx";
import { table, tableKey, tableRow, tableValue } from "./Table.module.css";
import type { JSX } from "react";

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
export const Table = ({
  rows,
  className,
}: {
  rows?: {
    title: string;
    value: string | JSX.Element;
    className?: string;
  }[];
  className?: string;
}) => {
  if (!rows?.length) return null;
  return (
    <dl className={clsx(table, className)}>
      {rows?.map(({ title, value, className }) => (
        <div key={title} className={clsx(tableRow, className)}>
          <dt className={tableKey}>{title}</dt>
          {typeof value === "string" ? (
            <dd className={tableValue} dangerouslySetInnerHTML={{ __html: value }} />
          ) : (
            <dd className={tableValue}>{value}</dd>
          )}
        </div>
      ))}
    </dl>
  );
};
