import React from "react";
import { defaultComponentType } from "../types";

type sectionType = defaultComponentType & {
  component: Element;
};

export const Section = ({ className, component, children }: sectionType) => {
  const Component = component || "section";

  return (
    <Component className={className}>
      <div className="container">{children}</div>
    </Component>
  );
};

Section.propTypes = {
  className: PropTypes.string,
  component: PropTypes.elementType,
  children: PropTypes.node,
};
