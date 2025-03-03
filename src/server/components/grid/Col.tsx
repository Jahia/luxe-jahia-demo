import clsx from "clsx";
import { defaultComponentTypes } from "../types";

export const Col = ({ className, children }: defaultComponentTypes) => {
  return <div className={clsx("col", className)}>{children}</div>;
};
