import { InputHTMLAttributes, ReactNode } from "react";

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
  label: string;
  icon: ReactNode;
  extraIcon?: ReactNode;
  handleClickPasswordDisplay?: () => void;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

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
}

//! Go back properties interface for auth pages !//
export interface GoBackProps {
  icon: ReactNode;
  url: string;
  position: string;
}
