import type { JCRNodeWrapper } from "org.jahia.services.content";

export type realtorTypes = {
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
};

export type realtorAgencyTypes = {
  id: string;
  name: string;
  address?: string;
};
