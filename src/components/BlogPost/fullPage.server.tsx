import { jahiaComponent, Render, server, useUrlBuilder } from "@jahia/javascript-modules-library";
import { Col, Figure, HeadingSection, Row, Section } from "~/commons";
import { t } from "i18next";
import type { BlogPostProps } from "./types.js";

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
jahiaComponent(
  {
    nodeType: "luxe:blogPost",
    name: "fullPage",
    displayName: "Full Page",
    componentType: "view",
  },
  (
    {
      title,
      subtitle,
      "image": imageNode,
      body,
      date,
      "j:defaultCategory": categories,
      relatedBlogPosts,
    }: BlogPostProps,
    { currentNode, renderContext },
  ) => {
    const { buildStaticUrl } = useUrlBuilder();

    const image = {
      src: buildStaticUrl({ assetPath: "img/img-placeholder.jpg" }),
      alt: "Placeholder",
    };

    if (imageNode) {
      image.src = imageNode.getUrl();
      image.alt = t("alt.blog", { blog: title });

      server.render.addCacheDependency({ node: imageNode }, renderContext);
    }

    const formatedDate =
      new Date(date).toLocaleDateString(currentNode.getLanguage(), {
        // Weekday: 'long',
        year: "numeric",
        month: "long",
        day: "numeric",
      }) || null;

    return (
      <>
        <article>
          <header className="container py-4 py-md-5 mb-5">
            <Row>
              <Figure src={image.src} alt={image.alt} layout="imgFull" />
            </Row>
            <hgroup className="row text-center">
              <time className="fs-6" dateTime={date.toISOString()}>
                {formatedDate}
              </time>
              <h1 className="display-1 mb-0">{title}</h1>
              {subtitle && <p className="h2 mt-0">{subtitle}</p>}
            </hgroup>
          </header>
          <Section>
            <Row className="lux-richtext">
              {/* @ts-expect-error <unwanteddiv> is not a valid HTML element */}
              <unwanteddiv
                dangerouslySetInnerHTML={{
                  __html: body,
                }}
              />
            </Row>
            {categories && (
              <div className="lux-richtext lux-category">
                {categories.map((node) => (
                  <Render key={node.getIdentifier()} node={node} view="badge" editable={false} />
                ))}
              </div>
            )}
          </Section>
        </article>
        {relatedBlogPosts && relatedBlogPosts.length > 0 && (
          <Section>
            <HeadingSection title={t("section.heading.relatedBlogPosts")} />
            <Row className="row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-0">
              {relatedBlogPosts.slice(0, 3).map((node) => {
                return (
                  <Col key={node.getIdentifier()} className="g-0">
                    <Render node={node} view="card" editable={false} />
                  </Col>
                );
              })}
            </Row>
          </Section>
        )}
      </>
    );
  },
);
