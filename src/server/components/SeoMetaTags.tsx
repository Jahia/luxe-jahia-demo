import { buildUrl, getNodeProps, useServerContext } from "@jahia/javascript-modules-library";

export const SeoMetaTags = () => {
  const { currentNode, currentResource, renderContext } = useServerContext();

  const isDisplayableNodeType =
    currentNode.isNodeType("jnt:page") || currentNode.isNodeType("jmix:mainResource");
  if (!isDisplayableNodeType) {
    return;
  }

  const {
    "jcr:title": seoTitle,
    "jcr:description": seoDescription,
    openGraphImage,
    seoKeywords,
  } = getNodeProps(currentNode, [
    "jcr:title",
    "jcr:description",
    "openGraphImage",
    "seoKeywords",
  ]) || {};
  const locale = currentResource.getLocale().getLanguage();
  const absOgImageUrl = openGraphImage?.getAbsoluteUrl(renderContext.getRequest());
  const { "j:width": width, "j:height": height } = getNodeProps(openGraphImage, [
    "j:width",
    "j:height",
  ]);

  const getAbsoluteUrl = (node) => {
    const server = renderContext.getURLGenerator().getServer();
    const relUrl = buildUrl({ path: node.getPath() }, renderContext, currentResource);
    return `${server}${relUrl}`;
  };

  return (
    <>
      {seoTitle && (
        <>
          <title>{seoTitle}</title>
          <meta property="og:title" content={seoTitle} />
        </>
      )}
      {/* <meta property="og:locale" content="website"/> */}
      <meta property="og:type" content="website" />
      {seoDescription && (
        <>
          <meta
            property="og:description"
            content={seoDescription.toLocaleString(locale) || seoDescription}
          />
          <meta
            name="description"
            content={seoDescription.toLocaleString(locale) || seoDescription}
          />
        </>
      )}
      <meta property="og:url" content={getAbsoluteUrl(currentNode)} />
      <meta property="og:site_name" content={renderContext.getSite().getTitle()} />
      {seoKeywords?.length && (
        <meta
          name="keywords"
          content={seoKeywords.map((kw) => kw.toLocaleString(locale)).join(",")}
        />
      )}
      {absOgImageUrl && (
        <>
          <meta property="og:image" content={absOgImageUrl} />
          {width && <meta property="og:image:width" content={`${width}px`} />}
          {height && <meta property="og:image:height" content={`${height}px`} />}
        </>
      )}
    </>
  );
};
