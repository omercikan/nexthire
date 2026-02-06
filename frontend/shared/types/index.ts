import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

//! General properties interface of the layout component !//
export interface LayoutComponentProps {
  children: ReactNode;
}

//! Reset password form input field !//
export interface ResetPasswordField {
  email: string; // validate valid email format
}

//! Auth input properties type fields !//
export type CustomInputProps = {
  label?: string;
  icon?: ReactNode;
  extraIcon?: ReactNode;
  handleClickPasswordDisplay?: () => void;
  className?: string;
  iconSpanClass?: string;
  labelClass?: string;
  error?: string | undefined;
  wrapperClass?: string;
  inputWrapperClass?: string;
} & InputHTMLAttributes<HTMLInputElement>;

interface AuthSelectDataItem {
  id: number;
  name: string;
  disabled?: boolean;
}

export interface AuthSelectProps {
  handleChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleChangeCapture?: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: AuthSelectDataItem[];
  defaultValue?: string;
  name: string;
  value?: string;
  isSubmitting: boolean;
  isFormatText?: boolean;
  isDefaultValueOption?: boolean;
  className?: string;
  label?: string;
  labelClass?: string;
  error?: string | undefined;
}

export interface AuthCheckboxProps {
  error?: string | undefined;
  values?: boolean;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  text?: string;
  name: string;
}

//! Custom button component properties interface !//
export interface CustomButtonProps {
  type?: "submit" | "button" | "reset";
  isSubmitting?: boolean;
  className?: string;
  text?: string;
  circularColor?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

//! Success component properties interface for reset email page !//
export interface SuccessProps {
  icon?: ReactNode;
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
  _id: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  fullname: string;
  phoneNumber: string;
  emailVerified: boolean;
  failedAttempts: number;
  failedTime: number;
}
//! User interface area Employer and Candidate Role interfaces END !//

//! Hero section search job form input fields !//
export interface SearchJobFormFields {
  jobTitle: string;
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
  setFieldValue: (value: string) => void;
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

//! Step card item components props !//
export interface StepCardItemProps {
  card: {
    id: number;
    cardImage: string;
    cardTitle: string;
    cardDescription: string;
  };
}

//! Testimonial slide component props fields !//
export interface testimonialSlideProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    content: string;
  };
}

//! Blogs data interface !//
export interface BlogPost {
  id: string;
  blogId: string;
  title: string;
  createdAt: number;
  category: string;
  image: string;
  description: string;
  quote: {
    text: string;
    author: string;
  };
  takeaways: string[];
  tags: string[];
  requirements: string[];
}
