import { AddResources, useUrlBuilder } from "@jahia/javascript-modules-library";
import { CommonsProps } from "./types";

export const CMPreview = ({ className, children }: CommonsProps) => {
  const { buildStaticUrl } = useUrlBuilder();

  return (
    <>
      <AddResources
        type="css"
        resources={buildStaticUrl({ assetPath: "../javascript/server/style.css" })}
      />
      <main className={className}>{children}</main>
    </>
  );
};
