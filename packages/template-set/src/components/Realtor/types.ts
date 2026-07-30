import type { JCRNodeWrapper } from "org.jahia.services.content";

// All props are optional at runtime, even CND-mandatory ones: a node can
// reach the view before its mandatory fields are filled in
export interface RealtorProps {
	fullName?: string;
	firstName?: string;
	lastName?: string;
	jobPosition?: "junior" | "senior" | "director";
	description?: string;
	image?: JCRNodeWrapper;
	animate?: JCRNodeWrapper;
	languages?: Array<"fr" | "en" | "de" | "es">;
	yOfExperience?: number;
	phone?: string;
	email?: string;
}
