import { jahiaComponent, server, useUrlBuilder } from "@jahia/javascript-modules-library";
import { Col, Figure, PageTitle, Row, Section } from "../../components";
import { useTranslation } from "react-i18next";
import { estateTypes } from "./types.js";

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
    }: estateTypes,
    { currentResource, renderContext },
  ) => {
    const { t } = useTranslation();
    const { buildStaticUrl } = useUrlBuilder();
    const locale = currentResource.getLocale().getLanguage();
    const image = {
      src: buildStaticUrl({ assetPath: "img/img-placeholder.jpg" }),
      alt: "Placeholder",
    };

    if (images[0]) {
      const _image = images[0];
      image.src = _image.getUrl();
      image.alt = t("alt.estate", { estate: title });

      server.render.addCacheDependency({ node: _image }, renderContext);
    }

    return (
      <>
        <Section>
          <header className="d-flex mb-5">
            <PageTitle title={title} className="pb-0" />
          </header>
          <Row>
            <Figure src={image.src} alt={image.alt} layout="imgFull" />
          </Row>
          <Row className="row-cols-1 row-cols-lg-2 g-5">
            <Col>
              {/* @ts-expect-error <unwanteddiv> is not a valid HTML element */}
              <unwanteddiv
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
                className="lux-richText"
              />
            </Col>
            <Col>
              <p className="display-5 text-primary fw-medium">{price.toLocaleString(locale)} €</p>
              <dl className="lux-house_informations">
                <div className="lux-house_information_row d-flex">
                  <dt className="lux-house_information_key">{t("estate.type.label")}</dt>
                  <dd className="lux-house_information_value">{t(`estate.type.${type}`)}</dd>
                </div>
                <div className="lux-house_information_row d-flex">
                  <dt className="lux-house_information_key">{t("estate.surface.label")}</dt>
                  <dd className="lux-house_information_value">
                    {surface.toLocaleString(locale)} m<sup>2</sup>
                  </dd>
                </div>
                <div className="lux-house_information_row d-flex">
                  <dt className="lux-house_information_key">{t("estate.rooms.label")}</dt>
                  <dd className="lux-house_information_value">{rooms}</dd>
                </div>
                <div className="lux-house_information_row d-flex">
                  <dt className="lux-house_information_key">{t("estate.bedrooms.label")}</dt>
                  <dd className="lux-house_information_value">{bedrooms}</dd>
                </div>
                <div className="lux-house_information_row d-flex">
                  <dt className="lux-house_information_key">{t("estate.bathrooms.label")}</dt>
                  <dd className="lux-house_information_value">{bathrooms}</dd>
                </div>
                {options &&
                  options.map((option) => (
                    <div key={option} className="lux-house_information_row d-flex">
                      <dt className="lux-house_information_key">{t(`estate.options.${option}`)}</dt>
                      <dd className="lux-house_information_value  d-flex align-items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          width="24px"
                          height="24px"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </dd>
                    </div>
                  ))}
              </dl>
              {/* <AgentItem imgURL={profile1} name="Robert Fox"/> */}
            </Col>
          </Row>
        </Section>
        {/* <Section>TODO: Biens similaire</Section> */}
      </>
    );
  },
);
