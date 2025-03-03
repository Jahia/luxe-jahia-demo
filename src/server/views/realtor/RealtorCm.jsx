import React from "react";
import { useServerContext, Render, defineJahiaComponent } from "@jahia/javascript-modules-library";
import { CMPreview } from "../../components";

export const RealtorCm = () => {
  const { currentNode } = useServerContext();

  return (
    <CMPreview>
      <Render node={currentNode} view="fullPage" />
    </CMPreview>
  );
};

RealtorCm.jahiaComponent = defineJahiaComponent({
  nodeType: "luxe:realtor",
  name: "cm",
  componentType: "view",
});
