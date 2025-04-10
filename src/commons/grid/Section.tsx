import type { ElementType } from "react";
import type { CommonsProps } from "../types";
import classes from "./grid.module.css";

interface sectionProps extends CommonsProps {
  component?: ElementType;
}

export const Section = ({
  className,
  component: Component = "section",
  children,
}: sectionProps) => {
  return (
    <Component className={className}>
      <div className={classes.container}>{children}</div>
    </Component>
  );
};
