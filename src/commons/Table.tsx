import clsx from "clsx";
import { table, tableKey, tableRow, tableValue } from "./Table.module.css";
import type { JSX } from "react";

const defaultRows = [];

export const Table = ({
  rows = defaultRows,
  className,
}: {
  rows?: {
    title: string;
    value: string | JSX.Element;
    className?: string;
  }[];
  className?: string;
}) => {
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
