import type { JCRNodeWrapper } from "org.jahia.services.content";

export interface RealtorProps {
  fullName?: string;
  firstName: string;
  lastName: string;
  jobPosition: "junior" | "senior" | "director";
  description: string;
  image?: JCRNodeWrapper;
  languages: ["fr" | "en" | "de" | "es"];
  yOfExperience: bigint;
  phone: string;
  email: string;
}
