import { Document } from "mongoose";

export interface EmployerTypes extends Document {
  fullname: string;
  phoneNumber: string;
  email: string;
  password: string;
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
