import {
	buildModuleFileUrl,
	getImageProps,
	Island,
	jahiaComponent,
} from "@jahia/javascript-modules-library";
import GalleryClient from "~/commons/Gallery.client.tsx";
import type { EstateProps } from "./types.js";
import { CheckIcon } from "design-system/Icons";
import classes from "./fullPage.module.css";
import placeholder from "/static/img/img-placeholder.jpg";
import { Col, List, type ListRowProps, PageTitle, Row, Section } from "design-system";
import { useTranslation } from "react-i18next";

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
jahiaComponent(
	{
		nodeType: "luxe:estate",
		name: "fullPage",
		displayName: "Full Page",
		componentType: "view",
	},
	(
		{
			title,
			description,
			price,
			images,
			type,
			surface,
			rooms,
			bedrooms,
			bathrooms,
			options,
		}: EstateProps,
		{ currentResource },
	) => {
		const { t } = useTranslation();
		const locale = currentResource.getLocale().getLanguage();
		const alt = t("alt.estate", { estate: title });

		// The gallery is an island, so it receives serializable props: getImageProps is the tier
		// below <JImage>, and it registers the cache dependency on each node the same way
		const galleryImages = (images ?? [])
			.filter((imageNode) => Boolean(imageNode))
			.map((imageNode) => getImageProps(imageNode, { alt }));

		if (!galleryImages.length) {
			galleryImages.push({ src: buildModuleFileUrl(placeholder), alt, loading: "eager" });
		}

		// Define translation mappings
		const estateTypeTranslation = {
			house: t("estate.type.house"),
			apartment: t("estate.type.apartment"),
			building: t("estate.type.building"),
		};

		const estateOptionsTranslation = {
			garage: t("estate.options.garage"),
			swimmingPool: t("estate.options.swimmingPool"),
			garden: t("estate.options.garden"),
			balcony: t("estate.options.balcony"),
		};

		const tableRows: ListRowProps[] = [
			{
				title: t("estate.type.label"),
				value: type ? estateTypeTranslation[type] : undefined,
			},
			{
				title: t("estate.surface.label"),
				value:
					surface != null ? (
						<>
							{surface.toLocaleString(locale)} m<sup>2</sup>
						</>
					) : undefined,
			},
			{
				title: t("estate.rooms.label"),
				value: rooms,
			},
			{
				title: t("estate.bedrooms.label"),
				value: bedrooms,
			},
			{
				title: t("estate.bathrooms.label"),
				value: bathrooms,
			},
		].concat(
			(options ?? []).map((option) => ({
				title: estateOptionsTranslation[option],
				value: <CheckIcon />,
				className: "icon",
			})),
		);

		return (
			<>
				<Section>
					<header className={classes.header}>
						<PageTitle title={title ?? ""} className={classes.title} />
					</header>
					<Row>
						<Island
							component={GalleryClient}
							props={{
								title: title ?? "",
								images: galleryImages,
								className: classes.gallery,
								delayMs: 150,
								priority: true,
							}}
						/>
					</Row>
					<Row className={classes.rowDescription}>
						<Col
							dangerouslySetInnerHTML={{
								__html: description ?? "",
							}}
						/>
						<Col>
							{price != null && <p className={classes.price}>{price.toLocaleString(locale)} €</p>}
							<List rows={tableRows} />
						</Col>
					</Row>
				</Section>
			</>
		);
	},
);
