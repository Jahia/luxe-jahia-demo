import clsx from "clsx";
import type { CommonsProps } from "../types";

export const Row = ({ className, children }: CommonsProps) => {
  return <div className={clsx("row", className)}>{children}</div>;
};
