import { ReactNode } from "react";

export interface CardItemTypes {
  id?: number;
  title: string;
  text?: string;
  element?: ReactNode;
}

export interface CardListProps {
  items: CardItemTypes[];
}

export interface CompanyInformations {
  companyInformations: {
    companyId: string;
    companyLogo: string;
    companyName: string;
    category: string;
    foundedDate: string;
    location: string;
    phoneNumber: string;
    email: string;
    websiteUrl: string;
    socials: { url: string }[];
  };
}

export type Socials = "facebook" | "linkedin" | "instagram" | "x" | "github";
