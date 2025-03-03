import clsx from "clsx";

type rowTypes = {
  title: string;
  value: string;
};

type tableTypes = {
  rows: rowTypes[];
  className?: string;
};

const defaultRows = [];

export const Table = ({ rows = defaultRows, className }: tableTypes) => {
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
