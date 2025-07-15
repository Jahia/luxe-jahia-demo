import {
  buildModuleFileUrl,
  buildNodeUrl,
  jahiaComponent,
  Render,
  server,
} from "@jahia/javascript-modules-library";
import { Col, Figure, HeadingSection, Row, Section } from "~/commons";
import { t } from "i18next";
import type { BlogPostProps } from "./types.js";
import classes from "./fullPage.module.css";
import placeholder from "/static/img/img-placeholder.jpg";

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
      "date": stringDate,
      "j:defaultCategory": categories,
      relatedBlogPosts,
    }: BlogPostProps,
    { currentNode, renderContext },
  ) => {
    const image = {
      src: buildModuleFileUrl(placeholder),
      alt: "Placeholder",
    };

    if (imageNode) {
      image.src = buildNodeUrl(imageNode);
      image.alt = t("alt.blog", { blog: title });

      server.render.addCacheDependency({ node: imageNode }, renderContext);
    }

    const date: Date = new Date(stringDate);
    const formatedDate =
      date.toLocaleDateString(currentNode.getLanguage(), {
        // Weekday: 'long',
        year: "numeric",
        month: "long",
        day: "numeric",
      }) || null;

    return (
      <>
        <article>
          <header className={classes.header}>
            <Row>
              <Figure src={image.src} alt={image.alt} layout="imgFull" />
            </Row>
            <Row component="hgroup">
              <time dateTime={date.toISOString()}>{formatedDate}</time>
              <h1 className={classes.title}>{title}</h1>
              {subtitle && <p className={classes.hp}>{subtitle}</p>}
            </Row>
          </header>
          <Section>
            <Row className={classes.richtext}>
              {/* @ts-expect-error <unwanteddiv> is not a valid HTML element */}
              <unwanteddiv
                dangerouslySetInnerHTML={{
                  __html: body,
                }}
              />
            </Row>
            {categories && (
              <div className={classes.category}>
                {categories.map((node) => (
                  <Render key={node.getIdentifier()} node={node} view="badge" readOnly />
                ))}
              </div>
            )}
          </Section>
        </article>
        {relatedBlogPosts && relatedBlogPosts.length > 0 && (
          <Section>
            <HeadingSection title={t("section.heading.relatedBlogPosts")} />
            <Row className={classes.rowRelatedBlogPosts}>
              {relatedBlogPosts.slice(0, 3).map((node) => {
                return (
                  <Col key={node.getIdentifier()}>
                    <Render node={node} view="card" readOnly />
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
