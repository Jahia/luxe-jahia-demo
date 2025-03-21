import {
  buildEndpointUrl,
  HydrateInBrowser,
  jahiaComponent,
} from "@jahia/javascript-modules-library";
import LoginClient from "./Login.client";

jahiaComponent(
  {
    nodeType: "luxe:loginForm",
    name: "default",
    displayName: "default (hydrate)",
    componentType: "view",
    properties: {
      "cache.perUser": "true",
    },
  },
  (
    { "j:displayRememberMeButton": isShowRememberMe }: { "j:displayRememberMeButton"?: boolean },
    { renderContext },
  ) => {
    const isLoggedIn = renderContext.isLoggedIn();

    // @ts-expect-error getName() is not available in getUser
    const userHydrated = renderContext.getUser().getName();

    // URL management, usage of buildEndpointUrl ensure urls are correct (vanity, url rewriting, webapp context, etc.)
    const urls = {
      liveUrl: buildEndpointUrl(renderContext.getURLGenerator().getLive()),
      previewUrl: buildEndpointUrl(renderContext.getURLGenerator().getPreview()),
      editUrl: buildEndpointUrl(renderContext.getURLGenerator().getEdit()),
      gqlUrl: buildEndpointUrl("/modules/graphql"),
      loginUrl: buildEndpointUrl(renderContext.getURLGenerator().getLogin()),
      logoutUrl: buildEndpointUrl(renderContext.getURLGenerator().getLogout()),
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
          siteKey: renderContext.getSite().getSiteKey(),
        }}
      />
    );
  },
);
