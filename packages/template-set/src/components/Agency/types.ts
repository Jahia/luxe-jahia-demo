import type { JCRNodeWrapper } from "org.jahia.services.content";

export interface AgencyProps {
	name: string;
	description: string;
	image: JCRNodeWrapper;
	creationDate: Date;
	country: string;
	address?: string;
	phone?: string;
	email?: string;
	realtors?: JCRNodeWrapper[];
}
