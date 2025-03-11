import clsx from "clsx";

export const HeadingSection = ({ title, className }: { title: string; className?: string }) => {
  return (
    <header className={clsx("row", "pb-4", className)}>
      <h2 className="lux-heading_title mb-0">{title}</h2>
    </header>
  );
};
