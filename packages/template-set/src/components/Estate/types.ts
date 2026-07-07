import type { JCRNodeWrapper } from "org.jahia.services.content";

// All fields are optional at runtime, even when mandatory in the CND:
// a freshly created or partially filled node renders with missing props.
export interface EstateProps {
	title?: string;
	description?: string;
	price?: number;
	images?: JCRNodeWrapper[];
	country?: string;
	type?: "house" | "apartment" | "building";
	surface?: number;
	rooms?: number;
	bedrooms?: number;
	bathrooms?: number;
	options?: Array<"garage" | "swimmingPool" | "garden" | "balcony">;
}
