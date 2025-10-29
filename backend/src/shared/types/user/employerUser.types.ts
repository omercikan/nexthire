import { User } from "./user.types";

export interface EmployerTypes extends User {
  phoneNumber: string;
  companyName: string;
  city: string;
  district: string;
  taxCity: string;
  taxNumber: string;
  taxOffice: string;
  personalDataConsent: true;
  emailConsent: boolean;
  role: "employer";
}
