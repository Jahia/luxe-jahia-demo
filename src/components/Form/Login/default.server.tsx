import {
  buildEndpointUrl,
  buildModuleFileUrl,
  HydrateInBrowser,
  jahiaComponent,
} from "@jahia/javascript-modules-library";
import LoginClient from "./Login.client";

// import pam from "/static/img/users/pam.webp";
import pamP from "/static/img/users/pam.webp";
import pamM from "/static/img/users/pam.webm";
import pennyP from "/static/img/users/penny.webp";
import pennyM from "/static/img/users/penny.webm";
import robinP from "/static/img/users/robin.webp";
import robinM from "/static/img/users/robin.webm";
import type { LoginPersonaProps } from "~/components/Form/Login/types";

const rawPersona: LoginPersonaProps[] = [
  {
    username: "pam",
    password: "password",
    userinfo: {
      fullname: "Pam Pasteur",
      function: "form.login.persona.pam.function",
      avatar: {
        image: {
          url: pamP,
          alt: "form.login.persona.pam.alt",
        },
        video: {
          url: pamM,
        },
      },
      description: "form.login.persona.pam.description",
    },
  },
  {
    username: "penny",
    password: "password",
    userinfo: {
      fullname: "Penny Galileo",
      function: "form.login.persona.penny.function",
      avatar: {
        image: {
          url: pennyP,
          alt: "form.login.persona.penny.alt",
        },
        video: {
          url: pennyM,
        },
      },
      description: "form.login.persona.penny.description",
    },
  },
  {
    username: "robin",
    password: "password",
    userinfo: {
      fullname: "Robin Lovelace ",
      function: "form.login.persona.robin.function",
      avatar: {
        image: {
          url: robinP,
          alt: "form.login.persona.robin.alt",
        },
        video: {
          url: robinM,
        },
      },
      description: "form.login.persona.robin.description",
    },
  },
];

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

    const persona = rawPersona.map((p) => ({
      ...p,
      userinfo: {
        ...p.userinfo,
        avatar: {
          image: {
            ...p.userinfo.avatar.image,
            url: buildModuleFileUrl(p.userinfo.avatar.image.url),
          },
          video: {
            ...p.userinfo.avatar.video,
            url: buildModuleFileUrl(p.userinfo.avatar.video.url),
          },
        },
      },
    }));

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
          persona: persona,
        }}
      />
    );
  },
);
