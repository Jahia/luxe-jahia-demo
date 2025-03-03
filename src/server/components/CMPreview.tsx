import { AddResources, useUrlBuilder } from "@jahia/javascript-modules-library";
import { defaultComponentType } from "./types";

export const CMPreview = ({ className, children }: defaultComponentType) => {
  const { buildStaticUrl } = useUrlBuilder();

  return (
    <>
      <AddResources type="css" resources={buildStaticUrl({ assetPath: "css/styles.css" })} />
      <main className={className}>{children}</main>
    </>
  );
};
