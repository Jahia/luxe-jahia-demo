import { ElementType } from "react";
import { defaultComponentTypes } from "../types";

type sectionTypes = defaultComponentTypes & {
  component?: ElementType;
};

export const Section = ({
  className,
  component: Component = "section",
  children,
}: sectionTypes) => {
  return (
    <Component className={className}>
      <div className="container">{children}</div>
    </Component>
  );
};
