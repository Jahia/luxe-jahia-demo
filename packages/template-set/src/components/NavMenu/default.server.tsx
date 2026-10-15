import { jahiaComponent, JImage, JLink } from "@jahia/javascript-modules-library";
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
					{/* A logo is not one of a set of pages, so it takes no aria-current even on home */}
					<JLink node={home} isCurrent={false} className={classes.brand}>
						{brandImage && (
							<JImage
								node={brandImage}
								alt={t("alt.logo", { siteName })}
								className={classes.brandImage}
								layout="fixed"
								slotWidth={100}
							/>
						)}
						{brandText}
					</JLink>
					<NavigationToggler />
					<LanguageSwitcher />
				</div>
			</nav>
		);
	},
);
