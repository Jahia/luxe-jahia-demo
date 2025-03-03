import React from "react";
import { HydrateInBrowser, jahiaComponent } from "@jahia/javascript-modules-library";
import ContactComponent from "../../../../client/ContactComponent";

jahiaComponent(
  {
    nodeType: "luxemix:contactForm",
    name: "default",
    displayName: "default (hydrate)",
    componentType: "view",
  },
  ({ target, feedbackMsg }, { renderContext }) => {
    const mode = renderContext.getMode();

    return <HydrateInBrowser child={ContactComponent} props={{ target, feedbackMsg, mode }} />;
  },
);
