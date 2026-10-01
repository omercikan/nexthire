export interface RegisterEmployerReqeust {
  email: string;
  fullName: string;
  phoneNumber: string;
  companyName: string;
  district: string;
  taxCity: string;
  taxOffice: string;
  taxNumber: string;
  emailConsent: boolean;
  personalDataConsent: boolean;
}
