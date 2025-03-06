import { HydrateInBrowser, jahiaComponent } from "@jahia/javascript-modules-library";
import ContactComponent from "$client/forms/contact/ContactComponent";
import { ContactFormTypes } from "../types";

jahiaComponent(
  {
    nodeType: "luxemix:contactForm",
    name: "default",
    displayName: "default (hydrate)",
    componentType: "view",
  },
  ({ target, feedbackMsg }: ContactFormTypes, { renderContext }) => {
    const mode = renderContext.getMode();
    return <HydrateInBrowser child={ContactComponent} props={{ target, feedbackMsg, mode }} />;
  },
);
