import {
	buildModuleFileUrl,
	buildNodeUrl,
	jahiaComponent,
	HydrateInBrowser,
	server,
} from "@jahia/javascript-modules-library";
import { Col, PageTitle, Row, Section, List, type PictureProps } from "~/commons";
import GalleryClient from "~/commons/gallery/Gallery.client";
import { t } from "i18next";
import type { EstateProps } from "./types.js";
import CheckIcon from "~/commons/icons/CheckIcon";
import classes from "./fullPage.module.css";
import placeholder from "/static/img/img-placeholder.jpg";

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

		const galleryImages: PictureProps[] = images.map((imageNode) => {
			server.render.addCacheDependency({ node: imageNode }, renderContext);
			return {
				image: {
					src: `${buildNodeUrl(imageNode, { parameters: { width: "480" } })}?w=480&h=695`,
					alt: t("alt.estate", { estate: title }), //imageNode.getDisplayableName(),
				},
				sources: [
					{
						media: "(min-width: 960px)",
						srcSet: `${buildNodeUrl(imageNode, { parameters: { width: "1920" } })}?w=1920&h=695`,
					},
					{
						media: "(min-width: 480px)",
						srcSet: `${buildNodeUrl(imageNode, { parameters: { width: "960" } })}?w=960&h=695`,
					},
				],
			};
		}) as PictureProps[];

		if (!galleryImages.length) {
			galleryImages.push({
				image: {
					src: buildModuleFileUrl(placeholder),
					alt: "Placeholder",
				},
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

		const tableRows = [
			{
				title: t("estate.type.label"),
				value: estateTypeTranslation[type],
			},
			{
				title: t("estate.surface.label"),
				value: `${surface.toLocaleString(locale)} m<sup>2</sup>`,
			},
			{
				title: t("estate.rooms.label"),
				value: rooms.toString(),
			},
			{
				title: t("estate.bedrooms.label"),
				value: bedrooms.toString(),
			},
			{
				title: t("estate.bathrooms.label"),
				value: bathrooms.toString(),
			},
			// Spread additional rows based on options, if any
			...(options?.map((option) => ({
				title: estateOptionsTranslation[option],
				value: <CheckIcon />,
				className: "icon",
			})) || []),
		];

		return (
			<>
				<Section>
					<header className={classes.header}>
						<PageTitle title={title} className={classes.title} />
					</header>
					<Row>
						<HydrateInBrowser child={GalleryClient} props={{ data: galleryImages }} />
					</Row>
					<Row className={classes.rowDescription}>
						<Col>
							{/* @ts-expect-error <unwanteddiv> is not a valid HTML element */}
							<unwanteddiv
								dangerouslySetInnerHTML={{
									__html: description,
								}}
							/>
						</Col>
						<Col>
							<p className={classes.price}>{price.toLocaleString(locale)} €</p>
							<List rows={tableRows} />
							{/* <AgentItem imgURL={profile1} name="Robert Fox"/> */}
						</Col>
					</Row>
				</Section>
				{/* <Section>TODO: Biens similaire</Section> */}
			</>
		);
	},
);
