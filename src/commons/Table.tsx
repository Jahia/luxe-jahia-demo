import clsx from "clsx";
import classes from "./Table.module.css";

const defaultRows = [];

export const Table = ({
  rows = defaultRows,
  className,
}: {
  rows: {
    title: string;
    value: string;
  }[];
  className?: string;
}) => {
  return (
    <dl className={clsx(classes.table, className)}>
      {rows.map((row) => (
        <div key={row.title} className={clsx(classes.tableRow, "d-flex")}>
          <dt className={classes.tableKey}>{row.title}</dt>
          <dd className={clsx(classes.tableValue, "text-capitalize")}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
};
