import clsx from "clsx";

export const PageTitle = ({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) => {
  return (
    <hgroup className={clsx("row", "mb-0", className)}>
      <h1 className="mb-0 lux-hasDiamond">{title}</h1>
      {description && <p className="text-body-secondary">{description}</p>}
    </hgroup>
  );
};
