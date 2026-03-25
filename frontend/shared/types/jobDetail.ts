export type ApplicationMethod = "NextHire" | "email" | "external_link";

//? Job detail page job data interface ?//
export interface JobScreeningQuestions {
  id: string;
  question: string;
  type: string;
  characterLimit?: string;
  options?: string[];
  required: boolean;
  knockout: boolean;
  correctAnswer?: string;
  knockoutAnswer?: string;
}

export interface JobData {
  _id: string;
  careerLevel: string;
  category: string;
  createdAt: string;
  educationLevel: string;
  experience: string;
  gender: string;
  introductionUrl: string;
  jobDescription: string;
  jobTitle: string;
  location: string;
  maxSalary: string;
  minSalary: string;
  salaryPeriod: string;
  updatedAt: string;
  workType: string;
  applicationMethod: ApplicationMethod;
  applicationAddress: string;
  screeningQuestions: JobScreeningQuestions[];

  employer: {
    profilePhoto: string;
    companyName: string;
    categories: string[];
    companySize: string;
    _id: string;
    city: string;
    email: string;
    phoneNumber: string;
    website: string;
    socialPlatforms: { _id: string; platform: string; url: string }[];
    foundedDate: string;
  };
}
