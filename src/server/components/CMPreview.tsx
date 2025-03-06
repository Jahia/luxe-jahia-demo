import { AddResources, useUrlBuilder } from "@jahia/javascript-modules-library";
import { defaultComponentTypes } from "./types";

export const CMPreview = ({ className, children }: defaultComponentTypes) => {
  const { buildStaticUrl } = useUrlBuilder();

  return (
    <>
      <AddResources type="css" resources={buildStaticUrl({ assetPath: "css/styles.css" })} />
      <main className={className}>{children}</main>
    </>
  );
};
