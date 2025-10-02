import { User } from "..";
import { EmployerOpenJobs } from "../employer/open-jobs.types";

/**
 * @interface Employer
 * @extends User
 * @description The user data stored in DB for users with employer role
 */
export interface Employer extends User {
  companyInformations: CompanyInformations;
  featured: boolean;
  bestCompany: boolean;
  openJobs: EmployerOpenJobs[];
}

export interface Location {
  city: string;
  district: string;
  taxNumber: string;
  taxOffice: string;
  taxOfficeCity: string;
}

export interface CompanyInformations {
  companyName: string;
  companyLogo: string;
  email: string;
  serviceArea: string;
  phoneNumber: string;
  numberOfEmployees: string;
  location: Location;
}
