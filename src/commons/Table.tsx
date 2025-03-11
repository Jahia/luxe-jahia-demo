import clsx from "clsx";

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
    <dl className={clsx("lux-table", className)}>
      {rows.map((row) => (
        <div key={row.title} className="lux-table_row d-flex">
          <dt className="lux-table_key">{row.title}</dt>
          <dd className="lux-table_value text-capitalize">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
};
