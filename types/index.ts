import { FormikErrors } from "formik";
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

//! General properties interface of the layout component !//
export interface LayoutComponentProps {
  children: ReactNode;
}

//! Candidates auth form input fields interface !//
export interface FormFields {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string; // validate confirmPassword === password
  checkbox: boolean;
}

//! Reset password form input field !//
export interface ResetPasswordField {
  email: string; // validate valid email format
}

//! Candidates auth pages form properties interface !//
export interface AuthFormProps {
  setTermsModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

//! Candidate Sign up form terms modal properties interface !//
export interface TermsModalProps {
  termsModal: boolean;
  setTermsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

//! Candidate sign up page terms modal fields interface !//
export interface TermsData {
  title: string;
  description: string;
}

//! Auth input properties type fields !//
export type AuthInputProps = {
  label?: string;
  icon?: ReactNode;
  extraIcon?: ReactNode;
  handleClickPasswordDisplay?: () => void;
  className?: string;
  iconSpanClass?: string;
} & InputHTMLAttributes<HTMLInputElement>;

interface AuthSelectDataItem {
  id: number;
  name: string;
}

export interface AuthSelectProps {
  handleChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleChangeCapture?: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: AuthSelectDataItem[];
  defaultValue: string;
  name: string;
  isSubmitting: boolean;
  value: string;
}

export interface EmployerSignupFormFields {
  nameAndSurname: string;
  phone: string;
  email: string;
  password: string;
  companyName: string;
  taxNumber: string;
  checkboxFirst: boolean;
  checkboxSecond: boolean;
  selectCity: string;
  selectDistricts: string;
  selectTaxOfficiesCity: string;
  selectTaxOffice: string;
}

export interface AuthCheckboxProps {
  errors?: string | undefined;
  values: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  text?: string;
  name: string;
}

//! Custom button component properties interface !//
export interface CustomButtonProps {
  isSubmitting: boolean;
  className?: string;
  text: string;
}

//! Success component properties interface for reset email page !//
export interface SuccessProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  message?: string;
}

//! Go back properties interface for auth pages !//
export interface GoBackProps {
  position: string;
  url?: string;
}

//! Json data city, districts and tax officies interfaces START !//
export interface CitiesJsonInterface {
  id: number;
  name: string;
  plate_code: string;
}

export interface DistrictsJsonInterface {
  id: number;
  city_id: string;
  name: string;
}

export interface TaxOfficiesJsonInterface {
  id: number;
  plate_code: string;
  city: string;
  district: string;
  name: string;
}
//! Json data city, districts and tax officies interfaces END !//

//! User interface area Employer and Candidate Role interfaces START !//
export interface User {
  createdAt: string;
  email: string;
  emailVerified: boolean;
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
}

export interface Employer extends User {
  eid: string;
  companyInformations: {
    companyName: string;
    companyLogo: string;
    serviceArea: string;
    phoneNumber: string;
    numberOfEmployees: string;
    location: {
      city: string;
      district: string;
      taxNumber: string;
      taxOffice: string;
      taxOfficieCity: string;
    };
  };
  featured: boolean;
  bestCompany: boolean;
  openJobs: [
    {
      postId: string;
      jobTitle: string;
      jobDescription: {
        jobIntro: string;
        jobDetails: string;
        responsibilities: string[];
        requirements: string[];
      };
      category: string;
      modeOfWork: string;
      workModel: string;
      positionLevel: string;
      educationLevel: string[];
      experienceTime: string;
      applicationDeadlineDate: string;
      location: string;
    }
  ];
}

export interface Candidate extends User {
  cid: string;
  acceptedTerms: string;
  createdWith: string;
  favoriteEmployers: [
    {
      companyEID: string;
      companyLocation: string;
      companyLogo: string;
      companyName: string;
      numberOfEmployees: string;
    }
  ];
}
//! User interface area Employer and Candidate Role interfaces END !//

//! Hero section search job form input fields !//
export interface SearchJobFormFields {
  job: string;
  location: string;
}

//! Auto complete input search data fields !//
export interface AuthCompoleteSearchFields {
  id: number;
  title: string;
}

//! Auto complete input component props !//
export interface AuthCompoleteComponentProps {
  touched: boolean | undefined;
  searchData: AuthCompoleteSearchFields[];
  recommendedKeywords: string[];
  setFieldValue: (
    field: string,
    value: string | undefined
  ) => Promise<void | FormikErrors<SearchJobFormFields>>;
  setSelectedKeyword: (keyword: string) => void;
  listText: string;
  field: string;
}

//! Section header component props !//
export interface SectionHeaderProps {
  title: string;
  subtitle: string;
  linkText: string;
  link: string;
}