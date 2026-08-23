import {
	getChildNodes,
	getLinkProps,
	Island,
	useServerContext,
} from "@jahia/javascript-modules-library";
import type { AnchorProps } from "@jahia/javascript-modules-library";
import NavigationTogglerClient from "~/components/NavMenu/NavigationToggler.client";

export interface RefinedNavMenuProps {
	uuid: string;
	label: string;
	anchor: AnchorProps;
	active: boolean;
}

export const NavigationToggler = () => {
	const context = useServerContext();
	const home = context.renderContext.getSite().getHome();
	const menu = getChildNodes(home, 10, 0, (node) => node.isNodeType("jnt:page"));

	const refinedMenu: RefinedNavMenuProps[] = menu.map((node) => {
		// The entry is hydrated, so it receives the anchor attributes rather than JSX. The nav is
		// already keyed on the main resource, so the per-entry cache dependency would only repeat it.
		const { anchor, state } = getLinkProps(node, { cacheDependency: false }, context);
		return {
			uuid: node.getIdentifier(),
			label: state.label,
			anchor,
			// The page being rendered is this entry or one of its descendants
			active: state.isAncestor,
		};
	});

	return <Island component={NavigationTogglerClient} props={{ menu: refinedMenu }} />;
};
