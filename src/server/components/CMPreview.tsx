import { ReactNode } from "react";
import { AddResources, useUrlBuilder } from "@jahia/javascript-modules-library";

export const CMPreview = ({ className, children }: { className?: string; children: ReactNode }) => {
  const { buildStaticUrl } = useUrlBuilder();

  return (
    <>
      <AddResources type="css" resources={buildStaticUrl({ assetPath: "css/styles.css" })} />
      <main className={className}>{children}</main>
    </>
  );
};
