import React, { ReactNode } from "react";
import clsx from "clsx";

export const Col = ({ className, children }: {}) => {
  return <div className={clsx("col", className)}>{children}</div>;
};
