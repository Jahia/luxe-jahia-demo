import {
  getNodeProps,
  getNodesByJCRQuery,
  jahiaComponent,
  Render,
  server,
  useUrlBuilder,
} from "@jahia/javascript-modules-library";
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
import type { RealtorProps } from "./types.js";
import classes from "./fullPage.module.css";

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
    const { buildStaticUrl } = useUrlBuilder();
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
        value: agencies.reduce((value, { name }, index) => {
          if (index === 0) {
            return name;
          }

          return `${value} / ${name}`;
        }, ""),
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

    const image = {
      src: buildStaticUrl({ assetPath: "img/agent-placeholder.jpg" }),
      alt: "Placeholder",
    };

    if (imageNode) {
      server.render.addCacheDependency({ node: imageNode }, renderContext);
      image.src = imageNode.getUrl();
      image.alt = t("alt.realtor", { realtor: `${firstName} ${lastName}` });
    }

    return (
      <>
        <Section>
          <ContentHeader
            title={`${firstName} ${lastName}`}
            image={image}
            description={description}
          />
        </Section>
        <Section>
          <List rows={listRows} />
        </Section>
        <Contact addresses={agencies} email={email} phone={phone} />
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
