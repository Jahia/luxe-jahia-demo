import type { ElementType } from "react";
import type { CommonsProps } from "../types";

type sectionTypes = CommonsProps & {
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
