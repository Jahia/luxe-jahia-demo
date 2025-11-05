import {
	buildModuleFileUrl,
	getNodeProps,
	getNodesByJCRQuery,
	Island,
	jahiaComponent,
	Render,
	server,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import { t } from "i18next";
import type { RealtorProps } from "./types.js";
import classes from "./fullPage.module.css";
import placeholder from "/static/img/agent-placeholder.jpg";
import ContactClient from "~/commons/Contact.client";
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

jahiaComponent(
	{
		nodeType: "luxe:realtor",
		name: "fullPage",
		displayName: "Full Page",
		componentType: "view",
	},
	(
		{
			firstName,
			lastName,
			description,
			image: imageNode,
			languages,
			yOfExperience,
			email,
			phone,
		}: RealtorProps,
		{ currentNode, renderContext },
	) => {
		const contextMode = renderContext.getMode();
		const refBy = currentNode.getWeakReferences();
		const refByNode: JCRNodeWrapper[] = [];
		while (refBy.hasNext()) {
			refByNode.push(refBy.nextProperty().getParent() as JCRNodeWrapper);
		}

		const agencies: { id: string; name: string; address?: string }[] = refByNode.map(
			(agencyNode) => {
				return {
					...(getNodeProps(agencyNode, ["name", "address"]) as { name: string; address: string }),
					id: agencyNode.getIdentifier(),
				};
			},
		);
		const queryRefinement = refByNode.reduce((refinement, agencyNode, index) => {
			if (index === 0) {
				refinement = "WHERE ";
			}

			if (index > 0) {
				refinement = `${refinement}  OR `;
			}

			return `${refinement} isdescendantnode('${agencyNode.getPath()}')`;
		}, "");

		const query = `SELECT *
									 FROM [luxe:estate] AS estate
										 ${queryRefinement}
									 ORDER BY estate.[jcr:created] DESC`;

		refByNode.forEach((agencyNode) =>
			server.render.addCacheDependency(
				{ flushOnPathMatchingRegexp: `${agencyNode.getPath()}/.*` },
				renderContext,
			),
		);

		const estates = getNodesByJCRQuery(currentNode.getSession(), query, MAX_ESTATE);

		const spokenLanguagesTranslation = {
			fr: t("list.data.spokenLanguage.fr"),
			en: t("list.data.spokenLanguage.en"),
			de: t("list.data.spokenLanguage.de"),
			es: t("list.data.spokenLanguage.es"),
		};

		const listRows: ListRowProps[] = [
			{
				title: t("list.data.agency"),
				value: agencies.map((agency) => agency.name).join(" / "),
			},
			{
				title: t("list.data.spokenLanguage.label"),
				value: languages?.map((language) => spokenLanguagesTranslation[language]).join(", "),
				className: "textCapitalize",
			},
			{
				title: t("list.data.yOfExperience"),
				value: `${yOfExperience}`,
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
				alt: t("alt.realtor", { realtor: `${firstName} ${lastName}` }),
			});

			// Responsive slot hint: ≤992px → 90vw, otherwise ≈500px
			// (keep in sync with grid breakpoints; effective with width-based srcset)
			imageProps.sizes = "(max-width: 992px) 90vw, 500px";
		}

		const addressItems: AddressItem[] = agencies
			.filter((item): item is { address: string; id: string; name: string } =>
				Boolean(item.address),
			)
			.map(({ address, id }) => ({ label: address, address, id }));

		return (
			<>
				<Section>
					<ContentHeader
						title={`${firstName} ${lastName}`}
						image={imageProps}
						description={description}
					/>
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
					</Row>
				</Section>
				<Section>
					<HeadingSection title={t("section.heading.exclusiveEstates")} />
					<Row className={classes.rowEstates}>
						{estates.map((estate) => (
							<Col key={estate.getIdentifier()}>
								<Render node={estate as JCRNodeWrapper} />
							</Col>
						))}
					</Row>
				</Section>
			</>
		);
	},
);
