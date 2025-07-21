import {
	AddContentButtons,
	buildModuleFileUrl,
	buildNodeUrl,
	getNodeProps,
	getNodesByJCRQuery,
	jahiaComponent,
	Render,
	RenderInBrowser,
	server,
} from "@jahia/javascript-modules-library";
import type { RenderContext } from "org.jahia.services.render";
import type { JCRNodeWrapper } from "org.jahia.services.content";

import { t } from "i18next";
import {
	Col,
	ContentHeader,
	HeadingSection,
	Row,
	Section,
	List,
	type ListRowProps,
	Contact,
} from "~/commons";
import type { AgencyProps } from "./types";
import type { RealtorProps } from "~/components/Realtor/types";
import classes from "./fullPage.module.css";
import placeholder from "/static/img/agency-placeholder.jpg";
import MapWithPinClient, { type AddressItem } from "~/commons/map/MapWithPin.client";

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
				value: new Date(creationDate).getFullYear().toString(10) || "-",
			},
			{
				title: t("list.data.spokenLanguage.label"),
				value: languages.map((language) => agencyLanguagesTranslation[language]).join(", "),
				className: "textCapitalize",
			},
		];

		const image = {
			src: buildModuleFileUrl(placeholder),
			alt: "Placeholder",
		};

		if (imageNode) {
			image.src = buildNodeUrl(imageNode);
			image.alt = t("alt.agency", { agency: name });

			server.render.addCacheDependency({ node: imageNode }, renderContext);
		}

		const addresses = [{ address, id: currentNode.getIdentifier() }];
		const mapAddresses: AddressItem[] = addresses
			.filter((item): item is { address: string; id: string } => Boolean(item.address))
			.map(({ address }) => ({ label: address, address }));

		return (
			<>
				<Section>
					<ContentHeader title={name} image={image} description={description} />
				</Section>
				<Section>
					<List rows={listRows} />
				</Section>
				<Section>
					<HeadingSection title={t("section.heading.contact")} />
					<Row>
						<Col>
							<address>
								<div className={classes.row}>
									<strong className={classes.label}>{t("section.contact.address")}</strong>
									{addresses.map(({ address, id }) => {
										if (address) return <span key={id}>{address}</span>;
									})}
								</div>
								<div className={classes.row}>
									<strong className={classes.label}>{t("section.contact.phone")}</strong>
									<a href={`tel:${phone}`}>{phone}</a>
								</div>
								<div className={classes.row}>
									<strong className={classes.label}>{t("section.contact.email")}</strong>
									<a href={`mailto:${email}`}>{email}</a>
								</div>
							</address>
							<button type="button" className={classes.btn}>
								{t("section.contact.btn")}
							</button>
						</Col>
						<Col>
							<div>
								<RenderInBrowser child={MapWithPinClient} props={{ addresses: mapAddresses }} />
							</div>
						</Col>
					</Row>
				</Section>
				{/*<Contact*/}
				{/*  addresses={[{ address, id: currentNode.getIdentifier() }]}*/}
				{/*  phone={phone}*/}
				{/*  email={email}*/}
				{/*/>*/}
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
