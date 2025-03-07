import { AddResources, useUrlBuilder } from "@jahia/javascript-modules-library";
import { SeoMetaTags } from "./SeoMetaTags";
import { ReactNode } from "react";
import "../../scss/styles.scss";

export const HtmlHead = ({ children }: { children: ReactNode }) => {
  const { buildStaticUrl } = useUrlBuilder();

  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <SeoMetaTags />

      <link rel="icon" type="image/png" href={buildStaticUrl({ assetPath: "favicon-32x32.png" })} />
      <AddResources
        type="css"
        resources={buildStaticUrl({ assetPath: "../javascript/server/style.css" })}
      />
      {children}
    </head>
  );
};
