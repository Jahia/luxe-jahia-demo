import type { JCRNodeWrapper } from "org.jahia.services.content";

export interface EstateProps {
	title: string;
	description: string;
	price: number;
	images: JCRNodeWrapper[];
	country?: string;
	type: "house" | "apartment" | "building";
	surface: number;
	rooms: number;
	bedrooms: number;
	bathrooms: number;
	options: Array<"garage" | "swimmingPool" | "garden" | "balcony">;
}
