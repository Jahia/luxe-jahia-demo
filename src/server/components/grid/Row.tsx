import clsx from "clsx";
import { defaultComponentTypes } from "../types";

export const Row = ({ className, children }: defaultComponentTypes) => {
  return <div className={clsx("row", className)}>{children}</div>;
};
