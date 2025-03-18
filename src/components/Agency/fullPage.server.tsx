import {
  AddContentButtons,
  getNodeProps,
  getNodesByJCRQuery,
  jahiaComponent,
  Render,
  server,
  useUrlBuilder,
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
    const { buildStaticUrl } = useUrlBuilder();
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
      src: buildStaticUrl({ assetPath: "img/agency-placeholder.jpg" }),
      alt: "Placeholder",
    };

    if (imageNode) {
      image.src = imageNode.getUrl();
      image.alt = t("alt.agency", { agency: name });

      server.render.addCacheDependency({ node: imageNode }, renderContext);
    }

    return (
      <>
        <Section>
          <ContentHeader title={name} image={image} description={description} />
        </Section>
        <Section>
          <List rows={listRows} />
        </Section>
        <Contact
          addresses={[{ address, id: currentNode.getIdentifier() }]}
          phone={phone}
          email={email}
        />
        <Section>
          <HeadingSection title={t("section.heading.experts")} />
          <Row className="row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-3">
            {realtors?.map((realtor) => (
              <Col key={realtor.getIdentifier()} className="g-0">
                <Render node={realtor} editable={false} />
              </Col>
            ))}
          </Row>
        </Section>
        <Section>
          <HeadingSection title={t("section.heading.exclusiveAgencyEstates")} />
          <Row className="row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-0">
            {renderContext.isEditMode() && (
              <Col key="addNewRealEstate" className="g-0">
                <AddContentButtons nodeTypes={["luxe:estate"]} />
              </Col>
            )}

            {estates.map((estate) => (
              <Col key={estate.getIdentifier()} className="g-0">
                <Render node={estate as JCRNodeWrapper} editable={false} />
              </Col>
            ))}
          </Row>
        </Section>
      </>
    );
  },
);
