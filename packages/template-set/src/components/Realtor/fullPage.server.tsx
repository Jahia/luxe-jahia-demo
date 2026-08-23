import {
	getNodeProps,
	getNodesByJCRQuery,
	Island,
	jahiaComponent,
	JImage,
	Render,
	server,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import type { RealtorProps } from "./types.js";
import classes from "./fullPage.module.css";
import placeholder from "/static/img/agent-placeholder.jpg";
import ContactClient from "~/commons/Contact.client";
import type { AddressItem } from "~/commons/Map/MapWithPin.client";
import {
	Col,
	ContentHeader,
	HeadingSection,
	List,
	Row,
	Section,
	type ListRowProps,
} from "design-system";
import { useTranslation } from "react-i18next";

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
		const { t } = useTranslation();
		const contextMode = renderContext.getMode();
		// Guard against a partially filled realtor: `${firstName} ${lastName}`
		// would render "undefined undefined" as the page title
		const fullName =
			[firstName, lastName].filter(Boolean).join(" ") || currentNode.getDisplayableName();
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

		refByNode.forEach((agencyNode) => {
			server.render.addCacheDependency({ node: agencyNode }, renderContext);
			server.render.addCacheDependency(
				{ flushOnPathMatchingRegexp: `${agencyNode.getPath()}/.*` },
				renderContext,
			);
		});

		// No agency → no WHERE clause: the query would list every estate in the
		// whole repository, across sites. Skip it entirely.
		const estates = refByNode.length
			? getNodesByJCRQuery(currentNode.getSession(), query, MAX_ESTATE)
			: [];

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
				value: yOfExperience,
			},
		];

		const addressItems: AddressItem[] = agencies
			.filter((item): item is { address: string; id: string; name: string } =>
				Boolean(item.address),
			)
			.map(({ address, id }) => ({ label: address, address, id }));

		return (
			<>
				<Section>
					<ContentHeader
						title={fullName}
						image={({ className, preload }) => (
							<JImage
								node={imageNode}
								alt={t("alt.realtor", { realtor: fullName })}
								fallback={placeholder}
								className={className}
								preload={preload}
								layout="constrained"
								// The header stacks below lg, where the image spans the container
								sizes="(max-width: 992px) 90vw, 500px"
							/>
						)}
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
				{estates.length > 0 && (
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
				)}
			</>
		);
	},
);
