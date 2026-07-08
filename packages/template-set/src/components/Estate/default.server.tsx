import { buildNodeUrl, jahiaComponent } from "@jahia/javascript-modules-library";
import { ClickableCard } from "design-system";
import { LuxeImage } from "~/commons/LuxeImage";
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
					<LuxeImage
						node={images?.[0]}
						alt={t("alt.estate", { estate: title })}
						className={className}
						// Slot hint: default view is usually used in a 3-cols grid,
						// so ≈400px is a good default for larger screens
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
