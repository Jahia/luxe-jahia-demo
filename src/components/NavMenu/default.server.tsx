import { buildNodeUrl, jahiaComponent, server } from "@jahia/javascript-modules-library";
import clsx from "clsx";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import classes from "./default.module.css";
import { NavigationToggler } from "~/components/NavMenu/NavigationToggler";

interface Props {
	brandText?: string;
	brandImage?: JCRNodeWrapper;
	brandImageMobile?: JCRNodeWrapper;
}

jahiaComponent(
	{
		nodeType: "luxe:navigationMenu",
		displayName: "Navigation Menu",
		name: "default",
		componentType: "view",
		properties: {
			"cache.mainResource": "true",
		},
	},
	({ brandText, brandImage }: Props, { renderContext }) => {
		const siteName = renderContext.getSite().getTitle();
		const home = renderContext.getSite().getHome();

		if (brandImage) {
			server.render.addCacheDependency({ node: brandImage }, renderContext);
		}

		return (
			<nav className={clsx(classes.navbar)}>
				<div className={classes.containerFluid}>
					<a href={buildNodeUrl(home)} className={classes.brand}>
						{brandImage && (
							<img src={buildNodeUrl(brandImage)} alt={`Logo-${siteName}`} width="100" />
						)}
						{brandText}
					</a>
					<NavigationToggler />
					<LanguageSwitcher />
				</div>
			</nav>
		);
	},
);
