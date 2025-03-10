import clsx from "clsx";
import { CommonsProps } from "../types";

export const Row = ({ className, children }: CommonsProps) => {
  return <div className={clsx("row", className)}>{children}</div>;
};
