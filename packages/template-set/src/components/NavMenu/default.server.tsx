import { buildNodeUrl, jahiaComponent, JImage } from "@jahia/javascript-modules-library";
import clsx from "clsx";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import classes from "./default.module.css";
import { NavigationToggler } from "~/components/NavMenu/NavigationToggler";
import { useTranslation } from "react-i18next";

interface Props {
	"jcr:title"?: string;
	"brandText"?: string;
	"brandImage"?: JCRNodeWrapper;
	"brandImageMobile"?: JCRNodeWrapper;
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
		const { t } = useTranslation();
		const siteName = renderContext.getSite().getTitle();
		const home = renderContext.getSite().getHome();

		return (
			<nav className={clsx(classes.navbar)}>
				<div className={classes.containerFluid}>
					<a href={buildNodeUrl(home)} className={classes.brand}>
						{brandImage && (
							<JImage
								node={brandImage}
								alt={t("alt.logo", { siteName })}
								layout="fixed"
								slotWidth={100}
								width={100}
							/>
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
