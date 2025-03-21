import { buildModuleFileUrl, jahiaComponent, server } from "@jahia/javascript-modules-library";
import { Col, Figure, PageTitle, Row, Section, List } from "~/commons";
import { t } from "i18next";
import type { EstateProps } from "./types.js";
import CheckIcon from "~/commons/icons/CheckIcon";

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
    const image = {
      src: buildModuleFileUrl("static/img/img-placeholder.jpg"),
      alt: "Placeholder",
    };

    if (images[0]) {
      const _image = images[0];
      image.src = _image.getUrl();
      image.alt = t("alt.estate", { estate: title });

      server.render.addCacheDependency({ node: _image }, renderContext);
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
              />
            </Col>
            <Col>
              <p className="display-5 text-primary fw-medium">{price.toLocaleString(locale)} €</p>
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
