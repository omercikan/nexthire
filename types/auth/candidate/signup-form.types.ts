//! Candidates auth form input fields interface !//
export interface CandidateFormFields {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string; // validate confirmPassword === password
  checkbox: boolean;
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
