import clsx from "clsx";
import type { CommonsProps } from "../types";
import classes from "./Row.module.css";
import type { ElementType } from "react";

interface rowProps extends CommonsProps {
  component?: ElementType;
}

export const Row = ({ className, component: Component = "div", children }: rowProps) => {
  return <Component className={clsx(classes.row, className)}>{children}</Component>;
};
