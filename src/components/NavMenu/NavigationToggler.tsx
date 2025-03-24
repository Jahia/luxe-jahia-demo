import {
  buildNavMenu,
  getNodeProps,
  HydrateInBrowser,
  useServerContext,
} from "@jahia/javascript-modules-library";
import NavigationTogglerClient from "~/components/NavMenu/NavigationToggler.client";

interface NavMenuProps {
  base?: "home" | "currentPage" | "";
  maxDepth: number;
  startLevel: number;
  menuItemView: string;
}

export interface RefinedNavMenuProps {
  node: {
    uuid: string;
    path: string;
    name: string;
    url: string;
  };
  selected: boolean;
}

export const NavigationToggler = () => {
  const { renderContext, currentNode, currentResource } = useServerContext();
  const {
    base = "",
    maxDepth,
    startLevel,
    menuItemView,
  }: NavMenuProps = getNodeProps(currentNode, [
    "base",
    "maxDepth",
    "startLevel",
    "menuItemView",
  ]) as NavMenuProps;

  const menu = buildNavMenu(
    maxDepth,
    base,
    menuItemView,
    startLevel,
    renderContext,
    currentResource,
  );

  const refinedMenu: RefinedNavMenuProps[] = menu.map(({ node, selected }) => ({
    node: {
      uuid: node.getIdentifier(),
      path: node.getPath(),
      name: node.getDisplayableName(),
      url: node.getUrl(),
    },
    selected,
  }));

  const mainPath = renderContext.getMainResource().getPath();
  return (
    <HydrateInBrowser
      child={NavigationTogglerClient}
      props={{ menu: refinedMenu, mainPath: mainPath }}
    />
  );
};
