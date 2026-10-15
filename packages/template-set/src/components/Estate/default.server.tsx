import { buildNodeUrl, jahiaComponent, JImage } from "@jahia/javascript-modules-library";
import { ClickableCard } from "design-system";
import placeholder from "/static/img/img-placeholder.jpg";
import type { EstateProps } from "./types";
import { useTranslation } from "react-i18next";

jahiaComponent(
	{
		nodeType: "luxe:estate",
		name: "default",
		componentType: "view",
	},
	({ title, price, images, surface, bedrooms }: EstateProps, { currentNode, currentResource }) => {
		const { t } = useTranslation();
		const locale = currentResource.getLocale().getLanguage();

		return (
			<ClickableCard
				href={buildNodeUrl(currentNode)}
				title={title}
				image={({ className }) => (
					<JImage
						node={images?.[0]}
						alt={t("alt.estate", { estate: title })}
						fallback={placeholder}
						className={className}
						layout="constrained"
						// The card is one cell of a grid that goes from one to three columns, which
						// no single slot width describes
						sizes="(max-width: 768px) 100vw,(max-width: 992px) 50vw,(max-width: 1320px) 30vw, 400px"
					/>
				)}
				description={
					<>
						{bedrooms} {t("estate.bedrooms.label")} <span>✦</span> {surface?.toLocaleString(locale)}{" "}
						m<sup>2</sup>
					</>
				}
				footer={price != null ? `${price.toLocaleString(locale)}€` : undefined}
			/>
		);
	},
);
