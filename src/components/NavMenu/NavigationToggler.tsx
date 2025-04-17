import {
  buildNodeUrl,
  getChildNodes,
  HydrateInBrowser,
  useServerContext,
} from "@jahia/javascript-modules-library";
import NavigationTogglerClient from "~/components/NavMenu/NavigationToggler.client";

export interface RefinedNavMenuProps {
  node: {
    uuid: string;
    path: string;
    name: string;
    url: string;
  };
  active: boolean;
}

export const NavigationToggler = () => {
  const { renderContext, mainNode } = useServerContext();
  const mainPath = renderContext.getMainResource().getPath();
  const home = renderContext.getSite().getHome();
  const menu = getChildNodes(home, 10, 0, (node) => node.isNodeType("jnt:page"));

  const refinedMenu: RefinedNavMenuProps[] = menu.map((node) => ({
    node: {
      uuid: node.getIdentifier(),
      path: node.getPath(),
      name: node.getDisplayableName(),
      url: buildNodeUrl(node),
    },
    active: node === mainNode || mainPath.includes(node.getPath()),
  }));

  return <HydrateInBrowser child={NavigationTogglerClient} props={{ menu: refinedMenu }} />;
};
