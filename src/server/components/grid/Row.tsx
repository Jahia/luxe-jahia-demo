import React, {ReactNode} from "react";
import clsx from "clsx";

export const Row = ({ className, children } : {className?:string, children:ReactNode}) => {
  return <div className={clsx("row", className)}>{children}</div>;
};
