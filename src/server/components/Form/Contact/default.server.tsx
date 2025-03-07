import { HydrateInBrowser, jahiaComponent } from "@jahia/javascript-modules-library";
import ContactClient from "./Contact.client";
import { ContactFormServerTypes } from "./types";

jahiaComponent(
  {
    nodeType: "luxemix:contactForm",
    name: "default",
    displayName: "default (hydrate)",
    componentType: "view",
  },
  ({ target, feedbackMsg }: ContactFormServerTypes, { renderContext }) => {
    const mode = renderContext.getMode();
    return <HydrateInBrowser child={ContactClient} props={{ target, feedbackMsg, mode }} />;
  },
);
