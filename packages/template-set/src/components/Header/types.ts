import type { JCRNodeWrapper } from "org.jahia.services.content";

// All props are optional at runtime, even CND-mandatory ones: a node can
// reach the view before its mandatory fields are filled in
export interface HeaderProps {
	title?: string;
	subtitle?: string;
	image?: JCRNodeWrapper;
}
