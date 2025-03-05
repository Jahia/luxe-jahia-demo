import React from "react";
import {
  getNodeProps,
  getNodesByJCRQuery,
  jahiaComponent,
  Render,
  server,
  useUrlBuilder,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import { useTranslation } from "react-i18next";
import { Col, ContentHeader, HeadingSection, Row, Section, Table } from "../../components";
import { realtorAgencyTypes, realtorTypes } from "./types.js";

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
    }: realtorTypes,
    { currentNode, renderContext },
  ) => {
    const { t } = useTranslation();
    const { buildStaticUrl } = useUrlBuilder();
    const refBy = currentNode.getWeakReferences();
    const refByNode: JCRNodeWrapper[] = [];
    while (refBy.hasNext()) {
      refByNode.push(refBy.nextProperty().getParent() as JCRNodeWrapper);
    }

    const agencies: realtorAgencyTypes[] = refByNode.map((agencyNode) => {
      return {
        ...(getNodeProps(agencyNode, ["name", "address"]) as { name: string; address: string }),
        id: agencyNode.getIdentifier(),
      };
    });
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

    const data = [
      {
        title: t("table.data.agency"),
        value: agencies.reduce((value, { name }, index) => {
          if (index === 0) {
            return name;
          }

          return `${value} / ${name}`;
        }, ""),
      },
      {
        title: t("table.data.spokenLanguage.label"),
        value: languages?.map((language) => t(`table.data.spokenLanguage.${language}`)).join(", "),
        valueClassName: "text-capitalize",
      },
      {
        title: t("table.data.yOfExperience"),
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
          <Table rows={data} />
        </Section>
        <Section>
          <HeadingSection title={t("section.heading.contact")} />
          <Row>
            <Col>
              <address>
                <div className="d-flex flex-column mb-4">
                  <strong className="lux-capitalize">{t("section.contact.address")}</strong>
                  {agencies.map(({ address, id }) => (
                    <span key={id}>{address}</span>
                  ))}
                </div>
                <div className="d-flex flex-column mb-4">
                  <strong className="lux-capitalize">{t("section.contact.phone")}</strong>
                  <a href={`tel:${phone}`}>{phone}</a>
                </div>
                <div className="d-flex flex-column mb-4">
                  <strong className="lux-capitalize">{t("section.contact.email")}</strong>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </address>
              <button
                type="button"
                className="btn btn-primary btn-lg w-100 lux-capitalize"
                data-bs-toggle="modal"
                data-bs-target="#modalContact"
              >
                {t("section.contact.btn")}
              </button>
            </Col>
            <Col>
              <></>
              {/* <div className="d-flex justify-content-center align-items-center bg-secondary flex-fill h-100">
                            map here
                        </div> */}
            </Col>
          </Row>
        </Section>
        <Section>
          <HeadingSection title={t("section.heading.exclusiveEstates")} />
          <Row className="row-cols-3 g-0">
            {estates.map((estate) => (
              <Col key={estate.getIdentifier()} className="g-0">
                <Render node={estate as JCRNodeWrapper} />
              </Col>
            ))}
          </Row>
        </Section>
      </>
    );
  },
);
