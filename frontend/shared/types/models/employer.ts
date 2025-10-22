import { User } from "..";
// import { EmployerOpenJobs } from "../employer/open-jobs.types";

/**
 * @interface Employer
 * @extends User
 * @description The user data stored in DB for users with employer role
 */
export interface Employer extends User {
  companyName: string;
  companyLogo: string;
  city: string;
  district: string;
  taxCity: string;
  taxOffice: string;
  taxNumber: string;
  emailConsent: boolean;
  personalDataConsent: boolean;

  // companyInformations: CompanyInformations;
  // featured: boolean;
  // bestCompany: boolean;
  // openJobs: EmployerOpenJobs[];
}

// export interface Location {
//   taxOfficeCity: string;
// }

export interface CompanyInformations {
  companyName: string;
  companyLogo: string;
  email: string;
  serviceArea: string;
  phoneNumber: string;
  numberOfEmployees: string;
  location: Location;
}
