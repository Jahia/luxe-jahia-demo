import { buildUrl, HydrateInBrowser, jahiaComponent } from "@jahia/javascript-modules-library";
import LoginClient from "./Login.client";
import { LoginFormServerTypes } from "./types";

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
  (
    { "j:displayRememberMeButton": isShowRememberMe }: LoginFormServerTypes,
    { renderContext, currentResource },
  ) => {
    const isLoggedIn = renderContext.isLoggedIn();

    // @ts-expect-error getName() is not available in getUser
    const userHydrated = renderContext.getUser().getName();

    // URL management, usage of buildUrl ensure urls are correct (vanity, url rewriting, webapp context, etc.)
    const urls = {
      liveUrl: buildUrl(
        { value: renderContext.getURLGenerator().getLive() },
        renderContext,
        currentResource,
      ),
      previewUrl: buildUrl(
        { value: renderContext.getURLGenerator().getPreview() },
        renderContext,
        currentResource,
      ),
      editUrl: buildUrl(
        { value: renderContext.getURLGenerator().getEdit() },
        renderContext,
        currentResource,
      ),
      gqlUrl: buildUrl({ value: "/modules/graphql" }, renderContext, currentResource),
      loginUrl: buildUrl(
        { value: renderContext.getURLGenerator().getLogin() },
        renderContext,
        currentResource,
      ),
      logoutUrl: buildUrl(
        { value: renderContext.getURLGenerator().getLogout() },
        renderContext,
        currentResource,
      ),
    };

    const mode = renderContext.getMode();
    const mainPath = renderContext.getMainResource().getNode().getPath();
    // TODO see if we can get users profile public info here...
    return (
      <HydrateInBrowser
        child={LoginClient}
        props={{
          isLoggedIn,
          userHydrated,
          urls,
          mode,
          nodePath: mainPath,
          isShowRememberMe: Boolean(isShowRememberMe),
          // @ts-expect-error getSiteKey() is not available in getSite
          siteKey: renderContext.getSite().getSiteKey(),
        }}
      />
    );
  },
);
