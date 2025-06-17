import { AddResources, buildModuleFileUrl } from "@jahia/javascript-modules-library";
import type { CommonsProps } from "./types";

export const CMPreview = ({ className, children }: CommonsProps) => (
  <>
    <AddResources type="css" resources={buildModuleFileUrl("dist/assets/style.css")} />
    <main className={className}>{children}</main>
  </>
);
