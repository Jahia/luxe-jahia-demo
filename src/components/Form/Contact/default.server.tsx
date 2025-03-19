import { HydrateInBrowser, jahiaComponent } from "@jahia/javascript-modules-library";
import ContactClient from "./Contact.client";

jahiaComponent(
  {
    nodeType: "luxe:contactForm",
    name: "default",
    displayName: "default (hydrate)",
    componentType: "view",
  },
  ({ target, feedbackMsg }: { target?: string; feedbackMsg: string }, { renderContext }) => {
    const mode = renderContext.getMode();
    return <HydrateInBrowser child={ContactClient} props={{ target, feedbackMsg, mode }} />;
  },
);
