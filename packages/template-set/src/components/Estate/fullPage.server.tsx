import {
	buildModuleFileUrl,
	Island,
	jahiaComponent,
	server,
} from "@jahia/javascript-modules-library";
import GalleryClient from "~/commons/Gallery.client.tsx";
import { t } from "i18next";
import type { EstateProps } from "./types.js";
import { CheckIcon } from "design-system/Icons";
import classes from "./fullPage.module.css";
import placeholder from "/static/img/img-placeholder.jpg";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";
import { Col, List, type ListRowProps, PageTitle, Row, Section } from "design-system";

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
		{ currentResource, renderContext },
	) => {
		const locale = currentResource.getLocale().getLanguage();

		const galleryImages = images
			.filter((imageNode) => Boolean(imageNode))
			.map((imageNode) => {
				// Cache dependency for all nodes involved
				server.render.addCacheDependency({ node: imageNode }, renderContext);
				return imageNodeToImgProps({
					imageNode,
					alt: t("alt.estate", { estate: title }),
				});
			});

		if (!galleryImages.length) {
			galleryImages.push({
				src: buildModuleFileUrl(placeholder),
				alt: "Placeholder",
			});
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
				value: estateTypeTranslation[type],
			},
			{
				title: t("estate.surface.label"),
				value: (
					<>
						${surface.toLocaleString(locale)} m<sup>2</sup>
					</>
				),
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
						<PageTitle title={title} className={classes.title} />
					</header>
					<Row>
						<Island
							component={GalleryClient}
							props={{ title, images: galleryImages, className: classes.gallery, delayMs: 150 }}
						/>
					</Row>
					<Row className={classes.rowDescription}>
						<Col
							dangerouslySetInnerHTML={{
								__html: description,
							}}
						/>
						<Col>
							<p className={classes.price}>{price.toLocaleString(locale)} €</p>
							<List rows={tableRows} />
						</Col>
					</Row>
				</Section>
			</>
		);
	},
);
