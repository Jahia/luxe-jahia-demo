import { HydrateInBrowser, jahiaComponent } from "@jahia/javascript-modules-library";
import ContactComponent from "../../../../client/ContactComponent";
import { contactFormTypes } from "../types";

jahiaComponent(
  {
    nodeType: "luxemix:contactForm",
    name: "default",
    displayName: "default (hydrate)",
    componentType: "view",
  },
  ({ target, feedbackMsg }: contactFormTypes, { renderContext }) => {
    const mode = renderContext.getMode();
    return <HydrateInBrowser child={ContactComponent} props={{ target, feedbackMsg, mode }} />;
  },
);
