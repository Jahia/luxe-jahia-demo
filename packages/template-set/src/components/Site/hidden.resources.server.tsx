import {
	AddResources,
	buildModuleFileUrl,
	jahiaComponent,
} from "@jahia/javascript-modules-library";

/**
 * The site's resources for a content rendered without a page of its own: the preview of a content
 * folder's item, or a form edited in the Page Builder from its folder. The platform's content
 * template renders the site node with this view and places what it declares in the document head,
 * so such a content gets the same stylesheet as the pages.
 */
jahiaComponent(
	{
		componentType: "view",
		nodeType: "jnt:virtualsite",
		name: "hidden.resources",
	},
	() => <AddResources type="css" resources={buildModuleFileUrl("dist/assets/style.css")} />,
);
