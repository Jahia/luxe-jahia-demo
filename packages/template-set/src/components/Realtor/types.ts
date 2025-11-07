import type { JCRNodeWrapper } from "org.jahia.services.content";

export interface RealtorProps {
	fullName?: string;
	firstName: string;
	lastName: string;
	jobPosition: "junior" | "senior" | "director";
	description: string;
	image?: JCRNodeWrapper;
	animate?: JCRNodeWrapper;
	languages: Array<"fr" | "en" | "de" | "es">;
	yOfExperience: number;
	phone: string;
	email: string;
}
