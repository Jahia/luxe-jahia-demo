import {
	buildEndpointUrl,
	buildModuleFileUrl,
	Island,
	jahiaComponent,
} from "@jahia/javascript-modules-library";
import LoginClient from "./Login.client";
import { rawPersona } from "./persona";

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

		const userHydrated = renderContext.getUser().getUsername();

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

		return (
			<Island
				component={LoginClient}
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
