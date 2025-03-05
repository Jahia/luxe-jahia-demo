// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { buildUrl, HydrateInBrowser, jahiaComponent } from "@jahia/javascript-modules-library";
import LoginComponent from "../../../../client/LoginComponent";
import { LoginFormTypes } from "../types";

jahiaComponent(
  {
    nodeType: "luxemix:loginForm",
    name: "default",
    displayName: "default (hydrate)",
    componentType: "view",
    properties: {
      "cache.perUser": "true",
    },
  },
  ({ "j:displayRememberMeButton": isShowRememberMe }: LoginFormTypes, { renderContext }) => {
    const isLoggedIn = renderContext.isLoggedIn();

    const userHydrated = renderContext.getUser().getName();

    // URL management, usage of buildUrl ensure urls are correct (vanity, url rewriting, webapp context, etc.)
    const urls = {
      liveUrl: buildUrl({ value: renderContext.getURLGenerator().getLive() }),
      previewUrl: buildUrl({ value: renderContext.getURLGenerator().getPreview() }),
      editUrl: buildUrl({ value: renderContext.getURLGenerator().getEdit() }),
      gqlUrl: buildUrl({ value: "/modules/graphql" }),
      loginUrl: buildUrl({ value: renderContext.getURLGenerator().getLogin() }),
      logoutUrl: buildUrl({ value: renderContext.getURLGenerator().getLogout() }),
    };

    const mode = renderContext.getMode();
    const mainPath = renderContext.getMainResource().getNode().getPath();
    // TODO see if we can get users profile public info here...
    return (
      <HydrateInBrowser
        child={LoginComponent}
        props={{
          isLoggedIn,
          userHydrated,
          urls,
          mode,
          nodePath: mainPath,
          isShowRememberMe: Boolean(isShowRememberMe),
          siteKey: renderContext.getSite().getSiteKey(),
        }}
      />
    );
  },
);
