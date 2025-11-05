import {
	AddContentButtons,
	buildModuleFileUrl,
	getNodeProps,
	getNodesByJCRQuery,
	Island,
	jahiaComponent,
	Render,
	server,
} from "@jahia/javascript-modules-library";
import type { RenderContext } from "org.jahia.services.render";
import type { JCRNodeWrapper } from "org.jahia.services.content";

import { t } from "i18next";
import ContactClient from "~/commons/Contact.client";
import type { AgencyProps } from "./types";
import type { RealtorProps } from "~/components/Realtor/types";
import classes from "./fullPage.module.css";
import placeholder from "/static/img/agency-placeholder.jpg";
import MapWithPinClient from "~/commons/Map/MapWithPin.client";
import type { AddressItem } from "~/commons/Map/MapWithPin.client";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";
import {
	Col,
	ContentHeader,
	HeadingSection,
	List,
	Row,
	Section,
	type ListRowProps,
} from "design-system";
import type { ImgHTMLAttributes } from "react";

const MAX_ESTATE = 6;

const getAgencyLanguage = ({
	realtors,
	country,
	renderContext,
}: {
	realtors: JCRNodeWrapper[] | undefined;
	country: string;
	renderContext: RenderContext;
}) => {
	if (Array.isArray(realtors)) {
		return new Set(
			realtors.flatMap((realtor) => {
				server.render.addCacheDependency({ node: realtor }, renderContext);
				const props = getNodeProps(realtor, ["languages"]) as RealtorProps;
				return props.languages || [];
			}),
		);
	}

	return [country.toLowerCase()];
};

jahiaComponent(
	{
		nodeType: "luxe:agency",
		name: "fullPage",
		displayName: "Full Page",
		componentType: "view",
	},
	(
		{
			name,
			description,
			image: imageNode,
			creationDate,
			country,
			address,
			email,
			phone,
			realtors,
		}: AgencyProps,
		{ currentNode, renderContext },
	) => {
		const currentNodePath = currentNode.getPath();
		const contextMode = renderContext.getMode();

		const languages = [...getAgencyLanguage({ realtors, country, renderContext })];

		const query = `SELECT *
                       from [luxe:estate] as estate
                       where isdescendantnode('${currentNodePath}')
                       order by estate.[jcr:created] DESC`;
		server.render.addCacheDependency(
			{ flushOnPathMatchingRegexp: `${currentNodePath}/.*` },
			renderContext,
		);

		const estates = getNodesByJCRQuery(currentNode.getSession(), query, MAX_ESTATE);

		const agencyLanguagesTranslation = {
			fr: t("list.data.spokenLanguage.fr"),
			en: t("list.data.spokenLanguage.en"),
			de: t("list.data.spokenLanguage.de"),
			es: t("list.data.spokenLanguage.es"),
			it: t("list.data.spokenLanguage.it"),
			us: t("list.data.spokenLanguage.us"),
		};

		const listRows: ListRowProps[] = [
			{
				title: t("list.data.nbRealtor"),
				value: `${realtors?.length || 0}`,
			},
			{
				title: t("list.data.creationDate"),
				value: new Date(creationDate).getFullYear().toString(),
			},
			{
				title: t("list.data.spokenLanguage.label"),
				value: languages.map((language) => agencyLanguagesTranslation[language]).join(", "),
				className: "textCapitalize",
			},
		];

		// Image: placeholder by default; override when a real node exists
		let imageProps: ImgHTMLAttributes<HTMLImageElement> = {
			src: buildModuleFileUrl(placeholder),
		};

		if (imageNode) {
			// SSR cache dep for this image node
			server.render.addCacheDependency({ node: imageNode }, renderContext);

			// Map Jahia node -> <img> props (+ i18n alt)
			imageProps = imageNodeToImgProps({
				imageNode,
				alt: t("alt.agency", { agency: name }),
			});

			// Responsive slot hint: ≤992px → 90vw, otherwise ≈500px
			// (keep in sync with grid breakpoints; effective with width-based srcset)
			imageProps.sizes = "(max-width: 992px) 90vw, 500px";
		}

		const addresses = [{ address, id: currentNode.getIdentifier() }];
		const addressItems: AddressItem[] = addresses
			.filter((item): item is { address: string; id: string } => Boolean(item.address))
			.map((item) => ({ label: item.address, ...item }));

		return (
			<>
				<Section>
					<ContentHeader title={name} image={imageProps} description={description} />
				</Section>
				<Section>
					<List rows={listRows} />
				</Section>
				<Section>
					<Row>
						<Col>
							<Island
								component={ContactClient}
								props={{
									addresses: addressItems,
									email: email,
									phone: phone,
									contextMode,
									feedbackMsg: t("form.contact.demoMessage"),
								}}
							/>
						</Col>
						<Col>
							<Island
								clientOnly
								component={MapWithPinClient}
								props={{
									addresses: addressItems,
									loadingText: t("maps.loading.map"),
									errorMessages: {
										mapLoading: t("maps.error.mapLoading", { error: "{{error}}" }),
										addressNotFound: t("maps.error.addressNotFound"),
										addressGeo: t("maps.error.addressGeo"),
									},
								}}
							/>
						</Col>
					</Row>
				</Section>

				<Section>
					<HeadingSection title={t("section.heading.experts")} />
					<Row className={classes.rowRealtors}>
						{realtors?.map((realtor) => (
							<Col key={realtor.getIdentifier()}>
								<Render node={realtor} view="animate" readOnly />
							</Col>
						))}
					</Row>
				</Section>
				<Section>
					<HeadingSection title={t("section.heading.exclusiveAgencyEstates")} />
					<Row className={classes.rowEstates}>
						{renderContext.isEditMode() && (
							<Col key="addNewRealEstate">
								<AddContentButtons nodeTypes={["luxe:estate"]} />
							</Col>
						)}

						{estates.map((estate) => (
							<Col key={estate.getIdentifier()}>
								<Render node={estate as JCRNodeWrapper} readOnly />
							</Col>
						))}
					</Row>
				</Section>
			</>
		);
	},
);
