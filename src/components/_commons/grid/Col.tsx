import clsx from "clsx";
import { CommonsProps } from "../types";

export const Col = ({ className, children }: CommonsProps) => {
  return <div className={clsx("col", className)}>{children}</div>;
};
